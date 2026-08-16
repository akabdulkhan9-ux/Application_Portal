

// import * as React from 'react';
// import styles from './Events.module.scss';
// import { eventsService, IEvent } from '../../services/EventsService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';
// import {
//     Location20Regular,
//     Calendar20Regular,
//     Clock20Regular,
// } from '@fluentui/react-icons';

// export interface IAllEventsProps {
//     onBackToHome: () => void;
//     onEventClick: (id: string) => void;
//     context?: any;
// }

// export const AllEvents: React.FC<IAllEventsProps> = (props) => {
//     const [items, setItems] = React.useState<IEvent[]>([]);
//     const [isLoading, setIsLoading] = React.useState<boolean>(true);

//     React.useEffect(() => {
//         const loadAllEvents = async () => {
//             try {
//                 let retries = 0;
//                 while (!isPnPjsInitialized() && retries < 10) {
//                     await new Promise(resolve => setTimeout(resolve, 500));
//                     retries++;
//                 }
                
//                 const data = await eventsService.getAllEvents(props.context);
//                 setItems(data);
//             } catch (error) {
//                 console.error("Error loading all events:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadAllEvents();
//     }, [props.context]);

//     const handleBackClick = (e: React.MouseEvent) => {
//         e.preventDefault();
//         props.onBackToHome();
//     };

//     const handleEventClick = (id: string, e: React.MouseEvent) => {
//         e.preventDefault();
//         props.onEventClick(id);
//     };

//     if (isLoading) {
//         return <div className={styles.loadingState}>Loading events...</div>;
//     }

//     return (
//         <div className={styles.allEventsPage}>
//             <a href="#" onClick={handleBackClick} className={styles.backToHome}>
//                 ← Back to Home
//             </a>
//             <div className={styles.allEventsContent}>
//                 <h1 className={styles.allEventsTitle}>ALL UPCOMING EVENTS</h1>
                
//                 {items.length === 0 ? (
//                     <div className={styles.emptyState}>No events available</div>
//                 ) : (
//                     <div className={styles.allEventsGrid}>
//                         {items.map((event) => (
//                             <a 
//                                 href="#" 
//                                 key={event.id} 
//                                 onClick={(e) => handleEventClick(event.id, e)} 
//                                 className={styles.card}
//                             >
//                                 <div className={styles.imageWrap}>
//                                     {event.imageUrl ? (
//                                         <img src={event.imageUrl} alt={event.title} loading="lazy" />
//                                     ) : (
//                                         <div className={styles.noImage}>📷 No Image</div>
//                                     )}
//                                 </div>
//                                 <div className={styles.body}>
//                                     <h3 className={styles.cardTitle}>{event.title}</h3>
//                                     <div className={styles.meta}>
//                                         <Location20Regular className={styles.icon} />
//                                         <span>{event.location}</span>
//                                     </div>
//                                     <div className={styles.row}>
//                                         <div className={styles.meta}>
//                                             <Calendar20Regular className={styles.icon} />
//                                             <span>{event.date}</span>
//                                         </div>
//                                         <div className={styles.meta}>
//                                             <Clock20Regular className={styles.icon} />
//                                             <span>{event.time}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </a>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './Events.module.scss';
import { allEventsService, IEvent } from '../../services/AllEventsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';
import {
    Location20Regular,
    Calendar20Regular,
    Clock20Regular,
} from '@fluentui/react-icons';

export interface IAllEventsProps {
    onBackToHome: () => void;
    onEventClick: (id: string) => void;
    context?: WebPartContext;
}

export const AllEvents: React.FC<IAllEventsProps> = (props) => {
    const [displayedItems, setDisplayedItems] = React.useState<IEvent[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const loadMoreRef = React.useRef<HTMLDivElement>(null);
    
    const pageSize = 9;

    const loadMoreEvents = async (): Promise<void> => {
        if (isLoadingMore || !hasMore) return;
        
        setIsLoadingMore(true);
        const nextPage = currentPage + 1;
        
        try {
            const result = await allEventsService.getAllEvents(props.context, nextPage, pageSize);
            const newItems = [...displayedItems, ...result.items];
            setDisplayedItems(newItems);
            setCurrentPage(nextPage);
            setHasMore(result.hasNextPage);
        } catch (error) {
            console.error("Error loading more events:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    React.useEffect(() => {
        const loadInitialEvents = async (): Promise<void> => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const result = await allEventsService.getAllEvents(props.context, 1, pageSize);
                setDisplayedItems(result.items);
                setTotalCount(result.totalCount);
                setHasMore(result.hasNextPage);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error loading events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialEvents().catch((): void => undefined);
    }, [props.context]);

    // Setup intersection observer for infinite scroll
    React.useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries): void => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    loadMoreEvents().catch((): void => undefined);
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

    const handleEventClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        props.onEventClick(id);
    };

    if (isLoading) {
        return <div className={styles.loadingState}>Loading events...</div>;
    }

    return (
        <div className={styles.allEventsPage}>
            <a href="#" onClick={handleBackClick} className={styles.backToHome}>
                ← Back to Home
            </a>
            <div className={styles.allEventsContent}>
                <h1 className={styles.allEventsTitle}>
                    ALL UPCOMING EVENTS
                    <span className={styles.totalCount}> ({totalCount} items)</span>
                </h1>
                
                {displayedItems.length === 0 ? (
                    <div className={styles.emptyState}>No events available</div>
                ) : (
                    <>
                        <div className={styles.allEventsGrid}>
                            {displayedItems.map((event) => (
                                <a 
                                    href="#" 
                                    key={event.id} 
                                    onClick={(e) => handleEventClick(event.id, e)} 
                                    className={styles.card}
                                >
                                    <div className={styles.imageWrap}>
                                        {event.imageUrl ? (
                                            <img src={event.imageUrl} alt={event.title} loading="lazy" />
                                        ) : (
                                            <div className={styles.noImage}>📷 No Image</div>
                                        )}
                                    </div>
                                    <div className={styles.body}>
                                        <h3 className={styles.cardTitle}>{event.title}</h3>
                                        <div className={styles.meta}>
                                            <Location20Regular className={styles.icon} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <div className={styles.meta}>
                                                <Calendar20Regular className={styles.icon} />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className={styles.meta}>
                                                <Clock20Regular className={styles.icon} />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        
                        {/* Loading indicator and sentinel */}
                        <div ref={loadMoreRef} className={styles.sentinel}>
                            {isLoadingMore && (
                                <div className={styles.loadingMore}>Loading more events...</div>
                            )}
                            {!hasMore && displayedItems.length > 0 && (
                                <div className={styles.noMoreItems}>No more events to load</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};