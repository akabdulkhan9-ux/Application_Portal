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

export interface IEventsProps {
    isDarkTheme?: boolean;
    hasTeamsContext?: boolean;
    userDisplayName?: string;
    onViewAll?: () => void;
    onEventClick?: (id: string) => void;
    context?: WebPartContext;
}

export const Events: React.FC<IEventsProps> = (props) => {
    const [items, setItems] = React.useState<IEvent[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadEvents = async (): Promise<void> => {
            try {
                let retries = 0;
                while (!isPnPjsInitialized() && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    retries++;
                }

                const data = await eventsService.getEvents(props.context);
                setItems(data);
            } catch (error) {
                console.error("Error loading events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents().catch((): void => undefined);
    }, [props.context]);

    const handleEventClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        if (props.onEventClick) {
            props.onEventClick(id);
        }
    };

    const handleViewAll = (e: React.MouseEvent<HTMLAnchorElement>): void => {
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
                    View All →
                </a>
            </header>

            <div className={styles.grid}>
                {items.map((e) => (
                    <a href="#" key={e.id} onClick={(ev) => handleEventClick(e.id, ev)} className={styles.card}>
                        <div className={styles.imageWrap}>
                            {e.imageUrl ? (
                                <img 
                                    src={e.imageUrl} 
                                    alt={e.title} 
                                    loading="lazy"
                                />
                            ) : (
                                <div className={styles.noImage}>📷 No Image</div>
                            )}
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