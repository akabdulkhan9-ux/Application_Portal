import * as React from 'react';
import styles from './PowerBIReportsSection.module.scss';

export interface IPowerBIReportCard {
  title: string;
  description: string;
  icon: string;
  pagePath: string;
}

export interface IPowerBIReportsSectionProps {
  reports: IPowerBIReportCard[];
  onNavigate?: (pagePath: string) => void;
}

export class PowerBIReportsSection extends React.Component<IPowerBIReportsSectionProps> {

  private handleReportClick = (pagePath: string): void => {
    const { onNavigate } = this.props;

    if (onNavigate) {
      console.log('[PowerBIReportsSection] Navigating to Power BI page:', pagePath);
      onNavigate(pagePath);
    }
  };

  public render(): React.ReactElement<IPowerBIReportsSectionProps> {
    const { reports } = this.props;

    return (
      <div className={styles.powerBIReportsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>📊 Power BI Reports</h2>
          <p className={styles.sectionSubtitle}>
            Access your reports and dashboards
          </p>
        </div>

        <div className={styles.reportsGrid}>
          {reports.map((report) => (
            <div
              key={report.pagePath}
              className={styles.reportCard}
              onClick={() => this.handleReportClick(report.pagePath)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleReportClick(report.pagePath);
                }
              }}
              aria-label={`Navigate to ${report.title} report`}
            >
              <div className={styles.reportIconWrapper}>
                <span className={styles.reportIcon}>{report.icon}</span>
              </div>
              <div className={styles.reportContent}>
                <h3 className={styles.reportTitle}>{report.title}</h3>
                <p className={styles.reportDescription}>
                  {report.description}
                </p>
                <div className={styles.reportAction}>
                  <span className={styles.viewLink}>
                    View Report
                    <span className={styles.arrowIcon}>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PowerBIReportsSection;