import * as React from 'react';
import styles from './Events.module.scss';
import { eventsService, IEvent } from '../../services/EventsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';
import {
    Location20Regular,
    Calendar20Regular,
    Clock20Regular,
} from '@fluentui/react-icons';

export interface IAllEventsProps {
    onBackToHome: () => void;
    onEventClick: (id: string) => void;
    context?: any;
}

export const AllEvents: React.FC<IAllEventsProps> = (props) => {
    const [items, setItems] = React.useState<IEvent[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadAllEvents = async () => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const data = await eventsService.getAllEvents();
                setItems(data);
            } catch (error) {
                console.error("Error loading all events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllEvents();
    }, []);

    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onBackToHome();
    };

    const handleEventClick = (id: string, e: React.MouseEvent) => {
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
            <h1 className={styles.allEventsTitle}>ALL UPCOMING EVENTS</h1>
            
            {items.length === 0 ? (
                <div className={styles.emptyState}>No events available</div>
            ) : (
                <div className={styles.allEventsGrid}>
                    {items.map(function(event) {
                        return (
                            <a href="#" key={event.id} onClick={function(e) { handleEventClick(event.id, e); }} className={styles.card}>
                                <div className={styles.imageWrap}>
                                    <img src={event.imageUrl} alt={event.title} loading="lazy" />
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
                        );
                    })}
                </div>
            )}
        </div>
    );
};