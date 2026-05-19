// // import * as React from 'react';
// // import styles from './Events.module.scss';
// // import {
// //     Location20Regular,
// //     Calendar20Regular,
// //     Clock20Regular,
// // } from '@fluentui/react-icons';

// // // Internal interface - replace with import from models folder later
// // interface IEvent {
// //     id: string;
// //     title: string;
// //     location: string;
// //     date: string;
// //     time: string;
// //     imageUrl: string;
// // }

// // export interface IEventsProps {
// //     isDarkTheme?: boolean;
// //     hasTeamsContext?: boolean;
// //     userDisplayName?: string;
// // }

// // export const Events: React.FC<IEventsProps> = () => {
// //     const [items, setItems] = React.useState<IEvent[]>([]);

// //     // Mock data - replace with intranetService.getEvents()
// //     const getMockEvents = (): Promise<IEvent[]> => {
// //         return Promise.resolve([
// //             {
// //                 id: '1',
// //                 title: 'Digital Transformation Summit 2024',
// //                 location: 'Online',
// //                 date: '05 July 2024',
// //                 time: '11:00 AM - 12:00 PM',
// //                 imageUrl: 'https://picsum.photos/id/0/300/140'  // Working image
// //             },
// //             {
// //                 id: '2',
// //                 title: 'Annual Networking & Awards Gala',
// //                 location: 'Grand Hall, HQ',
// //                 date: '12 July 2024',
// //                 time: '6:00 PM - 9:00 PM',
// //                 imageUrl: 'https://picsum.photos/id/1/300/140'  // Working image
// //             },
// //             {
// //                 id: '3',
// //                 title: 'Cybersecurity Awareness Workshop',
// //                 location: 'Training Center, Floor 3',
// //                 date: '20 July 2024',
// //                 time: '2:00 PM - 4:00 PM',
// //                 imageUrl: 'https://picsum.photos/id/2/300/140'  // Working image
// //             }
// //         ]);
// //     };

// //     React.useEffect(() => {
// //         getMockEvents().then(setItems).catch(console.error);
// //     }, []);

// //     return (
// //         <section className={styles.section}>
// //             <header className={styles.head}>
// //                 <h2 className={styles.title}>UPCOMING EVENTS</h2>
// //                 <a href="#" className={styles.viewAll}>
// //                     View All <span>→</span>
// //                 </a>
// //             </header>

// //             <div className={styles.grid}>
// //                 {items.map((e) => (
// //                     <article key={e.id} className={styles.card}>
// //                         <div className={styles.imageWrap}>
// //                             <img src={e.imageUrl} alt={e.title} />
// //                         </div>
// //                         <div className={styles.body}>
// //                             <h3 className={styles.cardTitle}>{e.title}</h3>
// //                             <div className={styles.meta}>
// //                                 <Location20Regular className={styles.icon} />
// //                                 <span>{e.location}</span>
// //                             </div>
// //                             <div className={styles.row}>
// //                                 <div className={styles.meta}>
// //                                     <Calendar20Regular className={styles.icon} />
// //                                     <span>{e.date}</span>
// //                                 </div>
// //                                 <div className={styles.meta}>
// //                                     <Clock20Regular className={styles.icon} />
// //                                     <span>{e.time}</span>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </article>
// //                 ))}
// //             </div>
// //         </section>
// //     );
// // };



// import * as React from 'react';
// import styles from './Events.module.scss';
// import {
//     Location20Regular,
//     Calendar20Regular,
//     Clock20Regular,
// } from '@fluentui/react-icons';
// import { eventsService, IEvent } from '../../services/EventsService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// export interface IEventsProps {
//     isDarkTheme?: boolean;
//     hasTeamsContext?: boolean;
//     userDisplayName?: string;
// }

// export const Events: React.FC<IEventsProps> = () => {
//     const [items, setItems] = React.useState<IEvent[]>([]);
//     const [isLoading, setIsLoading] = React.useState<boolean>(true);

//     React.useEffect(() => {
//         const loadEvents = async () => {
//             try {
//                 // Wait for PnPjs to initialize
//                 let retries = 0;
//                 while (!isPnPjsInitialized() && retries < 10) {
//                     await new Promise(resolve => setTimeout(resolve, 500));
//                     retries++;
//                 }

//                 const data = await eventsService.getEvents();
//                 setItems(data);
//             } catch (error) {
//                 console.error("Error loading events:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadEvents();
//     }, []);

