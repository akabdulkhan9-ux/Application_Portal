import * as React from 'react';
import styles from './Footer.module.scss';

export interface IFooterProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
}

export const Footer: React.FC<IFooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>© 2026 CIBC Portal. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};