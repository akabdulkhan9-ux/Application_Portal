

// // // import * as React from 'react';
// // // import styles from './HeroBanner.module.scss';
// // // import { heroBannerService, IHeroBannerData } from '../../services/heroBannerService';
// // // import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// // // export interface IHeroBannerProps {
// // //   isDarkTheme?: boolean;
// // //   hasTeamsContext?: boolean;
// // //   userDisplayName?: string;
// // //   context?: any;
// // // }

// // // // Button actions interface
// // // interface IHeroAction {
// // //   id: string;
// // //   label: string;
// // //   url: string;
// // // }

// // // // Default CEO Message (used if SharePoint has no data)
// // // const DEFAULT_TITLE = "CEO Message";
// // // const DEFAULT_PARAGRAPH = `Dear Colleagues,

// // // It is my privilege to lead Alubaf Bank as we continue our journey of delivering trusted, innovative, and customer-focused banking services. Our success is built on the dedication, professionalism, and commitment of every employee across the organization.

// // // As we look ahead, our focus remains on strengthening operational excellence, enhancing digital capabilities, and ensuring the highest standards of service, security, and compliance. We will continue investing in technology, streamlining processes, and fostering collaboration across teams to better serve our customers and support the Bank's long-term growth.

// // // In the coming months, we will accelerate initiatives that improve efficiency, strengthen risk management, and enhance the overall customer experience. These efforts will position Alubaf Bank to meet evolving market demands while maintaining the trust and confidence of our clients, partners, and stakeholders.

// // // I would like to express my sincere appreciation to each member of the Alubaf Bank family. Your dedication, resilience, and unwavering commitment are the foundation of our achievements. Together, we will continue to build a stronger, more agile, and more successful organization.

// // // Thank you for your continued support and contributions.

// // // Warm regards,

// // // Mr. Abdulmonam Tbigha
// // // Chief Executive Officer
// // // Alubaf Bank`;

// // // const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80";

// // // // ✅ Mock actions for the 4 buttons
// // // const getMockActions = (): Promise<IHeroAction[]> => {
// // //   return Promise.resolve([
// // //     { id: "1", label: "Issuing & Acquiring", url: "/sites/CIBC-IssuingAcquiring" },
// // //     { id: "2", label: "Contact Center", url: "/sites/CIBC-ContactCenter" },
// // //     { id: "3", label: "Core Banking", url: "/sites/CIBC-CoreBanking" },
// // //     { id: "4", label: "Wealth Platforms", url: "/sites/CIBC-WealthCorporate" }
// // //   ]);
// // // };

// // // export const HeroBanner: React.FC<IHeroBannerProps> = (props) => {
// // //   const [bannerData, setBannerData] = React.useState<IHeroBannerData | null>(null);
// // //   const [isLoading, setIsLoading] = React.useState<boolean>(true);
// // //   const [actions, setActions] = React.useState<IHeroAction[]>([]);

// // //   // Load hero banner data
// // //   React.useEffect(() => {
// // //     const loadHeroBanner = async () => {
// // //       try {
// // //         let retries = 0;
// // //         while (!isPnPjsInitialized() && retries < 10) {
// // //           await new Promise(resolve => setTimeout(resolve, 500));
// // //           retries++;
// // //         }
        
// // //         const data = await heroBannerService.getActiveHeroBanner(props.context);
// // //         setBannerData(data);
        
// // //         // ✅ Load the 4 buttons
// // //         const actionData = await getMockActions();
// // //         setActions(actionData);
// // //       } catch (error) {
// // //         console.error("Error loading hero banner:", error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     loadHeroBanner();
// // //   }, [props.context]);

// // //   // Handle button click navigation
// // //   // const handleActionClick = (url: string, e: React.MouseEvent) => {
// // //   //   e.preventDefault();
// // //   //   window.location.href = url;
// // //   // };

// // //   if (isLoading) {
// // //     return (
// // //       <section className={styles.hero}>
// // //         <div className={styles.content}>
// // //           <div className={styles.loadingState}>Loading...</div>
// // //         </div>
// // //       </section>
// // //     );
// // //   }

