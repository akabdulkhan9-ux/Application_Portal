

// src/webparts/applicationOperationsPortal/components/PowerBI/PowerBIReportsSection.tsx

import * as React from 'react';
import styles from './PowerBIReportsSection.module.scss';

export interface IPowerBIReportsSectionProps {
  /** Navigation callback to handle report click */
  onNavigate?: () => void;
  /** Optional custom report title */
  title?: string;
  /** Optional report description */
  description?: string;
  /** Optional report icon */
  icon?: string;
}

/**
 * Power BI Reports Section - Navigates to SharePoint Power BI Page
 * 
 * Features:
 * - Single report card with maroon theme
 * - Click navigates to SharePoint Power BI page
 * - Consistent with Meet Our Team and Contact sections
 */
export class PowerBIReportsSection extends React.Component<IPowerBIReportsSectionProps> {

  /**
   * Handle report click - trigger navigation callback
   */
  private handleReportClick = (): void => {
    const { onNavigate } = this.props;
    
    if (onNavigate) {
      console.log('[PowerBIReportsSection] Navigating to Power BI page');
      onNavigate();
    }
  };

  /**
   * Get report data from props or defaults
   */
  private getReportData = (): { title: string; description: string; icon: string } => {
    const { title, description, icon } = this.props;
    
    return {
      title: title || 'AO Incident Management Dashboard',
      description: description || 'Provides a consolidated view of AO incidents, status, trends, SLA performance, and resolution metrics to support effective monitoring and informed decision-making.',
      icon: icon || '📊'
    };
  };

  public render(): React.ReactElement<IPowerBIReportsSectionProps> {
    const { title, description, icon } = this.getReportData();

    return (
      <div className={styles.powerBIReportsSection}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>📊 Power BI Reports</h2>
          <p className={styles.sectionSubtitle}>
            Access your reports and dashboards
          </p>
        </div>

        {/* Report Card */}
        <div className={styles.reportsGrid}>
          <div
            className={styles.reportCard}
            onClick={this.handleReportClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleReportClick();
              }
            }}
            aria-label={`Navigate to ${title} report`}
          >
            <div className={styles.reportIconWrapper}>
              <span className={styles.reportIcon}>{icon}</span>
            </div>
            <div className={styles.reportContent}>
              <h3 className={styles.reportTitle}>{title}</h3>
              <p className={styles.reportDescription}>
                {description}
              </p>
              <div className={styles.reportAction}>
                <span className={styles.viewLink}>
                  View Report
                  <span className={styles.arrowIcon}>→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PowerBIReportsSection;