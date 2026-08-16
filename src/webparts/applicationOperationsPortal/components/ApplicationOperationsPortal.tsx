


// // src/webparts/applicationOperationsPortal/components/ApplicationOperationsPortal.tsx

// import * as React from 'react';
// import styles from './ApplicationOperationsPortal.module.scss';
// import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';

// // Import section components
// import { HeroBanner } from './HeroBanner/HeroBanner';
// import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
// import { Contact } from './Contact/Contact';
// import { Footer } from './Footer/Footer';

// // Import Power BI Reports Section
// import { PowerBIReportsSection } from './PowerBI/PowerBIReportsSection';

// // Import User Service
// import { userService, IUserInfo } from '../services/UserService';

// // Import PnPjs utilities
// import { initPnPjs } from '../services/pnpjsConfig';

// type ViewMode = 'home' | 'contact';

// interface IApplicationOperationsPortalState {
//   isPnPjsReady: boolean;
//   currentView: ViewMode;
//   selectedId: string | null;
//   currentUser: IUserInfo | null;
//   isUserLoaded: boolean;
// }

// export default class ApplicationOperationsPortal extends React.Component<
//   IApplicationOperationsPortalProps,
//   IApplicationOperationsPortalState
// > {
//   constructor(props: IApplicationOperationsPortalProps) {
//     super(props);
//     this.state = {
//       isPnPjsReady: false,
//       currentView: 'home',
//       selectedId: null,
//       currentUser: null,
//       isUserLoaded: false
//     };
//   }

//   async componentDidMount() {
//     if (this.props.spfxContext) {
//       await initPnPjs(this.props.spfxContext);
//       this.setState({ isPnPjsReady: true });

//       await this.loadCurrentUser();
//     } else {
//       this.setState({
//         isPnPjsReady: true,
//         isUserLoaded: true
//       });
//     }

//     this.checkUrlParams();
//     window.addEventListener('popstate', () => {
//       this.checkUrlParams();
//     });
//   }

//   private loadCurrentUser = async (): Promise<void> => {
//     try {
//       const user = await userService.getCurrentUser();
//       this.setState({
//         currentUser: user,
//         isUserLoaded: true
//       });
//       console.log('[ApplicationOperationsPortal] User loaded:', user.displayName);
//     } catch (error) {
//       console.error('[ApplicationOperationsPortal] Error loading user:', error);
//       this.setState({ isUserLoaded: true });
//     }
//   };

//   /**
//    * Check URL parameters for routing
//    */
//   private checkUrlParams = (): void => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const page = urlParams.get('page');

//     if (page === 'contact') {
//       this.setState({ currentView: 'contact', selectedId: null });
//     } else {
//       this.setState({ currentView: 'home', selectedId: null });
//     }
//   };

//   /**
//    * Get the Power BI page URL dynamically using context
//    */
//   private getPowerBIPageUrl = (): string => {
//     const { spfxContext } = this.props;
//     const webUrl = spfxContext?.pageContext?.web?.absoluteUrl || '';
//     const cleanWebUrl = webUrl.replace(/\/$/, '');
//     const powerBIPageUrl = `${cleanWebUrl}/SitePages/PowerBI.aspx`;
//     console.log('[ApplicationOperationsPortal] Power BI page URL:', powerBIPageUrl);
//     return powerBIPageUrl;
//   };

//   /**
//    * Navigate to Power BI page (opens in new tab)
//    */
//   private navigateToPowerBIPage = (): void => {
//     const powerBIPageUrl = this.getPowerBIPageUrl();
//     console.log('[ApplicationOperationsPortal] Navigating to Power BI page:', powerBIPageUrl);
//     window.open(powerBIPageUrl, '_blank');
//   };

//   private renderView = (): React.ReactNode => {
//     const { currentView } = this.state;
//     const { spfxContext } = this.props;

//     switch (currentView) {
//       case 'contact':
//         return <Contact context={spfxContext} />;

//       default:
//         return (
//           <>
//             <HeroBanner context={spfxContext} />
//             <div className={styles.contentGrid}>
//               <aside className={styles.sidebar}>
//                 <MeetOurTeam 
//                   context={spfxContext}
//                   maxHeight="400px"
//                   showSearch={true}
//                 />
//               </aside>
//               <section className={styles.contentArea}>
//                 {/* Power BI Reports Section with New Title & Description */}
//                 <div className={styles.reportsSection}>
//                   <PowerBIReportsSection
//                     onNavigate={this.navigateToPowerBIPage}
//                     title="AO Incident Management Dashboard"
//                     description="Provides a consolidated view of AO incidents, status, trends, SLA performance, and resolution metrics to support effective monitoring and informed decision-making."
//                     icon="📊"
//                   />
//                 </div>

//                 <div className={styles.contactSectionWrapper}>
//                   <Contact context={spfxContext} />
//                 </div>
//               </section>
//             </div>
//           </>
//         );
//     }
//   };

