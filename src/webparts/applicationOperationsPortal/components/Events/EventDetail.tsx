
// import * as React from 'react';
// import styles from './Events.module.scss';
// import { eventsService, IEvent } from '../../services/EventsService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';
// import {
//     Location20Regular,
//     Calendar20Regular,
//     Clock20Regular,
// } from '@fluentui/react-icons';

// export interface IEventDetailProps {
//     id: string;
//     onBack: () => void;
//     context?: any;
// }

// export const EventDetail: React.FC<IEventDetailProps> = (props) => {
//     const [event, setEvent] = React.useState<IEvent | null>(null);
//     const [isLoading, setIsLoading] = React.useState<boolean>(true);

//     React.useEffect(() => {
//         const loadEvent = async () => {
//             try {
//                 let retries = 0;
//                 while (!isPnPjsInitialized() && retries < 10) {
//                     await new Promise(resolve => setTimeout(resolve, 500));
//                     retries++;
//                 }
                
//                 const found = await eventsService.getEventById(props.id, props.context);
//                 setEvent(found);
//             } catch (error) {
//                 console.error("Error loading event detail:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadEvent();
//     }, [props.id, props.context]);

//     const handleBackClick = (e: React.MouseEvent) => {
//         e.preventDefault();
//         props.onBack();
//     };

//     if (isLoading) {
//         return <div className={styles.loadingState}>Loading event...</div>;
//     }

//     if (!event) {
//         return <div className={styles.emptyState}>Event not found.</div>;
//     }

//     return (
//         <div className={styles.detailPage}>
//             <a href="#" onClick={handleBackClick} className={styles.backLink}>
//                 ← Back to Events
//             </a>
//             <div className={styles.detailImage}>
//                 <img src={event.imageUrl} alt={event.title} />
//             </div>
//             <h1 className={styles.detailTitle}>{event.title}</h1>
//             <div className={styles.detailMeta}>
//                 <div className={styles.detailMetaItem}>
//                     <Location20Regular className={styles.detailIcon} />
//                     <span>{event.location}</span>
//                 </div>
//                 <div className={styles.detailMetaItem}>
//                     <Calendar20Regular className={styles.detailIcon} />
//                     <span>{event.date}</span>
//                 </div>
//                 <div className={styles.detailMetaItem}>
//                     <Clock20Regular className={styles.detailIcon} />
//                     <span>{event.time}</span>
//                 </div>
//             </div>
//             <div className={styles.detailBody}>
//                 {event.description ? (
//                     event.description.split('\n\n').map(function(para, i) {
//                         return <p key={i}>{para}</p>;
//                     })
//                 ) : (
//                     <p>No additional details available.</p>
//                 )}
//             </div>
//         </div>
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

export interface IEventDetailProps {
    id: string;
    onBack: () => void;
    context?: WebPartContext;
}

export const EventDetail: React.FC<IEventDetailProps> = (props) => {
    const [event, setEvent] = React.useState<IEvent | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadEvent = async (): Promise<void> => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }
                
                const found = await eventsService.getEventById(props.id, props.context);
                setEvent(found);
            } catch (error) {
                console.error("Error loading event detail:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvent().catch((): void => undefined);
    }, [props.id, props.context]);

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        props.onBack();
    };

    if (isLoading) {
        return <div className={styles.loadingState}>Loading event...</div>;
    }

    if (!event) {
        return <div className={styles.emptyState}>Event not found.</div>;
    }

    return (
        <div className={styles.detailPageWrapper}>
            <div className={styles.detailPage}>
                <a href="#" onClick={handleBackClick} className={styles.backLink}>
                    ← Back to Events
                </a>
                <div className={styles.detailImage}>
                    <img src={event.imageUrl} alt={event.title} />
                </div>
                <h1 className={styles.detailTitle}>{event.title}</h1>
                <div className={styles.detailMeta}>
                    <div className={styles.detailMetaItem}>
                        <Location20Regular className={styles.detailIcon} />
                        <span>{event.location}</span>
                    </div>
                    <div className={styles.detailMetaItem}>
                        <Calendar20Regular className={styles.detailIcon} />
                        <span>{event.date}</span>
                    </div>
                    <div className={styles.detailMetaItem}>
                        <Clock20Regular className={styles.detailIcon} />
                        <span>{event.time}</span>
                    </div>
                </div>
                <div className={styles.detailBody}>
                    {event.description ? (
                        event.description.split('\n\n').map(function(para, i) {
                            return <p key={i}>{para}</p>;
                        })
                    ) : (
                        <p>No additional details available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};