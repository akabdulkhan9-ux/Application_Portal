// // import * as React from 'react';
// // import styles from './Announcements.module.scss';

// // // Internal interface - replace with import from models folder later
// // interface IAnnouncement {
// //     id: string;
// //     title: string;
// //     description: string;
// //     day: string;
// //     monthYear: string;
// //     imageUrl: string;
// //     link?: string;
// // }

// // export interface IAnnouncementsProps {
// //     title?: string;
// //     itemsToShow?: number;
// //     isDarkTheme?: boolean;
// //     hasTeamsContext?: boolean;
// //     userDisplayName?: string;
// // }

// // export const Announcements: React.FC<IAnnouncementsProps> = (props) => {
// //     const [items, setItems] = React.useState<IAnnouncement[]>([]);
// //     const [isLoading, setIsLoading] = React.useState<boolean>(true);

// //     // Mock data service - replace with your actual intranetService later
// //     const getMockAnnouncements = (): Promise<IAnnouncement[]> => {
// //         return Promise.resolve([
// //             {
// //                 id: '1',
// //                 title: 'Application Operations Launch',
// //                 description: 'Dear Colleagues, it is my privilege to lead the Application Operations department...',
// //                 day: '02',
// //                 monthYear: 'JAN 2024',
// //                 imageUrl: 'https://picsum.photos/id/20/300/150',  // Working image
// //                 link: '#'
// //             },
// //             {
// //                 id: '2',
// //                 title: 'Cybersecurity Awareness Workshop',
// //                 description: 'Join us for an interactive workshop on security best practices...',
// //                 day: '20',
// //                 monthYear: 'JUL 2024',
// //                 imageUrl: 'https://picsum.photos/id/26/300/150',  // Working image
// //                 link: '#'
// //             },
// //             {
// //                 id: '3',
// //                 title: 'Digital Transformation Summit',
// //                 description: 'Learn about our digital roadmap and emerging technologies...',
// //                 day: '05',
// //                 monthYear: 'JUL 2024',
// //                 imageUrl: 'https://picsum.photos/id/24/300/150',  // Working image
// //                 link: '#'
// //             }
// //         ]);
// //     };

// //     React.useEffect(() => {
// //         // TODO: Replace with intranetService.getAnnouncements()
// //         getMockAnnouncements()
// //             .then(data => {
// //                 const itemsToShow = props.itemsToShow || 3;
// //                 setItems(data.slice(0, itemsToShow));
// //                 setIsLoading(false);
// //             })
// //             .catch(error => {
// //                 console.error('Error loading announcements:', error);
// //                 setIsLoading(false);
// //             });
// //     }, [props.itemsToShow]);

// //     // Loading state
// //     if (isLoading) {
// //         return (
// //             <section className={styles.section}>
// //                 <header className={styles.head}>
// //                     <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
// //                 </header>
// //                 <div className={styles.loadingState}>Loading announcements...</div>
// //             </section>
// //         );
// //     }

// //     // Empty state
// //     if (items.length === 0) {
// //         return (
// //             <section className={styles.section}>
// //                 <header className={styles.head}>
// //                     <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
// //                 </header>
// //                 <div className={styles.emptyState}>No announcements available</div>
// //             </section>
// //         );
// //     }

// //     return (
// //         <section className={styles.section}>
// //             <header className={styles.head}>
// //                 <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
// //                 <a href="#" className={styles.viewAll}>
// //                     View All <span>→</span>
// //                 </a>
// //             </header>

// //             <div className={styles.grid}>
// //                 {items.map((item) => (
// //                     <article key={item.id} className={styles.card}>
// //                         <div className={styles.imageWrap}>
// //                             <img src={item.imageUrl} alt={item.title} loading="lazy" />
// //                             <div className={styles.date}>
// //                                 <span className={styles.day}>{item.day}</span>
// //                                 <span className={styles.month}>{item.monthYear}</span>
// //                             </div>
// //                         </div>
// //                         <div className={styles.body}>
// //                             <h3 className={styles.cardTitle}>{item.title}</h3>
// //                             <p className={styles.desc}>
// //                                 {item.description.length > 120
// //                                     ? `${item.description.substring(0, 120)}...`
// //                                     : item.description}
// //                             </p>
// //                             <a href={item.link || '#'} className={styles.readMore}>
// //                                 Read More <span>→</span>
// //                             </a>
// //                         </div>
// //                     </article>
// //                 ))}
// //             </div>
// //         </section>
// //     );
// // };


// import * as React from "react";
// import styles from "./Announcements.module.scss";
// import { announcementsService, IAnnouncement } from "../../services/AnnouncementsService";
// import { isPnPjsInitialized } from "../../services/pnpjsConfig";

// export interface IAnnouncementsProps {
//   title?: string;
//   itemsToShow?: number;
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// export const Announcements: React.FC<IAnnouncementsProps> = (props) => {
//   const [items, setItems] = React.useState<IAnnouncement[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

//   React.useEffect(() => {
//     const loadAnnouncements = async () => {
//       try {
//         // Wait for PnPjs to initialize
//         let retries = 0;
//         while (!isPnPjsInitialized() && retries < 10) {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           retries++;
//         }
        
//         const data = await announcementsService.getAnnouncements();
//         const itemsToShow = props.itemsToShow || 3;
//         setItems(data.slice(0, itemsToShow));
//       } catch (error) {
//         console.error("Error loading announcements:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadAnnouncements();
//   }, [props.itemsToShow]);

//   if (isLoading) {
//     return (
//       <section className={styles.section}>
//         <header className={styles.head}>
//           <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
//         </header>
//         <div className={styles.loadingState}>Loading announcements...</div>
//       </section>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <section className={styles.section}>
//         <header className={styles.head}>
//           <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
//         </header>
//         <div className={styles.emptyState}>No announcements available</div>
//       </section>
//     );
//   }

//   return (
//     <section className={styles.section}>
//       <header className={styles.head}>
//         <h2 className={styles.title}>{props.title || 'ANNOUNCEMENTS'}</h2>
//         <a href="#" className={styles.viewAll}>
//           View All <span>→</span>
//         </a>
//       </header>

//       <div className={styles.grid}>
//         {items.map((item) => (
//           <article key={item.id} className={styles.card}>
//             <div className={styles.imageWrap}>
//               <img src={item.imageUrl || "https://picsum.photos/id/20/300/150"} alt={item.title} loading="lazy" />
//               <div className={styles.date}>
//                 <span className={styles.day}>{item.day}</span>
//                 <span className={styles.month}>{item.monthYear}</span>
//               </div>
//             </div>
//             <div className={styles.body}>
//               <h3 className={styles.cardTitle}>{item.title}</h3>
//               <p className={styles.desc}>
//                 {item.description?.length > 120 
//                   ? `${item.description.substring(0, 120)}...` 
//                   : item.description}
//               </p>
//               <a href="#" className={styles.readMore}>
//                 Read More <span>→</span>
//               </a>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };


import * as React from 'react';
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
}

export const Announcements: React.FC<IAnnouncementsProps> = (props) => {
  const [items, setItems] = React.useState<IAnnouncement[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }
        
        const data = await announcementsService.getAnnouncements();
        const itemsToShow = props.itemsToShow || 3;
        setItems(data.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error loading announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncements();
  }, [props.itemsToShow]);

  const handleReadMore = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (props.onReadMore) {
      props.onReadMore(id);
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
              <img src={item.imageUrl || "https://picsum.photos/id/20/300/150"} alt={item.title} loading="lazy" />
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