//     if (isLoading) {
//         return (
//             <section className={styles.section}>
//                 <header className={styles.head}>
//                     <h2 className={styles.title}>UPCOMING EVENTS</h2>
//                 </header>
//                 <div className={styles.loadingState}>Loading events...</div>
//             </section>
//         );
//     }

//     if (items.length === 0) {
//         return (
//             <section className={styles.section}>
//                 <header className={styles.head}>
//                     <h2 className={styles.title}>UPCOMING EVENTS</h2>
//                 </header>
//                 <div className={styles.emptyState}>No events available</div>
//             </section>
//         );
//     }

//     return (
//         <section className={styles.section}>
//             <header className={styles.head}>
//                 <h2 className={styles.title}>UPCOMING EVENTS</h2>
//                 <a href="#" className={styles.viewAll}>
//                     View All <span>→</span>
//                 </a>
//             </header>

//             <div className={styles.grid}>
//                 {items.map((e) => (
//                     <article key={e.id} className={styles.card}>
//                         <div className={styles.imageWrap}>
//                             <img src={e.imageUrl} alt={e.title} loading="lazy" />
//                         </div>
//                         <div className={styles.body}>
//                             <h3 className={styles.cardTitle}>{e.title}</h3>
//                             <div className={styles.meta}>
//                                 <Location20Regular className={styles.icon} />
//                                 <span>{e.location}</span>
//                             </div>
//                             <div className={styles.row}>
//                                 <div className={styles.meta}>
//                                     <Calendar20Regular className={styles.icon} />
//                                     <span>{e.date}</span>
//                                 </div>
//                                 <div className={styles.meta}>
//                                     <Clock20Regular className={styles.icon} />
//                                     <span>{e.time}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </article>
//                 ))}
//             </div>
//         </section>
//     );
// };



import * as React from 'react';
import styles from './Events.module.scss';
import { eventsService, IEvent } from '../../services/EventsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';
import {
    Location20Regular,
    Calendar20Regular,
    Clock20Regular,
} from '@fluentui/react-icons';

export interface IEventsProps {
    isDarkTheme?: boolean;
    hasTeamsContext?: boolean;
    userDisplayName?: string;
    onViewAll?: () => void;
    onEventClick?: (id: string) => void;
}

export const Events: React.FC<IEventsProps> = (props) => {
    const [items, setItems] = React.useState<IEvent[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadEvents = async () => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }

                const data = await eventsService.getEvents();
                setItems(data);
            } catch (error) {
                console.error("Error loading events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
    }, []);

    const handleEventClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (props.onEventClick) {
            props.onEventClick(id);
        }
    };

    const handleViewAll = (e: React.MouseEvent) => {
        e.preventDefault();
        if (props.onViewAll) {
            props.onViewAll();
        }
    };

    if (isLoading) {
        return (
            <section className={styles.section}>
                <header className={styles.head}>
                    <h2 className={styles.title}>UPCOMING EVENTS</h2>
                </header>
                <div className={styles.loadingState}>Loading events...</div>
            </section>
        );
    }

    if (items.length === 0) {
        return (
            <section className={styles.section}>
                <header className={styles.head}>
                    <h2 className={styles.title}>UPCOMING EVENTS</h2>
                </header>
                <div className={styles.emptyState}>No events available</div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <header className={styles.head}>
                <h2 className={styles.title}>UPCOMING EVENTS</h2>
                <a href="#" onClick={handleViewAll} className={styles.viewAll}>
                    View All <span>→</span>
                </a>
            </header>

            <div className={styles.grid}>
                {items.map((e) => (
                    <a href="#" key={e.id} onClick={(ev) => handleEventClick(e.id, ev)} className={styles.card}>
                        <div className={styles.imageWrap}>
                            <img src={e.imageUrl} alt={e.title} loading="lazy" />
                        </div>
                        <div className={styles.body}>
                            <h3 className={styles.cardTitle}>{e.title}</h3>
                            <div className={styles.meta}>
                                <Location20Regular className={styles.icon} />
                                <span>{e.location}</span>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.meta}>
                                    <Calendar20Regular className={styles.icon} />
                                    <span>{e.date}</span>
                                </div>
                                <div className={styles.meta}>
                                    <Clock20Regular className={styles.icon} />
                                    <span>{e.time}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};