// // //   // Use SharePoint data if available, otherwise use default CEO message
// // //   const title = bannerData?.title || DEFAULT_TITLE;
// // //   const paragraph = bannerData?.paragraph || DEFAULT_PARAGRAPH;
// // //   const imageUrl = bannerData?.imageUrl || DEFAULT_IMAGE;

// // //   // Split paragraph by double newlines to create separate paragraphs
// // //   const paragraphs = paragraph.split('\n\n').filter(p => p.trim().length > 0);

// // //   return (
// // //     <section className={styles.hero}>
// // //       <div className={styles.imageWrap}>
// // //         <img 
// // //           src={imageUrl} 
// // //           alt={title} 
// // //           onError={(e) => {
// // //             (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
// // //           }}
// // //         />
// // //       </div>
// // //       <div className={styles.content}>
// // //         <h1 className={styles.title}>{title}</h1>
// // //         {paragraphs.map((para, index) => (
// // //           <p key={index} className={styles.paragraph}>
// // //             {para}
// // //           </p>
// // //         ))}

// // //         {/* ✅ 4 BUTTONS - ADDED BACK */}
// // //         <div className={styles.actions}>
// // //           {actions.map((action) => (
// // //             <a 
// // //               key={action.id} 
// // //               href={action.url} 
// // //               className={styles.actionButton}
// // //               // onClick={(e) => handleActionClick(action.url, e)}
// // //             >
// // //               <span>{action.label}</span>
// // //               <span className={styles.arrow}>→</span>
// // //             </a>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };


// // import * as React from 'react';
// // import styles from './HeroBanner.module.scss';
// // import { heroBannerService, IHeroBannerData } from '../../services/heroBannerService';
// // import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// // export interface IHeroBannerProps {
// //   isDarkTheme?: boolean;
// //   hasTeamsContext?: boolean;
// //   userDisplayName?: string;
// //   context?: any;
// // }

// // // Button actions interface
// // interface IHeroAction {
// //   id: string;
// //   label: string;
// //   url: string;
// // }

// // // Default CEO Message (used if SharePoint has no data)
// // const DEFAULT_TITLE = "CEO Message";
// // const DEFAULT_PARAGRAPH = `Dear Colleagues,

// // It is my privilege to lead Alubaf Bank as we continue our journey of delivering trusted, innovative, and customer-focused banking services. Our success is built on the dedication, professionalism, and commitment of every employee across the organization.

// // As we look ahead, our focus remains on strengthening operational excellence, enhancing digital capabilities, and ensuring the highest standards of service, security, and compliance. We will continue investing in technology, streamlining processes, and fostering collaboration across teams to better serve our customers and support the Bank's long-term growth.

// // In the coming months, we will accelerate initiatives that improve efficiency, strengthen risk management, and enhance the overall customer experience. These efforts will position Alubaf Bank to meet evolving market demands while maintaining the trust and confidence of our clients, partners, and stakeholders.

// // I would like to express my sincere appreciation to each member of the Alubaf Bank family. Your dedication, resilience, and unwavering commitment are the foundation of our achievements. Together, we will continue to build a stronger, more agile, and more successful organization.

// // Thank you for your continued support and contributions.

// // Warm regards,

// // Mr. Abdulmonam Tbigha
// // Chief Executive Officer
// // Alubaf Bank`;

// // const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80";

// // // Mock actions for the 4 buttons (URLs are placeholders - no navigation)
// // const getMockActions = (): Promise<IHeroAction[]> => {
// //   return Promise.resolve([
// //     { id: "1", label: "Core Banking", url: "#" },
// //     { id: "2", label: "Corporate Center", url: "#" },
// //     { id: "3", label: "Contact Center", url: "#" },
// //     { id: "4", label: "Issuing & Acquiring", url: "#" }
// //   ]);
// // };

// // export const HeroBanner: React.FC<IHeroBannerProps> = (props) => {
// //   const [bannerData, setBannerData] = React.useState<IHeroBannerData | null>(null);
// //   const [isLoading, setIsLoading] = React.useState<boolean>(true);
// //   const [actions, setActions] = React.useState<IHeroAction[]>([]);

// //   // Load hero banner data
// //   React.useEffect(() => {
// //     const loadHeroBanner = async () => {
// //       try {
// //         let retries = 0;
// //         while (!isPnPjsInitialized() && retries < 10) {
// //           await new Promise(resolve => setTimeout(resolve, 500));
// //           retries++;
// //         }
        
