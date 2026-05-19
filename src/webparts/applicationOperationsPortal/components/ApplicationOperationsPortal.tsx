// // import * as React from 'react';
// // import styles from './ApplicationOperationsPortal.module.scss';
// // import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';

// // // Import all section components
// // import { Header } from './Header/Header';
// // import { HeroBanner } from './HeroBanner/HeroBanner';
// // import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
// // import { Announcements } from './Announcements/Announcements';
// // import { Events } from './Events/Events';
// // import { Contact } from './Contact/Contact';
// // import { Footer } from './Footer/Footer';

// // export default class ApplicationOperationsPortal extends React.Component<IApplicationOperationsPortalProps, {}> {
// //   public render(): React.ReactElement<IApplicationOperationsPortalProps> {
// //     return (
// //       <div className={styles.applicationOperationsPortal}>
// //         <Header 
// //           isDarkTheme={this.props.isDarkTheme}
// //           userDisplayName={this.props.userDisplayName}
// //         />
        
// //         <main className={styles.main}>
// //           <HeroBanner />
          
// //           <div className={styles.contentGrid}>
// //             <aside className={styles.sidebar}>
// //               <MeetOurTeam />
// //             </aside>
            
// //             <section className={styles.contentArea}>
// //               <Announcements 
// //                 title="ANNOUNCEMENTS"
// //                 itemsToShow={3}
// //                 isDarkTheme={this.props.isDarkTheme}
// //                 hasTeamsContext={this.props.hasTeamsContext}
// //                 userDisplayName={this.props.userDisplayName}
// //               />
// //               <Events />
// //               <Contact />
// //             </section>
// //           </div>
// //         </main>
        
// //         <Footer />
// //       </div>
// //     );
// //   }
// // }

// import * as React from 'react';
// import styles from './ApplicationOperationsPortal.module.scss';
// import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';
// import { initPnPjs } from '../services/pnpjsConfig';

// // Import all section components
// // import { Header } from './Header/Header';
// import { HeroBanner } from './HeroBanner/HeroBanner';
// import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
// import { Announcements } from './Announcements/Announcements';
// import { Events } from './Events/Events';
// import { Contact } from './Contact/Contact';
// import { Footer } from './Footer/Footer';

// export default class ApplicationOperationsPortal extends React.Component<IApplicationOperationsPortalProps, { isPnPjsReady: boolean }> {
  
//   constructor(props: IApplicationOperationsPortalProps) {
//     super(props);
//     this.state = { isPnPjsReady: false };
//   }

//   async componentDidMount() {
//     // Initialize PnPjs using context passed from web part
//     if (this.props.spfxContext) {
//       await initPnPjs(this.props.spfxContext);
//       this.setState({ isPnPjsReady: true });
//     } else {
//       // If no context, still show content (use mock data)
//       this.setState({ isPnPjsReady: true });
//     }
//   }

//   public render(): React.ReactElement<IApplicationOperationsPortalProps> {
//     // Show loading until PnPjs is ready (optional)
//     if (!this.state.isPnPjsReady) {
//       return (
//         <div className={styles.applicationOperationsPortal}>
//           <div style={{ textAlign: 'center', padding: '50px' }}>Loading portal...</div>
//         </div>
//       );
//     }

//     return (
//       <div className={styles.applicationOperationsPortal}>
//         {/* <Header 
//           isDarkTheme={this.props.isDarkTheme}
//           userDisplayName={this.props.userDisplayName}
//         /> */}
        
//         <main className={styles.main}>
//           <HeroBanner />
          
//           <div className={styles.contentGrid}>
//             <aside className={styles.sidebar}>
//               <MeetOurTeam />
//             </aside>
            
//             <section className={styles.contentArea}>
//               <Announcements 
//                 title="ANNOUNCEMENTS"
//                 itemsToShow={3}
//               />
//               <Events />
//               <Contact />
//             </section>
//           </div>
//         </main>
        
//         <Footer />
//       </div>
//     );
//   }
// }


import * as React from 'react';
import styles from './ApplicationOperationsPortal.module.scss';
import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';
import { initPnPjs } from '../services/pnpjsConfig';

