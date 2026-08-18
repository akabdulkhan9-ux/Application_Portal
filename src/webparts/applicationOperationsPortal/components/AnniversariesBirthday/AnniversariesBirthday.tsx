import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './AnniversariesBirthday.module.scss';
import { employeeService, IEmployeeAnniversaryItem, IEmployeeBirthdayItem } from '../../services/EmployeeService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';
import { useResponsiveCardCount } from '../../hooks/useResponsiveCardCount';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const badgeGold: string = require('../../assets/badge-gold.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const badgeSilver: string = require('../../assets/badge-silver.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const badgeBronze: string = require('../../assets/badge-bronze.png');

export interface IAnniversariesBirthdayProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?: WebPartContext;
}

const ANNIVERSARY_ITEMS_PER_PAGE = 3;
const AUTO_ROTATE_MS = 15000;
const FUTURE_MONTHS_RANGE = 5;

interface IMonthOption {
  label: string;
  value: string;
  date: Date;
}

type RankVariant = 'gold' | 'silver' | 'bronze' | 'default';

const getMonthLabel = (date: Date): string =>
  date.toLocaleString('default', { month: 'long', year: 'numeric' });

const getMonthValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStr = month < 10 ? '0' + month : '' + month;
  return year + '-' + monthStr;
};

const buildMonthOptions = (): IMonthOption[] => {
  const options: IMonthOption[] = [];
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth(), 1);

  for (let i = 0; i <= FUTURE_MONTHS_RANGE; i++) {
    const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
    options.push({ label: getMonthLabel(d), value: getMonthValue(d), date: d });
  }
  return options;
};

const getDots = (count: number): number[] => {
  const dots: number[] = [];
  for (let i = 0; i < count; i++) {
    dots.push(i);
  }
  return dots;
};

const getRankVariant = (index: number): RankVariant => {
  switch (index) {
    case 0: return 'gold';
    case 1: return 'silver';
    case 2: return 'bronze';
    default: return 'default';
  }
};

const rankColors: Record<RankVariant, { fill: string; stroke: string; text: string }> = {
  gold: { fill: '#F5C542', stroke: '#D4A017', text: '#8A6A00' },
  silver: { fill: '#C5CDD8', stroke: '#9AA3B2', text: '#4B5563' },
  bronze: { fill: '#E09A5B', stroke: '#C67B3C', text: '#7A4014' },
  default: { fill: '#b3a5ac', stroke: '#9aa3b2', text: '#6b7280' },
};

const yearsColorMap: Record<RankVariant, string> = {
  gold: '#D4A017',
  silver: '#A0A6B0',
  bronze: '#C4783A',
  default: '#b3a5ac',
};

const badgeImageMap: Record<RankVariant, string> = {
  gold: badgeGold,
  silver: badgeSilver,
  bronze: badgeBronze,
  default: badgeBronze
};

