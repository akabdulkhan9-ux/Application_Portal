// import * as React from "react";
// import styles from "./HeroBanner.module.scss";

// // Internal interface - replace with import from models folder later
// interface IHeroAction {
//   id: string;
//   label: string;
//   url: string;
// }

// export interface IHeroBannerProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// const HERO_IMAGE =
//   "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80";

// const TITLE = "Application Operations Announcement";

// const PARAGRAPHS: string[] = [
//   "Dear Colleagues, it is my privilege to lead the Application Operations department at CIBC Bank. Our mission is to ensure the stability, performance and resilience of every business-critical application that powers our customers' banking experience — around the clock, every day of the year.",
//   "In the coming months, we will strengthen our incident response, deepen observability across core platforms, and accelerate automation for routine operational tasks. These investments will reduce downtime, sharpen our SLAs and free our engineers to focus on high-value improvements across Issuing, Core Banking, Contact Center and Wealth platforms.",
//   "I want to thank every member of the team for their commitment and vigilance. Your dedication keeps CIBC Bank running — and earns the trust our customers place in us every single day.",
// ];

// export const HeroBanner: React.FC<IHeroBannerProps> = () => {
//   const [actions, setActions] = React.useState<IHeroAction[]>([]);

//   // Mock data - replace with intranetService.getHeroActions()
//   const getMockActions = (): Promise<IHeroAction[]> => {
//     return Promise.resolve([
//       { id: "1", label: "Issuing & Acquiring", url: "#" },
//       { id: "2", label: "Contact Center", url: "#" },
//       { id: "3", label: "Core Banking", url: "#" },
//       { id: "4", label: "Wealth Platforms", url: "#" }
//     ]);
//   };

//   React.useEffect(() => {
//     getMockActions().then(setActions).catch(console.error);
//   }, []);

//   return (
//     <section className={styles.hero}>
//       <div className={styles.imageWrap}>
//         <img src={HERO_IMAGE} alt="Application Operations Lead" />
//       </div>
//       <div className={styles.content}>
//         <h1 className={styles.title}>{TITLE}</h1>
//         {PARAGRAPHS.map((p, i) => (
//           <p key={i} className={styles.paragraph}>
//             {p}
//           </p>
//         ))}

//         <div className={styles.actions}>
//           {actions.map((a) => (
//             <a key={a.id} href={a.url} className={styles.actionButton}>
//               <span>{a.label}</span>
//               <span className={styles.arrow}>→</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import * as React from "react";
import styles from "./HeroBanner.module.scss";

interface IHeroAction {
  id: string;
  label: string;
  url: string;
}

export interface IHeroBannerProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80";

const TITLE = "Application Operations Announcement";

const PARAGRAPHS: string[] = [
  "Dear Colleagues, it is my privilege to lead the Application Operations department at CIBC Bank. Our mission is to ensure the stability, performance and resilience of every business-critical application that powers our customers' banking experience — around the clock, every day of the year.",
  "In the coming months, we will strengthen our incident response, deepen observability across core platforms, and accelerate automation for routine operational tasks. These investments will reduce downtime, sharpen our SLAs and free our engineers to focus on high-value improvements across Issuing, Core Banking, Contact Center and Wealth platforms.",
  "I want to thank every member of the team for their commitment and vigilance. Your dedication keeps CIBC Bank running — and earns the trust our customers place in us every single day.",
];

export const HeroBanner: React.FC<IHeroBannerProps> = () => {
  const [actions, setActions] = React.useState<IHeroAction[]>([]);

  const getMockActions = (): Promise<IHeroAction[]> => {
    return Promise.resolve([
      { id: "1", label: "Issuing & Acquiring", url: "#" },
      { id: "2", label: "Contact Center", url: "#" },
      { id: "3", label: "Core Banking", url: "#" },
      { id: "4", label: "Wealth Platforms", url: "#" }
    ]);
  };

  React.useEffect(() => {
    getMockActions().then(setActions).catch(console.error);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <img src={HERO_IMAGE} alt="Application Operations Lead" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{TITLE}</h1>
        {PARAGRAPHS.map((p, i) => (
          <p key={i} className={styles.paragraph}>
            {p}
          </p>
        ))}

        {/* BUTTONS - Yahan par hona chahiye */}
        <div className={styles.actions}>
          {actions.map((a) => (
            <a key={a.id} href={a.url} className={styles.actionButton}>
              <span>{a.label}</span>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};