//   public render(): React.ReactElement<IApplicationOperationsPortalProps> {
//     if (!this.state.isPnPjsReady || !this.state.isUserLoaded) {
//       return (
//         <div className={styles.applicationOperationsPortal}>
//           <div className={styles.loadingContainer}>
//             <div className={styles.spinner}></div>
//             <p>
//               {!this.state.isPnPjsReady
//                 ? 'Initializing application...'
//                 : 'Loading user information...'}
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={styles.applicationOperationsPortal}>
//         <main className={styles.main}>
//           {this.renderView()}
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }




// src/webparts/applicationOperationsPortal/components/ApplicationOperationsPortal.tsx

import * as React from 'react';
import styles from './ApplicationOperationsPortal.module.scss';
import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';

// Import section components
import { HeroBanner } from './HeroBanner/HeroBanner';
import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
import { Contact } from './Contact/Contact';
import { Footer } from './Footer/Footer';
import { PowerBIReportsSection } from './PowerBI/PowerBIReportsSection';
import { AnniversariesBirthday } from './AnniversariesBirthday/AnniversariesBirthday';  // 👈 NEW

// Import User Service
import { userService, IUserInfo } from '../services/UserService';
import { initPnPjs } from '../services/pnpjsConfig';

type ViewMode = 'home' | 'contact';

interface IApplicationOperationsPortalState {
  isPnPjsReady: boolean;
  currentView: ViewMode;
  selectedId: string | undefined;
  currentUser: IUserInfo | undefined;
  isUserLoaded: boolean;
}

export default class ApplicationOperationsPortal extends React.Component<
  IApplicationOperationsPortalProps,
  IApplicationOperationsPortalState
> {
  constructor(props: IApplicationOperationsPortalProps) {
    super(props);
    this.state = {
      isPnPjsReady: false,
      currentView: 'home',
      selectedId: undefined,
      currentUser: undefined,
      isUserLoaded: false
    };
  }

  async componentDidMount(): Promise<void> {
    if (this.props.spfxContext) {
      await initPnPjs(this.props.spfxContext);
      this.setState({ isPnPjsReady: true });
      await this.loadCurrentUser();
    } else {
      this.setState({
        isPnPjsReady: true,
        isUserLoaded: true
      });
    }

    this.checkUrlParams();
    window.addEventListener('popstate', () => {
      this.checkUrlParams();
    });
  }

  componentWillUnmount(): void {
    window.removeEventListener('popstate', this.checkUrlParams);
  }

  private loadCurrentUser = async (): Promise<void> => {
    try {
      const user = await userService.getCurrentUser();
      this.setState({
        currentUser: user,
        isUserLoaded: true
      });
      console.log('[ApplicationOperationsPortal] User loaded:', user.displayName);
    } catch (error) {
      console.error('[ApplicationOperationsPortal] Error loading user:', error);
      this.setState({ isUserLoaded: true });
    }
  };

  private checkUrlParams = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    if (page === 'contact') {
      this.setState({ currentView: 'contact', selectedId: undefined });
    } else {
      this.setState({ currentView: 'home', selectedId: undefined });
    }
  };

  private getPowerBIPageUrl = (): string => {
    const { spfxContext } = this.props;
    const webUrl = spfxContext?.pageContext?.web?.absoluteUrl || '';
    const cleanWebUrl = webUrl.replace(/\/$/, '');
    return `${cleanWebUrl}/SitePages/PowerBI.aspx`;
  };

  private navigateToPowerBIPage = (): void => {
    const powerBIPageUrl = this.getPowerBIPageUrl();
    window.open(powerBIPageUrl, '_blank');
  };

  private renderView = (): React.ReactNode => {
    const { currentView } = this.state;
    const { spfxContext } = this.props;

    switch (currentView) {
      case 'contact':
        return <Contact context={spfxContext} />;

      default:
        return (
          <>
            <HeroBanner context={spfxContext} />
            <div className={styles.contentGrid}>
              <aside className={styles.sidebar}>
                <MeetOurTeam 
                  context={spfxContext}
                  maxHeight="400px"
                  showSearch={true}
                />
              </aside>
              <section className={styles.contentArea}>
                {/* Power BI Reports Section */}
                <div className={styles.reportsSection}>
                  <PowerBIReportsSection
                    onNavigate={this.navigateToPowerBIPage}
                    title="AO Incident Management Dashboard"
                    description="Provides a consolidated view of AO incidents, status, trends, SLA performance, and resolution metrics to support effective monitoring and informed decision-making."
                    icon="📊"
                  />
                </div>

                {/* 👇 NEW: Anniversaries & Birthdays Section */}
                <div className={styles.reportsSection}>
                  <AnniversariesBirthday context={spfxContext} />
                </div>

                {/* Employee Leave + Contact Section */}
                <div className={styles.reportsSection}>
                  <Contact context={spfxContext} />
                </div>
              </section>
            </div>
          </>
        );
    }
  };

  public render(): React.ReactElement<IApplicationOperationsPortalProps> {
    if (!this.state.isPnPjsReady || !this.state.isUserLoaded) {
      return (
        <div className={styles.applicationOperationsPortal}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p>
              {!this.state.isPnPjsReady
                ? 'Initializing application...'
                : 'Loading user information...'}
            </p>
          </div>
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