const BriefcaseIcon: React.FC = () => (
  <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const BuildingIcon: React.FC = () => (
  <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <line x1="8" y1="7" x2="8" y2="7.01" />
    <line x1="12" y1="7" x2="12" y2="7.01" />
    <line x1="16" y1="7" x2="16" y2="7.01" />
    <line x1="8" y1="11" x2="8" y2="11.01" />
    <line x1="12" y1="11" x2="12" y2="11.01" />
    <line x1="16" y1="11" x2="16" y2="11.01" />
    <line x1="8" y1="15" x2="8" y2="15.01" />
    <line x1="12" y1="15" x2="12" y2="15.01" />
    <line x1="16" y1="15" x2="16" y2="15.01" />
    <path d="M10 21v-4h4v4" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CakeIconSmall: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-8H4v8" />
    <path d="M4 13V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M12 3v4" />
    <path d="M9 3.5c0 1.5 3 1.5 3 3.5" />
    <path d="M15 3.5c0 1.5-3 1.5-3 3.5" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const EmptyStateIcon: React.FC = () => (
  <svg className={styles.emptyStateIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
  </svg>
);

const MedalRibbonIcon: React.FC<{ rank: number; variant: RankVariant }> = ({ rank, variant }) => {
  const c = rankColors[variant];

  return (
    <svg className={styles.medalIcon} viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 34 L14 52 L24 46 L34 52 L30 34" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="24" cy="20" r="16" fill={c.fill} stroke={c.stroke} strokeWidth="2" />
      <circle cx="24" cy="20" r="12" fill="#FFFDF7" stroke={c.stroke} strokeWidth="1.25" />
      <text x="24" y="25" textAnchor="middle" fontSize="15" fontWeight="800" fill={c.text} fontFamily="Segoe UI, sans-serif">
        {rank}
      </text>
    </svg>
  );
};

const LaurelYearsBadge: React.FC<{ years: number | string; variant: RankVariant }> = ({ years, variant }) => {
  const yearsColor = yearsColorMap[variant] || yearsColorMap.default;
  const badgeSrc = badgeImageMap[variant] || badgeImageMap.default;

  return (
    <div className={styles.laurelWrap} style={{ color: yearsColor }}>
      <img className={styles.laurelImage} src={badgeSrc} alt="" aria-hidden="true" />
      <div className={styles.yearsCenter}>
        <span className={styles.yearsNumber}>{years}</span>
        <span className={styles.yearsLabel}>Years</span>
      </div>
    </div>
  );
};

export const AnniversariesBirthday: React.FC<IAnniversariesBirthdayProps> = (props) => {
  const monthOptions = React.useMemo(() => buildMonthOptions(), []);
  const currentMonthValue = React.useMemo(() => getMonthValue(new Date()), []);

  const [selectedMonthValue, setSelectedMonthValue] = React.useState<string>(currentMonthValue);

  const [anniversaries, setAnniversaries] = React.useState<IEmployeeAnniversaryItem[]>([]);
  const [isAnniversaryLoading, setIsAnniversaryLoading] = React.useState(true);
  const [anniversaryError, setAnniversaryError] = React.useState('');
  const [anniversaryPage, setAnniversaryPage] = React.useState(0);

  const [birthdays, setBirthdays] = React.useState<IEmployeeBirthdayItem[]>([]);
  const [isBirthdayLoading, setIsBirthdayLoading] = React.useState(true);
  const [birthdayError, setBirthdayError] = React.useState('');
  const [birthdayPage, setBirthdayPage] = React.useState(0);
  const [birthdayGridEl, setBirthdayGridEl] = React.useState<HTMLDivElement | undefined>(undefined);
  const birthdayItemsPerPage = useResponsiveCardCount(birthdayGridEl, 3);

  const selectedMonth = React.useMemo(() => {
    const found = monthOptions.filter((m) => m.value === selectedMonthValue)[0];
    return found ? found.date : new Date();
  }, [monthOptions, selectedMonthValue]);

  React.useEffect(() => {
    let cancelled = false;
    const load = async (): Promise<void> => {
      setIsAnniversaryLoading(true);
      setAnniversaryError('');
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 15) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          retries++;
        }
        const data = await employeeService.getAnniversariesForMonth(selectedMonth);
        if (!cancelled) {
          setAnniversaries(data);
          setAnniversaryPage(0);
        }
      } catch (error) {
        console.error('Error loading anniversaries:', error);
        if (!cancelled) {
          setAnniversaryError('Unable to load anniversary data. Please try again later.');
          setAnniversaries([]);
        }
      } finally {
        if (!cancelled) setIsAnniversaryLoading(false);
      }
    };
    load().catch((): void => undefined);
    return () => { cancelled = true; };
  }, [selectedMonth, props.context]);

  React.useEffect(() => {
    let cancelled = false;
    const load = async (): Promise<void> => {
      setIsBirthdayLoading(true);
      setBirthdayError('');
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 15) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          retries++;
        }
        const data = await employeeService.getBirthdaysForMonth(selectedMonth);
        if (!cancelled) {
          setBirthdays(data);
          setBirthdayPage(0);
        }
      } catch (error) {
        console.error('Error loading birthdays:', error);
        if (!cancelled) {
          setBirthdayError('Unable to load birthday data. Please try again later.');
          setBirthdays([]);
        }
      } finally {
        if (!cancelled) setIsBirthdayLoading(false);
      }
    };
    load().catch((): void => undefined);
    return () => { cancelled = true; };
  }, [selectedMonth, props.context]);

  const anniversaryTotalPages = Math.ceil(anniversaries.length / ANNIVERSARY_ITEMS_PER_PAGE);
  const birthdayTotalPages = Math.ceil(birthdays.length / birthdayItemsPerPage);

  React.useEffect(() => {
    setBirthdayPage(0);
  }, [birthdayItemsPerPage]);

  React.useEffect(() => {
    if (birthdayTotalPages > 0 && birthdayPage > birthdayTotalPages - 1) {
      setBirthdayPage(birthdayTotalPages - 1);
    }
  }, [birthdayPage, birthdayTotalPages]);

  React.useEffect(() => {
    if (anniversaryTotalPages <= 1) return;
    const interval = setInterval(() => {
      setAnniversaryPage((prev) => (prev + 1) % anniversaryTotalPages);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [anniversaryTotalPages]);

  React.useEffect(() => {
    if (birthdayTotalPages <= 1) return;
    const interval = setInterval(() => {
      setBirthdayPage((prev) => (prev + 1) % birthdayTotalPages);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [birthdayTotalPages]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMonthValue(e.target.value);
  };

  const handleAnniversaryPrev = (): void => {
    setAnniversaryPage((p) => Math.max(p - 1, 0));
  };
  const handleAnniversaryNext = (): void => {
    setAnniversaryPage((p) => Math.min(p + 1, anniversaryTotalPages - 1));
  };
  const handleBirthdayPrev = (): void => {
    setBirthdayPage((p) => Math.max(p - 1, 0));
  };
  const handleBirthdayNext = (): void => {
    setBirthdayPage((p) => Math.min(p + 1, birthdayTotalPages - 1));
  };

  const currentAnniversaryItems = anniversaries.slice(
    anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE,
    anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + ANNIVERSARY_ITEMS_PER_PAGE
  );
  const currentBirthdayItems = birthdays.slice(
    birthdayPage * birthdayItemsPerPage,
    birthdayPage * birthdayItemsPerPage + birthdayItemsPerPage
  );

  const birthdayGridClass = `${styles.birthdayGrid} ${
    birthdayItemsPerPage === 1 ? styles.cols1 : birthdayItemsPerPage === 2 ? styles.cols2 : styles.cols3
  }`;

  const isLoading = isAnniversaryLoading || isBirthdayLoading;
  const selectedMonthLabel = getMonthLabel(selectedMonth);
  const isCurrentMonth = selectedMonthValue === currentMonthValue;
  const anniversaryTitleMonth = isCurrentMonth ? 'Current Month' : selectedMonthLabel;
  const birthdayTitleMonth = isCurrentMonth ? 'Current Month' : selectedMonthLabel;

  if (isLoading) {
    return (
      <section className={styles.anniversariesBirthdaySection}>
        <div className={styles.loadingState}>
          <span className={styles.loadingSpinner} aria-hidden="true" />
          Loading...
        </div>
      </section>
    );
  }

  const renderMonthSelector = (): JSX.Element => (
    <div className={styles.monthSelectorWrap}>
      <CalendarIcon className={styles.monthSelectorIcon} />
      <select className={styles.monthSelect} value={selectedMonthValue} onChange={handleMonthChange} aria-label="Select month">
        {monthOptions.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <svg className={styles.monthSelectorChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );

  return (
    <section className={styles.anniversariesBirthdaySection}>
      <div className={styles.grid}>

        <div className={`${styles.panelCard} ${styles.anniversaryPanel}`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleWrap}>
              <h2 className={styles.title}>Employee Anniversaries – {anniversaryTitleMonth}</h2>
              <p className={styles.subtitle}>
                Celebrating work anniversaries this month. Thank you for your dedication and contributions!
              </p>
            </div>
            {renderMonthSelector()}
          </div>

          <div className={styles.summaryBanner}>
            <div className={styles.summaryIcon}>
              <CalendarIcon />
            </div>
            <div className={styles.summaryText}>
              <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
              <span className={styles.summaryLabel}>Work Anniversaries</span>
              <span className={styles.summaryCount}>{anniversaries.length}<span> employees</span></span>
            </div>
          </div>

          {anniversaryError && <div className={styles.errorBanner}>{anniversaryError}</div>}
          {!anniversaryError && anniversaries.length === 0 && (
            <div className={styles.emptyState}>
              <EmptyStateIcon />
              <span>No work anniversaries in {selectedMonthLabel}.</span>
            </div>
          )}

          {anniversaries.length > 0 && (
            <div className={styles.panelBody}>
              <div className={styles.contentRow}>
                <div className={styles.carouselWrap}>
                  <button
                    className={`${styles.navButton} ${styles.navPrev}`}
                    onClick={handleAnniversaryPrev}
                    disabled={anniversaryPage === 0}
                    aria-label="Previous"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <div className={styles.anniversaryList}>
                    {currentAnniversaryItems.map((item, idx) => {
                      const variant = getRankVariant(idx);
                      return (
                        <div key={item.employeeId} className={styles.anniversaryRow}>
                          <div className={styles.rowMedal}>
                            <MedalRibbonIcon rank={idx + 1} variant={variant} />
                          </div>
                          <div className={styles.rowEmployee}>
                            <h3 className={styles.employeeName}>{item.fullName}</h3>
                            <span className={styles.infoRow}><BriefcaseIcon />{item.jobTitle}</span>
                            <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
                          </div>
                          <div className={styles.rowYears}>
                            <LaurelYearsBadge years={item.years} variant={variant} />
                          </div>
                          <div className={styles.rowJoined}>
                            <span className={styles.joinedOn}>
                              <CalendarIcon />
                              Joined on {item.joinedOn}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className={`${styles.navButton} ${styles.navNext}`}
                    onClick={handleAnniversaryNext}
                    disabled={anniversaryPage >= anniversaryTotalPages - 1}
                    aria-label="Next"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.bottomStack}>
                <div className={styles.dots}>
                  {getDots(anniversaryTotalPages).map((index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${index === anniversaryPage ? styles.active : ''}`}
                      onClick={(): void => setAnniversaryPage(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
                <div className={styles.footer}>
                  <span className={styles.footerIcon}><InfoIcon /></span>
                  <span>Showing employees with work anniversaries during {selectedMonthLabel}.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`${styles.panelCard} ${styles.birthdayPanel}`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleWrap}>
              <h2 className={styles.title}>Employee Birthdays – {birthdayTitleMonth}</h2>
              <p className={styles.subtitle}>
                Celebrating birthdays this month. Wishing a very happy birthday to our amazing team!
              </p>
            </div>
            {renderMonthSelector()}
          </div>

          <div className={styles.summaryBanner}>
            <div className={styles.summaryIcon}>
              <CakeIconSmall />
            </div>
            <div className={styles.summaryText}>
              <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
              <span className={styles.summaryLabel}>Birthdays This Month</span>
              <span className={styles.summaryCount}>{birthdays.length}<span> employees</span></span>
            </div>
          </div>

          {birthdayError && <div className={styles.errorBanner}>{birthdayError}</div>}
          {!birthdayError && birthdays.length === 0 && (
            <div className={styles.emptyState}>
              <EmptyStateIcon />
              <span>No birthdays in {selectedMonthLabel}.</span>
            </div>
          )}

          {birthdays.length > 0 && (
            <div className={styles.panelBody}>
              <div className={styles.birthdayCarousel}>
                <div className={styles.contentRow}>
                  <div className={styles.carouselWrap}>
                    <button
                      className={`${styles.navButton} ${styles.navPrev}`}
                      onClick={handleBirthdayPrev}
                      disabled={birthdayPage === 0}
                      aria-label="Previous"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    <div className={birthdayGridClass} ref={(node): void => setBirthdayGridEl(node || undefined)}>
                      {currentBirthdayItems.map((item) => (
                        <div key={item.employeeId} className={styles.birthdayCard}>
                          <div className={styles.cakeHeader}>
                            <CakeIconSmall className={styles.cardCakeIcon} />
                          </div>
                          <div className={styles.dateCenter}>
                            <span className={styles.dateDay}>{item.date}</span>
                            <span className={styles.dateWeekday}>{item.day}</span>
                          </div>
                          <div className={styles.cardDivider} />
                          <div className={styles.cardBody}>
                            <h3 className={styles.employeeName}>{item.fullName}</h3>
                            <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
                          </div>
                          <div className={styles.cardFooter}>
                            <span className={styles.happyBirthdayTag}>
                              <span aria-hidden="true">🎉</span>
                              Happy Birthday!
                              <span aria-hidden="true">✨</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`${styles.navButton} ${styles.navNext}`}
                      onClick={handleBirthdayNext}
                      disabled={birthdayPage >= birthdayTotalPages - 1}
                      aria-label="Next"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={styles.dots}>
                  {getDots(birthdayTotalPages).map((index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${index === birthdayPage ? styles.active : ''}`}
                      onClick={(): void => setBirthdayPage(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.footer}>
                <span className={styles.footerIcon}><InfoIcon /></span>
                <span>Showing employees with birthdays during {selectedMonthLabel}.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnniversariesBirthday;
