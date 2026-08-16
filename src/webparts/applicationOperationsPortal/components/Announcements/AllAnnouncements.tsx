

// import * as React from 'react';
// import styles from './Announcements.module.scss';
// import { announcementsService, IAnnouncement } from '../../services/AnnouncementsService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// export interface IAllAnnouncementsProps {
//     onBackToHome: () => void;
//     onAnnouncementClick: (id: string) => void;
//     context?: any;
// }

// export const AllAnnouncements: React.FC<IAllAnnouncementsProps> = (props) => {
//     const [items, setItems] = React.useState<IAnnouncement[]>([]);
//     const [isLoading, setIsLoading] = React.useState<boolean>(true);

//     React.useEffect(() => {
//         const loadAllAnnouncements = async () => {
//             try {
//                 let retries = 0;
//                 while (!isPnPjsInitialized() && retries < 10) {
//                     await new Promise(resolve => setTimeout(resolve, 500));
//                     retries++;
//                 }
                
//                 const data = await announcementsService.getAllAnnouncements(props.context);
//                 setItems(data);
//             } catch (error) {
//                 console.error("Error loading all announcements:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadAllAnnouncements();
//     }, [props.context]);

//     const handleBackClick = (e: React.MouseEvent) => {
//         e.preventDefault();
//         props.onBackToHome();
//     };

//     const handleReadMore = (id: string, e: React.MouseEvent) => {
//         e.preventDefault();
//         props.onAnnouncementClick(id);
//     };

//     if (isLoading) {
//         return <div className={styles.loadingState}>Loading announcements...</div>;
//     }

//     return (
//         <div className={styles.allAnnouncementsPage}>
//             <a href="#" onClick={handleBackClick} className={styles.backToHome}>
//                 ← Back to Home
//             </a>
//             <div className={styles.allAnnouncementsContent}>
//                 <h1 className={styles.allAnnouncementsTitle}>ALL ANNOUNCEMENTS</h1>
                
//                 {items.length === 0 ? (
//                     <div className={styles.emptyState}>No announcements available</div>
//                 ) : (
//                     <div className={styles.allAnnouncementsGrid}>
//                         {items.map((item) => (
//                             <article key={item.id} className={styles.card}>
//                                 <div className={styles.imageWrap}>
//                                     <img 
//                                         src={item.imageUrl || "https://picsum.photos/id/20/300/150"} 
//                                         alt={item.title} 
//                                         loading="lazy"
//                                         onError={(e) => {
//                                             (e.target as HTMLImageElement).src = 'https://picsum.photos/id/20/300/150';
//                                         }}
//                                     />
//                                     <div className={styles.dateBadge}>
//                                         <span className={styles.day}>{item.day}</span>
//                                         <span className={styles.month}>{item.monthYear}</span>
//                                     </div>
//                                 </div>
//                                 <div className={styles.body}>
//                                     <h3 className={styles.cardTitle}>{item.title}</h3>
//                                     <p className={styles.desc}>
//                                         {item.description && item.description.length > 100 
//                                             ? item.description.substring(0, 100) + '...' 
//                                             : item.description}
//                                     </p>
//                                     <a href="#" onClick={(e) => handleReadMore(item.id, e)} className={styles.readMore}>
//                                         Read More <span>→</span>
//                                     </a>
//                                 </div>
//                             </article>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };



import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './Announcements.module.scss';
import { allAnnouncementsService, IAnnouncement } from '../../services/AllAnnouncementsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAllAnnouncementsProps {
    onBackToHome: () => void;
    onAnnouncementClick: (id: string) => void;
    context?: WebPartContext;
}

export const AllAnnouncements: React.FC<IAllAnnouncementsProps> = (props) => {
    const [displayedItems, setDisplayedItems] = React.useState<IAnnouncement[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const loadMoreRef = React.useRef<HTMLDivElement>(null);
    
    const pageSize = 9;

    const loadMoreAnnouncements = async (): Promise<void> => {
        if (isLoadingMore || !hasMore) return;
        
        setIsLoadingMore(true);
        const nextPage = currentPage + 1;
        
        try {
            const result = await allAnnouncementsService.getAllAnnouncements(props.context, nextPage, pageSize);
            const newItems = [...displayedItems, ...result.items];
            setDisplayedItems(newItems);
            setCurrentPage(nextPage);
            setHasMore(result.hasNextPage);
        } catch (error) {
            console.error("Error loading more announcements:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    React.useEffect(() => {
        const loadInitialAnnouncements = async (): Promise<void> => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const result = await allAnnouncementsService.getAllAnnouncements(props.context, 1, pageSize);
                setDisplayedItems(result.items);
                setTotalCount(result.totalCount);
                setHasMore(result.hasNextPage);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error loading announcements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialAnnouncements().catch((): void => undefined);
    }, [props.context]);

    // Setup intersection observer for infinite scroll
    React.useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries): void => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    loadMoreAnnouncements().catch((): void => undefined);
                }
            },
            { threshold: 0.5 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return (): void => {
            observer.disconnect();
        };
    }, [hasMore, isLoadingMore, isLoading]);

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        props.onBackToHome();
    };

    const handleReadMore = (id: string, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        props.onAnnouncementClick(id);
    };

    if (isLoading) {
        return <div className={styles.loadingState}>Loading announcements...</div>;
    }

    return (
        <div className={styles.allAnnouncementsPage}>
            <a href="#" onClick={handleBackClick} className={styles.backToHome}>
                ← Back to Home
            </a>
            <div className={styles.allAnnouncementsContent}>
                <h1 className={styles.allAnnouncementsTitle}>
                    ALL ANNOUNCEMENTS
                    <span className={styles.totalCount}> ({totalCount} items)</span>
                </h1>
                
                {displayedItems.length === 0 ? (
                    <div className={styles.emptyState}>No announcements available</div>
                ) : (
                    <>
                        <div className={styles.allAnnouncementsGrid}>
                            {displayedItems.map((item) => (
                                <article key={item.id} className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        <img 
                                            src={item.imageUrl || "https://picsum.photos/id/20/300/150"} 
                                            alt={item.title} 
                                            loading="lazy"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement>): void => {
                                                (e.target as HTMLImageElement).src = 'https://picsum.photos/id/20/300/150';
                                            }}
                                        />
                                        <div className={styles.dateBadge}>
                                            <span className={styles.day}>{item.day}</span>
                                            <span className={styles.month}>{item.monthYear}</span>
                                        </div>
                                    </div>
                                    <div className={styles.body}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <p className={styles.desc}>
                                            {item.description && item.description.length > 100 
                                                ? item.description.substring(0, 100) + '...' 
                                                : item.description}
                                        </p>
                                        <a href="#" onClick={(e) => handleReadMore(item.id, e)} className={styles.readMore}>
                                            Read More <span>→</span>
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                        
                        {/* Loading indicator and sentinel */}
                        <div ref={loadMoreRef} className={styles.sentinel}>
                            {isLoadingMore && (
                                <div className={styles.loadingMore}>Loading more announcements...</div>
                            )}
                            {!hasMore && displayedItems.length > 0 && (
                                <div className={styles.noMoreItems}>No more announcements to load</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};