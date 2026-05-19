import * as React from 'react';
import styles from './Announcements.module.scss';
import { announcementsService, IAnnouncement } from '../../services/AnnouncementsService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAnnouncementDetailProps {
  id: string;
  onBack: () => void;
  context?: any;
}

export const AnnouncementDetail: React.FC<IAnnouncementDetailProps> = (props) => {
  const [announcement, setAnnouncement] = React.useState<IAnnouncement | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }
        
        const allData = await announcementsService.getAllAnnouncements();
        // Manual find for ES5 compatibility
        let found: IAnnouncement | null = null;
        for (var i = 0; i < allData.length; i++) {
          if (allData[i].id === props.id) {
            found = allData[i];
            break;
          }
        }
        setAnnouncement(found);
      } catch (error) {
        console.error("Error loading announcement detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncement();
  }, [props.id]);

  const handleBackClick = (e: React.MouseEvent) => {
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
    <div className={styles.detailPage}>
      <a href="#" onClick={handleBackClick} className={styles.backLink}>
        ← Back to Announcements
      </a>
      <div className={styles.detailImage}>
        <img src={announcement.imageUrl || "https://picsum.photos/id/20/800/400"} alt={announcement.title} />
      </div>
      <div className={styles.detailContent}>
        <div className={styles.detailDate}>{fullDate}</div>
        <h1 className={styles.detailTitle}>{announcement.title}</h1>
        <div className={styles.detailBody}>
          {announcement.description.split('\n\n').map(function(para, i) {
            return <p key={i}>{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
};