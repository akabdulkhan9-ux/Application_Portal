import * as React from 'react';
import styles from './Announcements.module.scss';
import { announcementsService, IAnnouncement } from '../../services/AnnouncementsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAllAnnouncementsProps {
    onBackToHome: () => void;
    onAnnouncementClick: (id: string) => void;
    context?: any;
}

export const AllAnnouncements: React.FC<IAllAnnouncementsProps> = (props) => {
    const [items, setItems] = React.useState<IAnnouncement[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadAllAnnouncements = async () => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const data = await announcementsService.getAllAnnouncements();
                setItems(data);
            } catch (error) {
                console.error("Error loading all announcements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllAnnouncements();
    }, []);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onBackToHome();
    };

    const handleReadMore = (id: string, e: React.MouseEvent) => {
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
            <h1 className={styles.allAnnouncementsTitle}>ALL ANNOUNCEMENTS</h1>
            
            {items.length === 0 ? (
                <div className={styles.emptyState}>No announcements available</div>
            ) : (
                <div className={styles.allAnnouncementsGrid}>
                    {items.map(function(item) {
                        return (
                            <article key={item.id} className={styles.card}>
                                <div className={styles.imageWrap}>
                                    <img src={item.imageUrl || "https://picsum.photos/id/20/300/150"} alt={item.title} loading="lazy" />
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
                                    <a href="#" onClick={function(e) { handleReadMore(item.id, e); }} className={styles.readMore}>
                                        Read More <span>→</span>
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};