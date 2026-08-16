

// src/webparts/applicationOperationsPortal/components/PowerBI/PowerBIReport.tsx

import * as React from 'react';
import styles from './PowerBIReport.module.scss';

export interface IPowerBIReportProps {
  reportUrl: string;
  title?: string;
  description?: string;
  height?: string;
  width?: string;
  className?: string;
  userName?: string;
  userEmail?: string;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface IPowerBIReportState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  iframeReady: boolean;
  loadProgress: number;
  currentUrl: string;
}

export class PowerBIReport extends React.Component<IPowerBIReportProps, IPowerBIReportState> {
  private iframeRef: React.RefObject<HTMLIFrameElement>;
  private loadTimeout: number | null = null;
  private progressInterval: number | null = null;
  private refreshInterval: number | null = null;
  private progressCounter: number = 0;

  constructor(props: IPowerBIReportProps) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      errorMessage: '',
      iframeReady: false,
      loadProgress: 0,
      currentUrl: props.reportUrl
    };
    this.iframeRef = React.createRef();
  }

  public componentDidMount(): void {
    this.startLoadingProcess();
    if (this.props.autoRefresh) {
      this.setupAutoRefresh();
    }
  }

  public componentDidUpdate(prevProps: IPowerBIReportProps): void {
    if (prevProps.reportUrl !== this.props.reportUrl) {
      this.setState({ 
        currentUrl: this.props.reportUrl,
        isLoading: true,
        hasError: false,
        errorMessage: '',
        iframeReady: false,
        loadProgress: 0
      }, () => {
        this.startLoadingProcess();
      });
    }

    if (prevProps.autoRefresh !== this.props.autoRefresh) {
      if (this.props.autoRefresh) {
        this.setupAutoRefresh();
      } else {
        this.clearAutoRefresh();
      }
    }
  }

  public componentWillUnmount(): void {
    this.clearAllTimeouts();
  }

  private startLoadingProcess = (): void => {
    this.progressCounter = 0;
    this.startProgressSimulation();
    
    this.loadTimeout = window.setTimeout(() => {
      if (this.state.isLoading && !this.state.iframeReady) {
        this.handleError('The report is taking too long to load. Please try again.');
      }
    }, 15000);
  };

  private startProgressSimulation = (): void => {
    this.progressInterval = window.setInterval(() => {
      if (this.progressCounter < 90) {
        this.progressCounter += 10;
        this.setState({
          loadProgress: this.progressCounter
        });
      }
    }, 500);
  };

  private setupAutoRefresh = (): void => {
    this.clearAutoRefresh();
    const interval = this.props.refreshInterval || 60;
    this.refreshInterval = window.setInterval(() => {
      console.log('[PowerBIReport] Auto-refreshing report');
      this.refreshReport();
    }, interval * 1000);
  };

  private clearAutoRefresh = (): void => {
    if (this.refreshInterval !== null) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  };

  /**
   * Refresh the report - ES5 Compatible
   * Uses indexOf instead of includes
   */
  private refreshReport = (): void => {
    const iframe = this.iframeRef.current;
    if (iframe) {
      const currentUrl = this.state.currentUrl;
      try {
        const url = new URL(currentUrl);
        url.searchParams.set('_t', Date.now().toString());
        iframe.src = url.toString();
      } catch {
        // ES5 compatible: use indexOf instead of includes
        const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
        iframe.src = currentUrl + separator + '_t=' + Date.now();
      }
      
      this.setState({
        isLoading: true,
        iframeReady: false,
        loadProgress: 0
      }, () => {
        this.startLoadingProcess();
      });
    }
  };

  private resetState = (): void => {
    this.clearAllTimeouts();
    this.progressCounter = 0;
    this.setState({
      isLoading: true,
      hasError: false,
      errorMessage: '',
      iframeReady: false,
      loadProgress: 0
    }, () => {
      this.startLoadingProcess();
    });
  };

  private clearAllTimeouts = (): void => {
    if (this.loadTimeout !== null) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
    if (this.progressInterval !== null) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.clearAutoRefresh();
  };

  private handleIframeLoad = (): void => {
    console.log('[PowerBIReport] Report loaded successfully');
    this.setState({
      isLoading: false,
      iframeReady: true,
      hasError: false,
      loadProgress: 100
    });
    this.clearAllTimeouts();
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  private handleIframeError = (): void => {
    console.error('[PowerBIReport] Failed to load report');
    this.handleError('Failed to load the Power BI report. Please check the URL and try again.');
  };

  private handleError = (message: string): void => {
    this.setState({
      hasError: true,
      errorMessage: message,
      isLoading: false,
      loadProgress: 0
    });
    this.clearAllTimeouts();
    if (this.props.onError) {
      this.props.onError(new Error(message));
    }
  };

  private renderLoading = (): React.ReactNode => {
    const { loadProgress } = this.state;
    const { userName } = this.props;

    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: loadProgress + '%' }} />
        </div>
        <p className={styles.loadingText}>
          {userName ? 'Hello ' + userName + ', loading your report...' : 'Loading Power BI Report...'}
        </p>
        <p className={styles.loadingSubText}>Please wait while the report loads</p>
      </div>
    );
  };

  private renderError = (): React.ReactNode => {
    const { errorMessage } = this.state;

    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Unable to Load Report</h3>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button className={styles.retryButton} onClick={() => this.resetState()}>
          Retry
        </button>
      </div>
    );
  };

  /**
   * Build iframe URL - ES5 Compatible
   * Uses indexOf instead of includes
   */
  private buildIframeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      if (urlObj.searchParams.has('embed') === false) {
        urlObj.searchParams.set('embed', 'true');
      }
      if (urlObj.searchParams.has('showNavBar') === false) {
        urlObj.searchParams.set('showNavBar', 'false');
      }
      if (urlObj.searchParams.has('showFilterBar') === false) {
        urlObj.searchParams.set('showFilterBar', 'false');
      }
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  public render(): React.ReactElement<IPowerBIReportProps> {
    const { title, description, height = '500px', width = '100%', className = '' } = this.props;
    const { isLoading, hasError, currentUrl } = this.state;

    if (hasError) {
      return (
        <div className={styles.powerBIReport + ' ' + className}>
          {title && <h3 className={styles.reportTitle}>{title}</h3>}
          {description && <p className={styles.reportDescription}>{description}</p>}
          {this.renderError()}
        </div>
      );
    }

    const iframeUrl = this.buildIframeUrl(currentUrl);

    return (
      <div className={styles.powerBIReport + ' ' + className}>
        {title && <h3 className={styles.reportTitle}>{title}</h3>}
        {description && <p className={styles.reportDescription}>{description}</p>}
        <div className={styles.reportContainer} style={{ height: height, width: width, position: 'relative' }}>
          {isLoading && this.renderLoading()}
          <iframe
            ref={this.iframeRef}
            className={styles.iframe}
            src={iframeUrl}
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              display: isLoading ? 'none' : 'block'
            }}
            title="Power BI Report"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            allowFullScreen={true}
            onLoad={this.handleIframeLoad}
            onError={this.handleIframeError}
          />
        </div>
      </div>
    );
  }
}

export default PowerBIReport;