// //         const data = await heroBannerService.getActiveHeroBanner(props.context);
// //         setBannerData(data);
        
// //         // Load the 4 buttons
// //         const actionData = await getMockActions();
// //         setActions(actionData);
// //       } catch (error) {
// //         console.error("Error loading hero banner:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     loadHeroBanner();
// //   }, [props.context]);

// //   // Handle button click - NO NAVIGATION (only prevent default)
// //   const handleActionClick = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     // No navigation - buttons do nothing
// //     console.log("Button clicked - Navigation disabled");
// //   };

// //   if (isLoading) {
// //     return (
// //       <section className={styles.hero}>
// //         <div className={styles.content}>
// //           <div className={styles.loadingState}>Loading...</div>
// //         </div>
// //       </section>
// //     );
// //   }

// //   // Use SharePoint data if available, otherwise use default CEO message
// //   const title = bannerData?.title || DEFAULT_TITLE;
// //   const paragraph = bannerData?.paragraph || DEFAULT_PARAGRAPH;
// //   const imageUrl = bannerData?.imageUrl || DEFAULT_IMAGE;

// //   // Split paragraph by double newlines to create separate paragraphs
// //   const paragraphs = paragraph.split('\n\n').filter(p => p.trim().length > 0);

// //   return (
// //     <section className={styles.hero}>
// //       <div className={styles.imageWrap}>
// //         <img 
// //           src={imageUrl} 
// //           alt={title} 
// //           onError={(e) => {
// //             (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
// //           }}
// //         />
// //       </div>
// //       <div className={styles.content}>
// //         <h1 className={styles.title}>{title}</h1>
// //         {paragraphs.map((para, index) => (
// //           <p key={index} className={styles.paragraph}>
// //             {para}
// //           </p>
// //         ))}

// //         {/* 4 BUTTONS - Visible but NO NAVIGATION */}
// //         <div className={styles.actions}>
// //           {actions.map((action) => (
// //             <a 
// //               key={action.id} 
// //               href={action.url} 
// //               className={styles.actionButton}
// //               onClick={handleActionClick}
// //             >
// //               <span>{action.label}</span>
// //               <span className={styles.arrow}>→</span>
// //             </a>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };



// import * as React from 'react';
// import styles from './HeroBanner.module.scss';
// import { heroBannerService, IHeroBannerData } from '../../services/heroBannerService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// export interface IHeroBannerProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
//   context?: any;
// }

// // Button actions interface
// interface IHeroAction {
//   id: string;
//   label: string;
//   url: string;
// }

// // Default CEO Message (used if SharePoint has no data)
// const DEFAULT_TITLE = "CEO Message";
// const DEFAULT_PARAGRAPH = `Dear Colleagues,

// It is my privilege to lead Alubaf Bank as we continue our journey of delivering trusted, innovative, and customer-focused banking services. Our success is built on the dedication, professionalism, and commitment of every employee across the organization.

// As we look ahead, our focus remains on strengthening operational excellence, enhancing digital capabilities, and ensuring the highest standards of service, security, and compliance. We will continue investing in technology, streamlining processes, and fostering collaboration across teams to better serve our customers and support the Bank's long-term growth.

// In the coming months, we will accelerate initiatives that improve efficiency, strengthen risk management, and enhance the overall customer experience. These efforts will position Alubaf Bank to meet evolving market demands while maintaining the trust and confidence of our clients, partners, and stakeholders.

// I would like to express my sincere appreciation to each member of the Alubaf Bank family. Your dedication, resilience, and unwavering commitment are the foundation of our achievements. Together, we will continue to build a stronger, more agile, and more successful organization.

// Thank you for your continued support and contributions.

// Warm regards,

// Mr. Abdulmonam Tbigha
// Chief Executive Officer
// Alubaf Bank`;

// const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80";

// // ✅ Get base URL dynamically
// const getBaseUrl = (): string => {
//   return window.location.origin + window.location.pathname.split('/SitePages/')[0];
// };

