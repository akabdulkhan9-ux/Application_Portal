import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './Announcements.module.scss';
import { announcementsService, IAnnouncement } from '../../services/AnnouncementsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAnnouncementDetailProps {
  id: string;
  onBack: () => void;
  context?: WebPartContext;
}

export const AnnouncementDetail: React.FC<IAnnouncementDetailProps> = (props) => {
  const [announcement, setAnnouncement] = React.useState<IAnnouncement | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadAnnouncement = async (): Promise<void> => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }
        
        const found = await announcementsService.getAnnouncementById(props.id, props.context);
        setAnnouncement(found);
      } catch (error) {
        console.error("Error loading announcement detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncement().catch((): void => undefined);
  }, [props.id, props.context]);

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    props.onBack();
  };

  if (isLoading) {
    return <div className={styles.loadingState}>Loading announcement...</div>;
  }

  if (!announcement) {
    return <div className={styles.emptyState}>Announcement not found.</div>;
  }

  const fullDate = announcement.day + ' ' + announcement.monthYear;

  return (
    <div className={styles.detailPageWrapper}>
      <div className={styles.detailPage}>
        <a href="#" onClick={handleBackClick} className={styles.backLink}>
          ← Back to Announcements
        </a>
        <div className={styles.detailImage}>
          <img 
            src={announcement.imageUrl || "https://picsum.photos/id/20/800/400"} 
            alt={announcement.title}
            onError={(e: React.SyntheticEvent<HTMLImageElement>): void => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/id/20/800/400';
            }}
          />
        </div>
        <div className={styles.detailContent}>
          <div className={styles.detailDate}>{fullDate}</div>
          <h1 className={styles.detailTitle}>{announcement.title}</h1>
          <div className={styles.detailBody}>
            {announcement.description && announcement.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};