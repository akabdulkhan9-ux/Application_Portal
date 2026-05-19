import * as React from 'react';
import styles from './Events.module.scss';
import {
    Location20Regular,
    Calendar20Regular,
    Clock20Regular,
} from '@fluentui/react-icons';

export interface IEventItemProps {
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    imageUrl: string;
    description?: string;
    onCardClick: (id: string) => void;
}

export const EventItem: React.FC<IEventItemProps> = (props) => {
    const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.onCardClick(props.id);
    };

    return (
        <a href="#" onClick={handleCardClick} className={styles.card}>
            <div className={styles.imageWrap}>
                <img src={props.imageUrl} alt={props.title} loading="lazy" />
            </div>
            <div className={styles.body}>
                <h3 className={styles.cardTitle}>{props.title}</h3>
                <div className={styles.meta}>
                    <Location20Regular className={styles.icon} />
                    <span>{props.location}</span>
                </div>
                <div className={styles.row}>
                    <div className={styles.meta}>
                        <Calendar20Regular className={styles.icon} />
                        <span>{props.date}</span>
                    </div>
                    <div className={styles.meta}>
                        <Clock20Regular className={styles.icon} />
                        <span>{props.time}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};