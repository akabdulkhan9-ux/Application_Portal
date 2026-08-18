import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './Announcements.module.scss';
import { announcementsService, IAnnouncement } from '../../services/AnnouncementsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAnnouncementsProps {
  title?: string;
  itemsToShow?: number;
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  onViewAll?: () => void;
  onReadMore?: (id: string) => void;
  context?: WebPartContext;
}

export const Announcements: React.FC<IAnnouncementsProps> = (props) => {
  const [items, setItems] = React.useState<IAnnouncement[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadAnnouncements = async (): Promise<void> => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }
        
        const data = await announcementsService.getAnnouncements(props.context);
        const itemsToShow = props.itemsToShow || 3;
        setItems(data.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error loading announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncements().catch((): void => undefined);
  }, [props.itemsToShow, props.context]);

  const handleReadMore = (id: string, e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (props.onReadMore) {
      props.onReadMore(id);
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
          <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
        </header>
        <div className={styles.loadingState}>Loading announcements...</div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className={styles.section}>
        <header className={styles.head}>
          <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
        </header>
        <div className={styles.emptyState}>No announcements available</div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
        <a href="#" onClick={handleViewAll} className={styles.viewAll}>
          View All <span>→</span>
        </a>
      </header>

      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img 
                src={item.imageUrl} 
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
                {item.description?.length > 100 
                  ? `${item.description.substring(0, 100)}...` 
                  : item.description}
              </p>
              <a href="#" onClick={(e) => handleReadMore(item.id, e)} className={styles.readMore}>
                Read More <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};