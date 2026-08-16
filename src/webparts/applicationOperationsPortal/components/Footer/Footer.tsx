// import * as React from 'react';
// import styles from './Footer.module.scss';

// export interface IFooterProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// const COLUMNS: { items: string[] }[] = [
//   { items: ["Exclusive Offer", "Organization Chart", "Sitemap"] },
//   { items: ["News", "Upcoming Events", "Photos & Videos"] },
//   { items: ["Employee Awards", "Colleagues Newfeed", "Tawasul Hub"] },
//   { items: ["Terms", "Privacy", "Security"] },
// ];

// export const Footer: React.FC<IFooterProps> = () => {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.inner}>
//         <div className={styles.brand}>
//           <div className={styles.logo}>UNITED ARAB BANK</div>
//           <div className={styles.copy}>Copyright © 2024</div>
//         </div>
//         <div className={styles.columns}>
//           {COLUMNS.map((col, idx) => (
//             <ul key={idx} className={styles.column}>
//               {col.items.map((it) => (
//                 <li key={it}>
//                   <a href="#">{it}</a>
//                 </li>
//               ))}
//             </ul>
//           ))}
//         </div>
//         <div className={styles.socials}>
//           <a href="#" aria-label="Facebook">f</a>
//           <a href="#" aria-label="LinkedIn">in</a>
//           <a href="#" aria-label="X">X</a>
//           <a href="#" aria-label="Instagram">ig</a>
//           <a href="#" aria-label="YouTube">yt</a>
//           <a href="#" aria-label="TikTok">tt</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

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