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
    { id: "1", label: "Core Banking", url: `${webUrl}/sites/CBSS` },
    { id: "2", label: "Corporate Center", url: `${webUrl}/sites/WCCT` },
    { id: "3", label: "Contact Center", url: `${webUrl}/sites/CCT` }
  ]);
};

const openInNewTab = (url: string): void => {
  const newTab = window.open('', '_blank');

  if (newTab) {
    try {
      (newTab as Window & { opener: unknown }).opener = null;
    } catch {
    }
    newTab.location.href = url;
    return;
  }

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