// // ✅ Get dynamic actions with real page URLs
// const getMockActions = (): Promise<IHeroAction[]> => {
//   const baseUrl = getBaseUrl();
//   return Promise.resolve([
//     { id: "1", label: "Core Banking", url: `${baseUrl}/SitePages/CoreBanking.aspx` },
//     { id: "2", label: "Corporate Center", url: `${baseUrl}/SitePages/CorporateCenter.aspx` },
//     { id: "3", label: "Contact Center", url: `${baseUrl}/SitePages/ContactCenter.aspx` },
//     { id: "4", label: "Issuing & Acquiring", url: `${baseUrl}/SitePages/IssuingAcquiring.aspx` }
//   ]);
// };

// export const HeroBanner: React.FC<IHeroBannerProps> = (props) => {
//   const [bannerData, setBannerData] = React.useState<IHeroBannerData | null>(null);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);
//   const [actions, setActions] = React.useState<IHeroAction[]>([]);

//   // Load hero banner data
//   React.useEffect(() => {
//     const loadHeroBanner = async () => {
//       try {
//         let retries = 0;
//         while (!isPnPjsInitialized() && retries < 10) {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           retries++;
//         }
        
//         const data = await heroBannerService.getActiveHeroBanner(props.context);
//         setBannerData(data);
        
//         // Load the 4 buttons with dynamic URLs
//         const actionData = await getMockActions();
//         setActions(actionData);
//       } catch (error) {
//         console.error("Error loading hero banner:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadHeroBanner();
//   }, [props.context]);

//   // ✅ Handle button click - Navigate to page
//   const handleActionClick = (url: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     window.location.href = url;
//   };

//   if (isLoading) {
//     return (
//       <section className={styles.hero}>
//         <div className={styles.content}>
//           <div className={styles.loadingState}>Loading...</div>
//         </div>
//       </section>
//     );
//   }

//   // Use SharePoint data if available, otherwise use default CEO message
//   const title = bannerData?.title || DEFAULT_TITLE;
//   const paragraph = bannerData?.paragraph || DEFAULT_PARAGRAPH;
//   const imageUrl = bannerData?.imageUrl || DEFAULT_IMAGE;

//   // Split paragraph by double newlines to create separate paragraphs
//   const paragraphs = paragraph.split('\n\n').filter(p => p.trim().length > 0);

//   return (
//     <section className={styles.hero}>
//       <div className={styles.imageWrap}>
//         <img 
//           src={imageUrl} 
//           alt={title} 
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
//           }}
//         />
//       </div>
//       <div className={styles.content}>
//         <h1 className={styles.title}>{title}</h1>
//         {paragraphs.map((para, index) => (
//           <p key={index} className={styles.paragraph}>
//             {para}
//           </p>
//         ))}

//         {/* ✅ 4 BUTTONS - Now navigates to pages */}
//         <div className={styles.actions}>
//           {actions.map((action) => (
//             <a 
//               key={action.id} 
//               href={action.url} 
//               className={styles.actionButton}
//               onClick={(e) => handleActionClick(action.url, e)}
//             >
//               <span>{action.label}</span>
//               <span className={styles.arrow}>→</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './HeroBanner.module.scss';
import { heroBannerService, IHeroBannerData } from '../../services/heroBannerService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IHeroBannerProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?: WebPartContext;
}

interface IHeroAction {
  id: string;
  label: string;
  url: string;
}

const DEFAULT_TITLE = "CEO Message";
const DEFAULT_PARAGRAPH = `Dear Colleagues,

It is my privilege to lead Alubaf Bank as we continue our journey of delivering trusted, innovative, and customer-focused banking services. Our success is built on the dedication, professionalism, and commitment of every employee across the organization.

As we look ahead, our focus remains on strengthening operational excellence, enhancing digital capabilities, and ensuring the highest standards of service, security, and compliance. We will continue investing in technology, streamlining processes, and fostering collaboration across teams to better serve our customers and support the Bank's long-term growth.

In the coming months, we will accelerate initiatives that improve efficiency, strengthen risk management, and enhance the overall customer experience. These efforts will position Alubaf Bank to meet evolving market demands while maintaining the trust and confidence of our clients, partners, and stakeholders.

I would like to express my sincere appreciation to each member of the Alubaf Bank family. Your dedication, resilience, and unwavering commitment are the foundation of our achievements. Together, we will continue to build a stronger, more agile, and more successful organization.

Thank you for your continued support and contributions.

Warm regards,

Mr. Abdulmonam Tbigha
Chief Executive Officer
Alubaf Bank`;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80";