// Import all section components
import { HeroBanner } from './HeroBanner/HeroBanner';
import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
import { Announcements } from './Announcements/Announcements';
import { AnnouncementDetail } from './Announcements/AnnouncementDetail';
import { AllAnnouncements } from './Announcements/AllAnnouncements';
import { Events } from './Events/Events';
import { EventDetail } from './Events/EventDetail';
import { AllEvents } from './Events/AllEvents';
import { Contact } from './Contact/Contact';
import { Footer } from './Footer/Footer';

type ViewMode = 'home' | 'announcements' | 'announcementDetail' | 'events' | 'eventDetail' | 'contact';

export default class ApplicationOperationsPortal extends React.Component<IApplicationOperationsPortalProps, { 
  isPnPjsReady: boolean;
  currentView: ViewMode;
  selectedId: string | null;
}> {
  
  constructor(props: IApplicationOperationsPortalProps) {
    super(props);
    this.state = { 
      isPnPjsReady: false,
      currentView: 'home',
      selectedId: null
    };
  }

  async componentDidMount() {
    // Initialize PnPjs using context passed from web part
    if (this.props.spfxContext) {
      await initPnPjs(this.props.spfxContext);
      this.setState({ isPnPjsReady: true });
    } else {
      this.setState({ isPnPjsReady: true });
    }
    
    // Check URL parameters for routing
    this.checkUrlParams();
    
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.checkUrlParams();
    });
  }

  private checkUrlParams = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const id = urlParams.get('id');
    
    if (page === 'announcements') {
      this.setState({ currentView: 'announcements', selectedId: null });
    } else if (page === 'announcement' && id) {
      this.setState({ currentView: 'announcementDetail', selectedId: id });
    } else if (page === 'events') {
      this.setState({ currentView: 'events', selectedId: null });
    } else if (page === 'event' && id) {
      this.setState({ currentView: 'eventDetail', selectedId: id });
    } else if (page === 'contact') {
      this.setState({ currentView: 'contact', selectedId: null });
    } else {
      this.setState({ currentView: 'home', selectedId: null });
    }
  }

  private navigateTo = (view: ViewMode, id?: string): void => {
    let newUrl = window.location.pathname + '?page=' + view;
    if (id) {
      newUrl += '&id=' + id;
    }
    window.history.pushState({}, '', newUrl);
    this.setState({ currentView: view, selectedId: id || null });
  };

  private renderView = (): React.ReactNode => {
    const { currentView, selectedId } = this.state;
    const { spfxContext } = this.props;

    switch (currentView) {
      case 'announcements':
        return (
          <AllAnnouncements 
            onBackToHome={() => this.navigateTo('home')}
            onAnnouncementClick={(id) => this.navigateTo('announcementDetail', id)}
            context={spfxContext}
          />
        );
        
      case 'announcementDetail':
        return (
          <AnnouncementDetail 
            id={selectedId || ''}
            onBack={() => this.navigateTo('announcements')}
            context={spfxContext}
          />
        );
        
      case 'events':
        return (
          <AllEvents 
            onBackToHome={() => this.navigateTo('home')}
            onEventClick={(id) => this.navigateTo('eventDetail', id)}
            context={spfxContext}
          />
        );
        
      case 'eventDetail':
        return (
          <EventDetail 
            id={selectedId || ''}
            onBack={() => this.navigateTo('events')}
            context={spfxContext}
          />
        );
        
      case 'contact':
        return <Contact />;
        
      default:
        return (
          <>
            <HeroBanner />
            <div className={styles.contentGrid}>
              <aside className={styles.sidebar}>
                <MeetOurTeam />
              </aside>
              <section className={styles.contentArea}>
                <Announcements 
                  title="ANNOUNCEMENTS"
                  itemsToShow={3}
                  onViewAll={() => this.navigateTo('announcements')}
                  onReadMore={(id) => this.navigateTo('announcementDetail', id)}
                />
                <Events 
                  onViewAll={() => this.navigateTo('events')}
                  onEventClick={(id) => this.navigateTo('eventDetail', id)}
                />
                <Contact />
              </section>
            </div>
          </>
        );
    }
  };

  public render(): React.ReactElement<IApplicationOperationsPortalProps> {
    if (!this.state.isPnPjsReady) {
      return (
        <div className={styles.applicationOperationsPortal}>
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading portal...</div>
        </div>
      );
    }

    return (
      <div className={styles.applicationOperationsPortal}>
        <main className={styles.main}>
          {this.renderView()}
        </main>
        <Footer />
      </div>
    );
  }
}