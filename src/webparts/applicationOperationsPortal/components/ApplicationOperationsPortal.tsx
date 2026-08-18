import * as React from 'react';
import styles from './ApplicationOperationsPortal.module.scss';
import { IApplicationOperationsPortalProps } from './IApplicationOperationsPortalProps';
import { HeroBanner } from './HeroBanner/HeroBanner';
import { MeetOurTeam } from './MeetOurTeam/MeetOurTeam';
import { Contact } from './Contact/Contact';
import { Footer } from './Footer/Footer';
import { PowerBIReportsSection } from './PowerBI/PowerBIReportsSection';
import { AnniversariesBirthday } from './AnniversariesBirthday/AnniversariesBirthday';
import { userService } from '../services/UserService';
import { initPnPjs } from '../services/pnpjsConfig';

type ViewMode = 'home' | 'contact';

interface IApplicationOperationsPortalState {
  isPnPjsReady: boolean;
  currentView: ViewMode;
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
      await userService.getCurrentUser();
      this.setState({ isUserLoaded: true });
    } catch (error) {
      console.error('[ApplicationOperationsPortal] Error loading user:', error);
      this.setState({ isUserLoaded: true });
    }
  };

  private checkUrlParams = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    if (page === 'contact') {
      this.setState({ currentView: 'contact' });
    } else {
      this.setState({ currentView: 'home' });
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
                <div className={styles.reportsSection}>
                  <PowerBIReportsSection
                    onNavigate={this.navigateToPowerBIPage}
                    title="AO Incident Management Dashboard"
                    description="Provides a consolidated view of AO incidents, status, trends, SLA performance, and resolution metrics to support effective monitoring and informed decision-making."
                    icon="📊"
                  />
                </div>

                <div className={`${styles.reportsSection} ${styles.hideAnniversariesBirthday}`}>
                  <AnniversariesBirthday context={spfxContext} />
                </div>

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