const getMockActions = (context?: WebPartContext): Promise<IHeroAction[]> => {
  const webUrl = context?.pageContext.web.absoluteUrl.replace(/\/$/, '') || '';
  return Promise.resolve([
    { id: "1", label: "Core Banking", url: `${webUrl}/SitePages/CoreBanking.aspx` },
    { id: "2", label: "Corporate Center", url: `${webUrl}/SitePages/CorporateCenter.aspx` },
    { id: "3", label: "Contact Center", url: `${webUrl}/SitePages/ContactCenter.aspx` },
    // { id: "4", label: "Issuing & Acquiring", url: `${webUrl}/SitePages/IssuingAcquiring.aspx` }
  ]);
};

/**
 * ROOT CAUSE FIX: the previous version passed 'noopener' inside window.open()'s
 * features string. Per spec, when 'noopener' is used, the browser MUST return
 * null for the new-window reference — even when the popup opened successfully.
 * That made `if (!newWindow) { fallback }` fire on every single click, running
 * a second, redundant navigation attempt via a synthetic anchor click. In an
 * iframe-sandboxed host (Workbench iframes, Teams, some app-catalog previews),
 * that second same-tick synthetic click can resolve against window.top instead
 * of opening its own tab — which is what was changing your ORIGINAL tab's URL.
 *
 * Fix: open a blank window FIRST (synchronously, inside the real user gesture,
 * so it's never mistaken for a blocked popup), THEN set its .location — this
 * gives us a real, non-null window reference to test, so we only ever run the
 * DOM-anchor fallback when a popup was genuinely blocked, never redundantly.
 * We sever `.opener` manually afterward for the same security benefit
 * `noopener` would have given us, without the null-return side effect.
 */
const openInNewTab = (url: string): void => {
  const newTab = window.open('', '_blank');

  if (newTab) {
    // Manually sever the opener reference (same security benefit as
    // 'noopener', without passing it through window.open's features string).
    try {
      (newTab as Window & { opener: unknown }).opener = null;
    } catch {
      // Some browsers make `.opener` non-configurable; safe to ignore.
    }
    newTab.location.href = url;
    return;
  }

  // Genuinely blocked (newTab is null/undefined) — fall back to a
  // programmatically-clicked anchor, which some popup-blocker
  // configurations allow through even when a raw window.open() call doesn't.
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const HeroBanner: React.FC<IHeroBannerProps> = (props) => {
  const [bannerData, setBannerData] = React.useState<IHeroBannerData | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [actions, setActions] = React.useState<IHeroAction[]>([]);

  React.useEffect(() => {
    const loadHeroBanner = async (): Promise<void> => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }

        const data = await heroBannerService.getActiveHeroBanner(props.context);
        setBannerData(data);

        const actionData = await getMockActions(props.context);
        setActions(actionData);
      } catch (error) {
        console.error("Error loading hero banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroBanner().catch((): void => undefined);
  }, [props.context]);

  const handleActionActivate = (url: string, e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    openInNewTab(url);
  };

  const handleActionKeyDown = (url: string, e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      openInNewTab(url);
    }
  };

  if (isLoading) {
    return (
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.loadingState}>Loading...</div>
        </div>
      </section>
    );
  }

  const title = bannerData?.title || DEFAULT_TITLE;
  const paragraph = bannerData?.paragraph || DEFAULT_PARAGRAPH;
  const imageUrl = bannerData?.imageUrl || DEFAULT_IMAGE;
  const paragraphs = paragraph.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
          }}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {paragraphs.map((para, index) => (
          <p key={index} className={styles.paragraph}>
            {para}
          </p>
        ))}

        <div className={styles.actions}>
          {actions.map((action) => (
            <div
              key={action.id}
              role="link"
              tabIndex={0}
              className={styles.actionButton}
              onClick={(e) => handleActionActivate(action.url, e)}
              onKeyDown={(e) => handleActionKeyDown(action.url, e)}
            >
              <span>{action.label}</span>
              <span className={styles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};