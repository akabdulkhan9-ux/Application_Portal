

// import * as React from 'react';
// import styles from './Events.module.scss';
// import {
//     Location20Regular,
//     Calendar20Regular,
//     Clock20Regular,
// } from '@fluentui/react-icons';

// export interface IEventItemProps {
//     id: string;
//     title: string;
//     location: string;
//     date: string;
//     time: string;
//     imageUrl: string;
//     description?: string;
//     onCardClick: (id: string) => void;
// }

// export const EventItem: React.FC<IEventItemProps> = (props) => {
//     const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault();
//         props.onCardClick(props.id);
//     };

//     return (
//         <a href="#" onClick={handleCardClick} className={styles.card}>
//             <div className={styles.imageWrap}>
//                 {props.imageUrl ? (
//                     <img src={props.imageUrl} alt={props.title} loading="lazy" />
//                 ) : (
//                     <div className={styles.noImage}>📷 No Image</div>
//                 )}
//             </div>
//             <div className={styles.body}>
//                 <h3 className={styles.cardTitle}>{props.title}</h3>
//                 <div className={styles.meta}>
//                     <Location20Regular className={styles.icon} />
//                     <span>{props.location}</span>
//                 </div>
//                 <div className={styles.row}>
//                     <div className={styles.meta}>
//                         <Calendar20Regular className={styles.icon} />
//                         <span>{props.date}</span>
//                     </div>
//                     <div className={styles.meta}>
//                         <Clock20Regular className={styles.icon} />
//                         <span>{props.time}</span>
//                     </div>
//                 </div>
//             </div>
//         </a>
//     );
// };


import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
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
    context?: WebPartContext;
}

export const AllEvents: React.FC<IAllEventsProps> = (props) => {
    const [items, setItems] = React.useState<IEvent[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadAllEvents = async (): Promise<void> => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const data = await eventsService.getAllEvents(props.context);
                setItems(data);
            } catch (error) {
                console.error("Error loading all events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllEvents().catch((): void => undefined);
    }, [props.context]);

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
                <h1 className={styles.allEventsTitle}>ALL UPCOMING EVENTS</h1>
                
                {items.length === 0 ? (
                    <div className={styles.emptyState}>No events available</div>
                ) : (
                    <div className={styles.allEventsGrid}>
                        {items.map((event) => (
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
                )}
            </div>
        </div>
    );
};