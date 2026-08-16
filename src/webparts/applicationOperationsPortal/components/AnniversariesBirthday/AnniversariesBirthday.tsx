

// // import * as React from 'react';
// // import styles from './AnniversariesBirthday.module.scss';
// // import { employeeService, IEmployeeAnniversaryItem, IEmployeeBirthdayItem } from '../../services/EmployeeService';
// // import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// // export interface IAnniversariesBirthdayProps {
// //   isDarkTheme?: boolean;
// //   hasTeamsContext?: boolean;
// //   userDisplayName?: string;
// //   context?: any;
// // }

// // // ✅ 3 items per page
// // const ANNIVERSARY_ITEMS_PER_PAGE = 3;
// // const BIRTHDAY_ITEMS_PER_PAGE = 3;
// // const AUTO_ROTATE_MS = 10000;

// // // ✅ Only current + next 5 months = 6 months total
// // const FUTURE_MONTHS_RANGE = 5;

// // interface IMonthOption {
// //   label: string;
// //   value: string;
// //   date: Date;
// // }

// // type RankVariant = 'gold' | 'silver' | 'bronze' | 'default';

// // const getMonthLabel = (date: Date): string =>
// //   date.toLocaleString('default', { month: 'long', year: 'numeric' });

// // const getMonthShort = (date: Date): string =>
// //   date.toLocaleString('default', { month: 'short' });

// // const getMonthValue = (date: Date): string => {
// //   var year = date.getFullYear();
// //   var month = date.getMonth() + 1;
// //   var monthStr = month < 10 ? '0' + month : '' + month;
// //   return year + '-' + monthStr;
// // };

// // const buildMonthOptions = (): IMonthOption[] => {
// //   const options: IMonthOption[] = [];
// //   const now = new Date();
// //   const base = new Date(now.getFullYear(), now.getMonth(), 1);

// //   for (let i = 0; i <= FUTURE_MONTHS_RANGE; i++) {
// //     const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
// //     options.push({ label: getMonthLabel(d), value: getMonthValue(d), date: d });
// //   }
// //   return options;
// // };

// // const getDots = (count: number): number[] => {
// //   const dots: number[] = [];
// //   for (let i = 0; i < count; i++) {
// //     dots.push(i);
// //   }
// //   return dots;
// // };

// // const getRankVariant = (index: number): RankVariant => {
// //   switch (index) {
// //     case 0: return 'gold';
// //     case 1: return 'silver';
// //     case 2: return 'bronze';
// //     default: return 'default';
// //   }
// // };

// // const rankColors: Record<RankVariant, { primary: string; secondary: string }> = {
// //   gold: { primary: '#e8b64a', secondary: '#f6da9a' },
// //   silver: { primary: '#a8adb3', secondary: '#d6d9dc' },
// //   bronze: { primary: '#c8793f', secondary: '#e3b285' },
// //   default: { primary: '#b3a5ac', secondary: '#d9d0d4' },
// // };

// // // ===== Small inline icons used inside card body rows =====
// // const ClipboardIcon: React.FC = () => (
// //   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="6" y="4" width="12" height="17" rx="2" />
// //     <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
// //     <line x1="9" y1="11" x2="15" y2="11" />
// //     <line x1="9" y1="15" x2="13" y2="15" />
// //   </svg>
// // );

// // const BuildingIcon: React.FC = () => (
// //   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="4" y="3" width="16" height="18" rx="1" />
// //     <line x1="8" y1="7" x2="8" y2="7.01" />
// //     <line x1="12" y1="7" x2="12" y2="7.01" />
// //     <line x1="16" y1="7" x2="16" y2="7.01" />
// //     <line x1="8" y1="11" x2="8" y2="11.01" />
// //     <line x1="12" y1="11" x2="12" y2="11.01" />
// //     <line x1="16" y1="11" x2="16" y2="11.01" />
// //     <line x1="8" y1="15" x2="8" y2="15.01" />
// //     <line x1="12" y1="15" x2="12" y2="15.01" />
// //     <line x1="16" y1="15" x2="16" y2="15.01" />
// //     <path d="M10 21v-4h4v4" />
// //   </svg>
// // );

// // const CalendarIcon: React.FC = () => (
// //   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
// //     <line x1="16" y1="2" x2="16" y2="6"></line>
// //     <line x1="8" y1="2" x2="8" y2="6"></line>
// //     <line x1="3" y1="10" x2="21" y2="10"></line>
// //   </svg>
// // );

// // // ===== Trophy icon for anniversaries summary banner =====
// // const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
// //   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M8 21h8" />
// //     <path d="M12 17v4" />
// //     <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
// //     <path d="M7 5H4a2 2 0 0 0 0 4h3" />
// //     <path d="M17 5h3a2 2 0 0 1 0 4h-3" />
// //   </svg>
// // );

// // // ===== Cake icon for birthdays summary banner (small) =====
// // const CakeIconSmall: React.FC<{ className?: string }> = ({ className }) => (
// //   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M20 21v-8H4v8"></path>
// //     <path d="M4 13V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
// //     <path d="M12 3v4"></path>
// //     <path d="M9 3.5c0 1.5 3 1.5 3 3.5"></path>
// //     <path d="M15 3.5c0 1.5-3 1.5-3 3.5"></path>
// //   </svg>
// // );

// // // ===== Large cake with lit candles — used on every birthday card, like a mini celebration icon =====
// // const CakeCandlesIcon: React.FC = () => (
// //   <svg className={styles.cakeCandlesIcon} viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
// //     {/* flames */}
// //     <path d="M16 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
// //     <path d="M32 6c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
// //     <path d="M48 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
// //     {/* candles */}
// //     <rect x="14" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
// //     <rect x="30" y="14" width="4" height="14" rx="1" fill="#f6da9a" />
// //     <rect x="46" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
// //     {/* top cake layer */}
// //     <rect x="8" y="28" width="48" height="12" rx="3" fill="currentColor" opacity="0.95" />
// //     {/* bottom cake layer */}
// //     <rect x="4" y="40" width="56" height="12" rx="3" fill="currentColor" />
// //     {/* icing dots */}
// //     <circle cx="16" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
// //     <circle cx="32" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
// //     <circle cx="48" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
// //   </svg>
// // );

// // // ===== Ribbon medal icon — used for anniversary rank (matches award-ribbon style) =====
// // const MedalRibbonIcon: React.FC<{ rank: number; variant: RankVariant }> = ({ rank, variant }) => {
// //   const c = rankColors[variant];
// //   const gradId = `medalGrad-${variant}-${rank}`;
// //   return (
// //     <svg className={styles.medalIcon} viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg">
// //       <defs>
// //         <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
// //           <stop offset="0%" stopColor={c.secondary} />
// //           <stop offset="100%" stopColor={c.primary} />
// //         </linearGradient>
// //       </defs>
// //       {/* ribbon tails */}
// //       <path d="M13 24 L6 52 L22 43 L38 52 L31 24Z" fill="#8b1538" />
// //       <path d="M13 24 L6 52 L22 43 L15 24Z" fill="#a11d42" />
// //       {/* medal disc */}
// //       <circle cx="22" cy="19" r="17" fill={`url(#${gradId})`} stroke="#ffffff" strokeWidth="2" />
// //       <circle cx="22" cy="19" r="12.5" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
// //       <text x="22" y="24" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">{rank}</text>
// //     </svg>
// //   );
// // };

// // // ===== Laurel wreath badge — wraps the "years" number on anniversary cards =====
// // const LaurelYearsBadge: React.FC<{ years: number | string }> = ({ years }) => (
// //   <div className={styles.laurelWrap}>
// //     <svg className={styles.laurelSvg} viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
// //       <g stroke="#c8793f" strokeWidth="2" fill="none" strokeLinecap="round">
// //         <path d="M40 6 C24 10 14 22 14 36 C14 46 20 53 28 56" />
// //         <path d="M20 14 C16 18 13 24 12 30" />
// //         <path d="M16 24 C13 27 11 31 10 36" />
// //         <path d="M15 34 C12 37 10 41 10 45" />
// //         <path d="M50 6 C66 10 76 22 76 36 C76 46 70 53 62 56" />
// //         <path d="M70 14 C74 18 77 24 78 30" />
// //         <path d="M74 24 C77 27 79 31 80 36" />
// //         <path d="M75 34 C78 37 80 41 80 45" />
// //       </g>
// //     </svg>
// //     <div className={styles.yearsCenter}>
// //       <span className={styles.yearsNumber}>{years}</span>
// //       <span className={styles.yearsLabel}>Years</span>
// //     </div>
// //   </div>
// // );

// // export const AnniversariesBirthday: React.FC<IAnniversariesBirthdayProps> = (props) => {
// //   const monthOptions = React.useMemo(() => buildMonthOptions(), []);
// //   const currentMonthValue = React.useMemo(() => getMonthValue(new Date()), []);

// //   const [selectedMonthValue, setSelectedMonthValue] = React.useState<string>(currentMonthValue);

// //   // ===== Anniversary state =====
// //   const [anniversaries, setAnniversaries] = React.useState<IEmployeeAnniversaryItem[]>([]);
// //   const [isAnniversaryLoading, setIsAnniversaryLoading] = React.useState(true);
// //   const [anniversaryError, setAnniversaryError] = React.useState('');
// //   const [anniversaryPage, setAnniversaryPage] = React.useState(0);

// //   // ===== Birthday state =====
// //   const [birthdays, setBirthdays] = React.useState<IEmployeeBirthdayItem[]>([]);
// //   const [isBirthdayLoading, setIsBirthdayLoading] = React.useState(true);
// //   const [birthdayError, setBirthdayError] = React.useState('');
// //   const [birthdayPage, setBirthdayPage] = React.useState(0);

// //   const selectedMonth = React.useMemo(() => {
// //     const found = monthOptions.filter((m) => m.value === selectedMonthValue)[0];
// //     return found ? found.date : new Date();
// //   }, [monthOptions, selectedMonthValue]);

// //   // ===== Load anniversaries =====
// //   React.useEffect(() => {
// //     let cancelled = false;
// //     const load = async () => {
// //       setIsAnniversaryLoading(true);
// //       setAnniversaryError('');
// //       try {
// //         let retries = 0;
// //         while (!isPnPjsInitialized() && retries < 15) {
// //           await new Promise((resolve) => setTimeout(resolve, 500));
// //           retries++;
// //         }
// //         const data = await employeeService.getAnniversariesForMonth(selectedMonth);
// //         if (!cancelled) {
// //           setAnniversaries(data);
// //           setAnniversaryPage(0);
// //         }
// //       } catch (error) {
// //         console.error('Error loading anniversaries:', error);
// //         if (!cancelled) {
// //           setAnniversaryError('Unable to load anniversary data. Please try again later.');
// //           setAnniversaries([]);
// //         }
// //       } finally {
// //         if (!cancelled) setIsAnniversaryLoading(false);
// //       }
// //     };
// //     load();
// //     return () => { cancelled = true; };
// //   }, [selectedMonth, props.context]);

// //   // ===== Load birthdays =====
// //   React.useEffect(() => {
// //     let cancelled = false;
// //     const load = async () => {
// //       setIsBirthdayLoading(true);
// //       setBirthdayError('');
// //       try {
// //         let retries = 0;
// //         while (!isPnPjsInitialized() && retries < 15) {
// //           await new Promise((resolve) => setTimeout(resolve, 500));
// //           retries++;
// //         }
// //         const data = await employeeService.getBirthdaysForMonth(selectedMonth);
// //         if (!cancelled) {
// //           setBirthdays(data);
// //           setBirthdayPage(0);
// //         }
// //       } catch (error) {
// //         console.error('Error loading birthdays:', error);
// //         if (!cancelled) {
// //           setBirthdayError('Unable to load birthday data. Please try again later.');
// //           setBirthdays([]);
// //         }
// //       } finally {
// //         if (!cancelled) setIsBirthdayLoading(false);
// //       }
// //     };
// //     load();
// //     return () => { cancelled = true; };
// //   }, [selectedMonth, props.context]);

// //   const anniversaryTotalPages = Math.ceil(anniversaries.length / ANNIVERSARY_ITEMS_PER_PAGE);
// //   const birthdayTotalPages = Math.ceil(birthdays.length / BIRTHDAY_ITEMS_PER_PAGE);

// //   // ===== Auto-rotate =====
// //   React.useEffect(() => {
// //     if (birthdayTotalPages <= 1) return;
// //     const interval = setInterval(() => {
// //       setBirthdayPage((prev) => (prev + 1) % birthdayTotalPages);
// //     }, AUTO_ROTATE_MS);
// //     return () => clearInterval(interval);
// //   }, [birthdayTotalPages]);

// //   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMonthValue(e.target.value);

// //   const handleAnniversaryPrev = () => setAnniversaryPage((p) => Math.max(p - 1, 0));
// //   const handleAnniversaryNext = () => setAnniversaryPage((p) => Math.min(p + 1, anniversaryTotalPages - 1));
// //   const handleBirthdayPrev = () => setBirthdayPage((p) => Math.max(p - 1, 0));
// //   const handleBirthdayNext = () => setBirthdayPage((p) => Math.min(p + 1, birthdayTotalPages - 1));

// //   const currentAnniversaryItems = anniversaries.slice(
// //     anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE,
// //     anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + ANNIVERSARY_ITEMS_PER_PAGE
// //   );
// //   const currentBirthdayItems = birthdays.slice(
// //     birthdayPage * BIRTHDAY_ITEMS_PER_PAGE,
// //     birthdayPage * BIRTHDAY_ITEMS_PER_PAGE + BIRTHDAY_ITEMS_PER_PAGE
// //   );

// //   const isLoading = isAnniversaryLoading || isBirthdayLoading;
// //   const selectedMonthLabel = getMonthLabel(selectedMonth);
// //   const selectedMonthShort = getMonthShort(selectedMonth);

// //   if (isLoading) {
// //     return (
// //       <section className={styles.anniversariesBirthdaySection}>
// //         <div className={styles.loadingState}>Loading...</div>
// //       </section>
// //     );
// //   }

// //   const renderMonthSelector = () => (
// //     <div className={styles.monthSelectorWrap}>
// //       <CalendarIcon />
// //       <select className={styles.monthSelect} value={selectedMonthValue} onChange={handleMonthChange} aria-label="Select month">
// //         {monthOptions.map((m) => (
// //           <option key={m.value} value={m.value}>{m.label}</option>
// //         ))}
// //       </select>
// //       <svg className={styles.monthSelectorChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //         <polyline points="6 9 12 15 18 9"></polyline>
// //       </svg>
// //     </div>
// //   );

// //   return (
// //     <section className={styles.anniversariesBirthdaySection}>
// //       <div className={styles.grid}>

// //         {/* ===== ANNIVERSARIES PANEL ===== */}
// //         <div className={styles.panelCard}>
// //           <div className={styles.panelHeader}>
// //             <div className={styles.panelTitleWrap}>
// //               <h2 className={styles.title}>🎉 Employee Anniversaries – {selectedMonthLabel}</h2>
// //               <p className={styles.subtitle}>Celebrating work anniversaries this month.</p>
// //             </div>
// //             {renderMonthSelector()}
// //           </div>

// //           <div className={styles.summaryBanner}>
// //             <div className={styles.summaryIcon}>
// //               <TrophyIcon />
// //             </div>
// //             <div className={styles.summaryText}>
// //               <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
// //               <span className={styles.summaryLabel}>Work Anniversaries</span>
// //               <span className={styles.summaryCount}>{anniversaries.length}<span> employees</span></span>
// //             </div>
// //           </div>

// //           {anniversaryError && <div className={styles.errorBanner}>{anniversaryError}</div>}
// //           {!anniversaryError && anniversaries.length === 0 && (
// //             <div className={styles.emptyState}>No work anniversaries in {selectedMonthLabel}.</div>
// //           )}

// //           {anniversaries.length > 0 && (
// //             <div className={styles.panelBody}>
// //               <div className={styles.contentRow}>
// //                 <div className={styles.carouselWrap}>
// //                   <button
// //                     className={styles.navButton}
// //                     onClick={handleAnniversaryPrev}
// //                     disabled={anniversaryPage === 0}
// //                     aria-label="Previous"
// //                   >
// //                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="15 18 9 12 15 6"></polyline>
// //                     </svg>
// //                   </button>

// //                   {/* ✅ 3 cards per row */}
// //                   <div className={styles.anniversaryGrid}>
// //                     {currentAnniversaryItems.map((item, idx) => {
// //                       const globalIndex = anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + idx;
// //                       const variant = getRankVariant(globalIndex);
// //                       return (
// //                         <div key={item.employeeId} className={styles.anniversaryCard}>
// //                           <div className={styles.annCardTop}>
// //                             <MedalRibbonIcon rank={globalIndex + 1} variant={variant} />
// //                             <LaurelYearsBadge years={item.years} />
// //                           </div>
// //                           <div className={styles.cardBody}>
// //                             <h3 className={styles.employeeName}>{item.fullName}</h3>
// //                             <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
// //                             <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
// //                           </div>
// //                           <div className={styles.cardFooter}>
// //                             <span className={styles.joinedOn}>📅 Joined {item.joinedOn}</span>
// //                           </div>
// //                         </div>
// //                       );
// //                     })}
// //                   </div>

// //                   <button
// //                     className={styles.navButton}
// //                     onClick={handleAnniversaryNext}
// //                     disabled={anniversaryPage >= anniversaryTotalPages - 1}
// //                     aria-label="Next"
// //                   >
// //                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="9 18 15 12 9 6"></polyline>
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className={styles.bottomStack}>
// //                 <div className={styles.dots}>
// //                   {getDots(anniversaryTotalPages).map((index) => (
// //                     <button
// //                       key={index}
// //                       className={`${styles.dot} ${index === anniversaryPage ? styles.active : ''}`}
// //                       onClick={() => setAnniversaryPage(index)}
// //                       aria-label={`Go to page ${index + 1}`}
// //                     />
// //                   ))}
// //                 </div>
// //                 <div className={styles.footer}>
// //                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                     <circle cx="12" cy="12" r="10"></circle>
// //                     <line x1="12" y1="16" x2="12" y2="12"></line>
// //                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
// //                   </svg>
// //                   <span>Showing {anniversaries.length} employees with anniversaries in {selectedMonthLabel}.</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* ===== BIRTHDAYS PANEL ===== */}
// //         <div className={styles.panelCard}>
// //           <div className={styles.panelHeader}>
// //             <div className={styles.panelTitleWrap}>
// //               <h2 className={styles.title}>🎂 Employee Birthdays – {selectedMonthLabel}</h2>
// //               <p className={styles.subtitle}>Celebrate and make your colleagues feel special!</p>
// //             </div>
// //             {renderMonthSelector()}
// //           </div>

// //           <div className={styles.summaryBanner}>
// //             <div className={styles.summaryIcon}>
// //               <CakeIconSmall />
// //             </div>
// //             <div className={styles.summaryText}>
// //               <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
// //               <span className={styles.summaryLabel}>Birthdays This Month</span>
// //               <span className={styles.summaryCount}>{birthdays.length}<span> employees</span></span>
// //             </div>
// //           </div>

// //           {birthdayError && <div className={styles.errorBanner}>{birthdayError}</div>}
// //           {!birthdayError && birthdays.length === 0 && (
// //             <div className={styles.emptyState}>No birthdays in {selectedMonthLabel}.</div>
// //           )}

// //           {birthdays.length > 0 && (
// //             <div className={styles.panelBody}>
// //               <div className={styles.contentRow}>
// //                 <div className={styles.carouselWrap}>
// //                   <button
// //                     className={styles.navButton}
// //                     onClick={handleBirthdayPrev}
// //                     disabled={birthdayPage === 0}
// //                     aria-label="Previous"
// //                   >
// //                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="15 18 9 12 15 6"></polyline>
// //                     </svg>
// //                   </button>

// //                   {/* ✅ 3 cards per row */}
// //                   <div className={styles.birthdayGrid}>
// //                     {currentBirthdayItems.map((item) => (
// //                       <div key={item.employeeId} className={styles.birthdayCard}>
// //                         <div className={styles.cakeHeader}>
// //                           <CakeCandlesIcon />
// //                         </div>
// //                         <div className={styles.dateCenter}>
// //                           <span className={styles.dateDay}>{item.date} {selectedMonthShort}</span>
// //                           <span className={styles.dateWeekday}>{item.day}</span>
// //                         </div>
// //                         <div className={styles.cardDivider} />
// //                         <div className={styles.cardBody}>
// //                           <h3 className={styles.employeeName}>{item.fullName}</h3>
// //                           <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
// //                           <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
// //                         </div>
// //                         <div className={styles.cardFooter}>
// //                           <span className={styles.happyBirthdayTag}>🎉 Happy Birthday! ✨</span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   <button
// //                     className={styles.navButton}
// //                     onClick={handleBirthdayNext}
// //                     disabled={birthdayPage >= birthdayTotalPages - 1}
// //                     aria-label="Next"
// //                   >
// //                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="9 18 15 12 9 6"></polyline>
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className={styles.bottomStack}>
// //                 <div className={styles.dots}>
// //                   {getDots(birthdayTotalPages).map((index) => (
// //                     <button
// //                       key={index}
// //                       className={`${styles.dot} ${index === birthdayPage ? styles.active : ''}`}
// //                       onClick={() => setBirthdayPage(index)}
// //                       aria-label={`Go to page ${index + 1}`}
// //                     />
// //                   ))}
// //                 </div>
// //                 <div className={styles.footer}>
// //                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                     <circle cx="12" cy="12" r="10"></circle>
// //                     <line x1="12" y1="16" x2="12" y2="12"></line>
// //                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
// //                   </svg>
// //                   <span>Showing {birthdays.length} employees with birthdays in {selectedMonthLabel}.</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default AnniversariesBirthday;



// // src/webparts/applicationOperationsPortal/components/AnniversariesBirthday/AnniversariesBirthday.tsx

// import * as React from 'react';
// import styles from './AnniversariesBirthday.module.scss';
// import { employeeService, IEmployeeAnniversaryItem, IEmployeeBirthdayItem } from '../../services/EmployeeService';
// import { isPnPjsInitialized } from '../../services/pnpjsConfig';

// export interface IAnniversariesBirthdayProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
//   context?: any;
// }

// // ✅ 3 items per page
// const ANNIVERSARY_ITEMS_PER_PAGE = 3;
// const BIRTHDAY_ITEMS_PER_PAGE = 3;
// const AUTO_ROTATE_MS = 10000;

// // ✅ Only current + next 5 months = 6 months total
// const FUTURE_MONTHS_RANGE = 5;

// interface IMonthOption {
//   label: string;
//   value: string;
//   date: Date;
// }

// type RankVariant = 'gold' | 'silver' | 'bronze' | 'default';

// const getMonthLabel = (date: Date): string =>
//   date.toLocaleString('default', { month: 'long', year: 'numeric' });

// const getMonthShort = (date: Date): string =>
//   date.toLocaleString('default', { month: 'short' });

// const getMonthValue = (date: Date): string => {
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   var monthStr = month < 10 ? '0' + month : '' + month;
//   return year + '-' + monthStr;
// };

// const buildMonthOptions = (): IMonthOption[] => {
//   const options: IMonthOption[] = [];
//   const now = new Date();
//   const base = new Date(now.getFullYear(), now.getMonth(), 1);

//   for (let i = 0; i <= FUTURE_MONTHS_RANGE; i++) {
//     const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
//     options.push({ label: getMonthLabel(d), value: getMonthValue(d), date: d });
//   }
//   return options;
// };

// const getDots = (count: number): number[] => {
//   const dots: number[] = [];
//   for (let i = 0; i < count; i++) {
//     dots.push(i);
//   }
//   return dots;
// };

// const getRankVariant = (index: number): RankVariant => {
//   switch (index) {
//     case 0: return 'gold';
//     case 1: return 'silver';
//     case 2: return 'bronze';
//     default: return 'default';
//   }
// };

// // ===== Improved Medal Colors (from HTML reference) =====
// const rankColors: Record<RankVariant, { fill: string; stroke: string; text: string }> = {
//   gold: { fill: '#F5C542', stroke: '#D4A017', text: '#8A6A00' },
//   silver: { fill: '#C5CDD8', stroke: '#9AA3B2', text: '#4B5563' },
//   bronze: { fill: '#E09A5B', stroke: '#C67B3C', text: '#7A4014' },
//   default: { fill: '#b3a5ac', stroke: '#9aa3b2', text: '#6b7280' },
// };

// // ===== Years color mapping for laurel wreath (matches medal rank) =====
// const yearsColorMap: Record<RankVariant, string> = {
//   gold: '#D4A017',   // Gold color for years
//   silver: '#9AA3B2', // Silver color for years
//   bronze: '#C67B3C', // Bronze color for years
//   default: '#b3a5ac',
// };

// // ===== Small inline icons used inside card body rows =====
// const ClipboardIcon: React.FC = () => (
//   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="6" y="4" width="12" height="17" rx="2" />
//     <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
//     <line x1="9" y1="11" x2="15" y2="11" />
//     <line x1="9" y1="15" x2="13" y2="15" />
//   </svg>
// );

// const BuildingIcon: React.FC = () => (
//   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="4" y="3" width="16" height="18" rx="1" />
//     <line x1="8" y1="7" x2="8" y2="7.01" />
//     <line x1="12" y1="7" x2="12" y2="7.01" />
//     <line x1="16" y1="7" x2="16" y2="7.01" />
//     <line x1="8" y1="11" x2="8" y2="11.01" />
//     <line x1="12" y1="11" x2="12" y2="11.01" />
//     <line x1="16" y1="11" x2="16" y2="11.01" />
//     <line x1="8" y1="15" x2="8" y2="15.01" />
//     <line x1="12" y1="15" x2="12" y2="15.01" />
//     <line x1="16" y1="15" x2="16" y2="15.01" />
//     <path d="M10 21v-4h4v4" />
//   </svg>
// );

// const CalendarIcon: React.FC = () => (
//   <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//     <line x1="16" y1="2" x2="16" y2="6"></line>
//     <line x1="8" y1="2" x2="8" y2="6"></line>
//     <line x1="3" y1="10" x2="21" y2="10"></line>
//   </svg>
// );

// // ===== Trophy icon for anniversaries summary banner =====
// const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M8 21h8" />
//     <path d="M12 17v4" />
//     <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
//     <path d="M7 5H4a2 2 0 0 0 0 4h3" />
//     <path d="M17 5h3a2 2 0 0 1 0 4h-3" />
//   </svg>
// );

// // ===== Cake icon for birthdays summary banner (small) =====
// const CakeIconSmall: React.FC<{ className?: string }> = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20 21v-8H4v8"></path>
//     <path d="M4 13V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
//     <path d="M12 3v4"></path>
//     <path d="M9 3.5c0 1.5 3 1.5 3 3.5"></path>
//     <path d="M15 3.5c0 1.5-3 1.5-3 3.5"></path>
//   </svg>
// );

// // ===== Large cake with lit candles =====
// const CakeCandlesIcon: React.FC = () => (
//   <svg className={styles.cakeCandlesIcon} viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
//     <path d="M16 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
//     <path d="M32 6c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
//     <path d="M48 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
//     <rect x="14" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
//     <rect x="30" y="14" width="4" height="14" rx="1" fill="#f6da9a" />
//     <rect x="46" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
//     <rect x="8" y="28" width="48" height="12" rx="3" fill="currentColor" opacity="0.95" />
//     <rect x="4" y="40" width="56" height="12" rx="3" fill="currentColor" />
//     <circle cx="16" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
//     <circle cx="32" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
//     <circle cx="48" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
//   </svg>
// );

// // ============================================================
// // ===== Improved Medal Ribbon Icon =====
// // ============================================================
// const MedalRibbonIcon: React.FC<{ rank: number; variant: RankVariant }> = ({ rank, variant }) => {
//   const c = rankColors[variant];

//   return (
//     <svg className={styles.medalIcon} viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg">
//       {/* Ribbon tails */}
//       <path d="M18 34 L14 52 L24 46 L34 52 L30 34" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" />
//       {/* Medal disc */}
//       <circle cx="24" cy="20" r="16" fill={c.fill} stroke={c.stroke} strokeWidth="2" />
//       {/* Inner circle */}
//       <circle cx="24" cy="20" r="12" fill="#FFFDF7" stroke={c.stroke} strokeWidth="1.25" />
//       {/* Rank number */}
//       <text x="24" y="25" textAnchor="middle" fontSize="15" fontWeight="800" fill={c.text} fontFamily="Segoe UI, sans-serif">
//         {rank}
//       </text>
//     </svg>
//   );
// };

// // ============================================================
// // ===== ✅ UPDATED: Laurel Wreath Badge with Rank Color =====
// // ============================================================
// const LaurelYearsBadge: React.FC<{ years: number | string; variant: RankVariant }> = ({ years, variant }) => {
//   const yearsColor = yearsColorMap[variant] || yearsColorMap.default;

//   return (
//     <div className={styles.laurelWrap}>
//       {/* Wreath SVG - symmetrical laurel leaves */}
//       <svg className={styles.laurelSvg} viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
//         <g stroke="#c8793f" strokeWidth="2.2" fill="none" strokeLinecap="round">
//           <path d="M40 6 C24 10 14 22 14 36 C14 46 20 53 28 56" />
//           <path d="M20 14 C16 18 13 24 12 30" />
//           <path d="M16 24 C13 27 11 31 10 36" />
//           <path d="M15 34 C12 37 10 41 10 45" />
//           <path d="M50 6 C66 10 76 22 76 36 C76 46 70 53 62 56" />
//           <path d="M70 14 C74 18 77 24 78 30" />
//           <path d="M74 24 C77 27 79 31 80 36" />
//           <path d="M75 34 C78 37 80 41 80 45" />
//         </g>
//       </svg>
//       {/* Years text centered inside wreath with rank color */}
//       <div className={styles.yearsCenter} style={{ color: yearsColor }}>
//         <span className={styles.yearsNumber}>{years}</span>
//         <span className={styles.yearsLabel}>Years</span>
//       </div>
//     </div>
//   );
// };

// export const AnniversariesBirthday: React.FC<IAnniversariesBirthdayProps> = (props) => {
//   const monthOptions = React.useMemo(() => buildMonthOptions(), []);
//   const currentMonthValue = React.useMemo(() => getMonthValue(new Date()), []);

//   const [selectedMonthValue, setSelectedMonthValue] = React.useState<string>(currentMonthValue);

//   // ===== Anniversary state =====
//   const [anniversaries, setAnniversaries] = React.useState<IEmployeeAnniversaryItem[]>([]);
//   const [isAnniversaryLoading, setIsAnniversaryLoading] = React.useState(true);
//   const [anniversaryError, setAnniversaryError] = React.useState('');
//   const [anniversaryPage, setAnniversaryPage] = React.useState(0);

//   // ===== Birthday state =====
//   const [birthdays, setBirthdays] = React.useState<IEmployeeBirthdayItem[]>([]);
//   const [isBirthdayLoading, setIsBirthdayLoading] = React.useState(true);
//   const [birthdayError, setBirthdayError] = React.useState('');
//   const [birthdayPage, setBirthdayPage] = React.useState(0);

//   const selectedMonth = React.useMemo(() => {
//     const found = monthOptions.filter((m) => m.value === selectedMonthValue)[0];
//     return found ? found.date : new Date();
//   }, [monthOptions, selectedMonthValue]);

//   // ===== Load anniversaries =====
//   React.useEffect(() => {
//     let cancelled = false;
//     const load = async () => {
//       setIsAnniversaryLoading(true);
//       setAnniversaryError('');
//       try {
//         let retries = 0;
//         while (!isPnPjsInitialized() && retries < 15) {
//           await new Promise((resolve) => setTimeout(resolve, 500));
//           retries++;
//         }
//         const data = await employeeService.getAnniversariesForMonth(selectedMonth);
//         if (!cancelled) {
//           setAnniversaries(data);
//           setAnniversaryPage(0);
//         }
//       } catch (error) {
//         console.error('Error loading anniversaries:', error);
//         if (!cancelled) {
//           setAnniversaryError('Unable to load anniversary data. Please try again later.');
//           setAnniversaries([]);
//         }
//       } finally {
//         if (!cancelled) setIsAnniversaryLoading(false);
//       }
//     };
//     load();
//     return () => { cancelled = true; };
//   }, [selectedMonth, props.context]);

//   // ===== Load birthdays =====
//   React.useEffect(() => {
//     let cancelled = false;
//     const load = async () => {
//       setIsBirthdayLoading(true);
//       setBirthdayError('');
//       try {
//         let retries = 0;
//         while (!isPnPjsInitialized() && retries < 15) {
//           await new Promise((resolve) => setTimeout(resolve, 500));
//           retries++;
//         }
//         const data = await employeeService.getBirthdaysForMonth(selectedMonth);
//         if (!cancelled) {
//           setBirthdays(data);
//           setBirthdayPage(0);
//         }
//       } catch (error) {
//         console.error('Error loading birthdays:', error);
//         if (!cancelled) {
//           setBirthdayError('Unable to load birthday data. Please try again later.');
//           setBirthdays([]);
//         }
//       } finally {
//         if (!cancelled) setIsBirthdayLoading(false);
//       }
//     };
//     load();
//     return () => { cancelled = true; };
//   }, [selectedMonth, props.context]);

//   const anniversaryTotalPages = Math.ceil(anniversaries.length / ANNIVERSARY_ITEMS_PER_PAGE);
//   const birthdayTotalPages = Math.ceil(birthdays.length / BIRTHDAY_ITEMS_PER_PAGE);

//   // ===== Auto-rotate =====
//   React.useEffect(() => {
//     if (birthdayTotalPages <= 1) return;
//     const interval = setInterval(() => {
//       setBirthdayPage((prev) => (prev + 1) % birthdayTotalPages);
//     }, AUTO_ROTATE_MS);
//     return () => clearInterval(interval);
//   }, [birthdayTotalPages]);

//   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMonthValue(e.target.value);

//   const handleAnniversaryPrev = () => setAnniversaryPage((p) => Math.max(p - 1, 0));
//   const handleAnniversaryNext = () => setAnniversaryPage((p) => Math.min(p + 1, anniversaryTotalPages - 1));
//   const handleBirthdayPrev = () => setBirthdayPage((p) => Math.max(p - 1, 0));
//   const handleBirthdayNext = () => setBirthdayPage((p) => Math.min(p + 1, birthdayTotalPages - 1));

//   const currentAnniversaryItems = anniversaries.slice(
//     anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE,
//     anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + ANNIVERSARY_ITEMS_PER_PAGE
//   );
//   const currentBirthdayItems = birthdays.slice(
//     birthdayPage * BIRTHDAY_ITEMS_PER_PAGE,
//     birthdayPage * BIRTHDAY_ITEMS_PER_PAGE + BIRTHDAY_ITEMS_PER_PAGE
//   );

//   const isLoading = isAnniversaryLoading || isBirthdayLoading;
//   const selectedMonthLabel = getMonthLabel(selectedMonth);
//   const selectedMonthShort = getMonthShort(selectedMonth);

//   if (isLoading) {
//     return (
//       <section className={styles.anniversariesBirthdaySection}>
//         <div className={styles.loadingState}>Loading...</div>
//       </section>
//     );
//   }

//   const renderMonthSelector = () => (
//     <div className={styles.monthSelectorWrap}>
//       <CalendarIcon />
//       <select className={styles.monthSelect} value={selectedMonthValue} onChange={handleMonthChange} aria-label="Select month">
//         {monthOptions.map((m) => (
//           <option key={m.value} value={m.value}>{m.label}</option>
//         ))}
//       </select>
//       <svg className={styles.monthSelectorChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <polyline points="6 9 12 15 18 9"></polyline>
//       </svg>
//     </div>
//   );

//   return (
//     <section className={styles.anniversariesBirthdaySection}>
//       <div className={styles.grid}>

//         {/* ===== ANNIVERSARIES PANEL ===== */}
//         <div className={styles.panelCard}>
//           <div className={styles.panelHeader}>
//             <div className={styles.panelTitleWrap}>
//               <h2 className={styles.title}>🎉 Employee Anniversaries – {selectedMonthLabel}</h2>
//               <p className={styles.subtitle}>Celebrating work anniversaries this month.</p>
//             </div>
//             {renderMonthSelector()}
//           </div>

//           <div className={styles.summaryBanner}>
//             <div className={styles.summaryIcon}>
//               <TrophyIcon />
//             </div>
//             <div className={styles.summaryText}>
//               <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
//               <span className={styles.summaryLabel}>Work Anniversaries</span>
//               <span className={styles.summaryCount}>{anniversaries.length}<span> employees</span></span>
//             </div>
//           </div>

//           {anniversaryError && <div className={styles.errorBanner}>{anniversaryError}</div>}
//           {!anniversaryError && anniversaries.length === 0 && (
//             <div className={styles.emptyState}>No work anniversaries in {selectedMonthLabel}.</div>
//           )}

//           {anniversaries.length > 0 && (
//             <div className={styles.panelBody}>
//               <div className={styles.contentRow}>
//                 <div className={styles.carouselWrap}>
//                   <button
//                     className={styles.navButton}
//                     onClick={handleAnniversaryPrev}
//                     disabled={anniversaryPage === 0}
//                     aria-label="Previous"
//                   >
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="15 18 9 12 15 6"></polyline>
//                     </svg>
//                   </button>

//                   {/* ✅ 3 cards per row with rank-colored years */}
//                   <div className={styles.anniversaryGrid}>
//                     {currentAnniversaryItems.map((item, idx) => {
//                       const globalIndex = anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + idx;
//                       const variant = getRankVariant(globalIndex);
//                       return (
//                         <div key={item.employeeId} className={styles.anniversaryCard}>
//                           <div className={styles.annCardTop}>
//                             <MedalRibbonIcon rank={globalIndex + 1} variant={variant} />
//                             {/* ✅ Pass variant to LaurelYearsBadge for rank-colored years */}
//                             <LaurelYearsBadge years={item.years} variant={variant} />
//                           </div>
//                           <div className={styles.cardBody}>
//                             <h3 className={styles.employeeName}>{item.fullName}</h3>
//                             <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
//                             <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
//                           </div>
//                           <div className={styles.cardFooter}>
//                             <span className={styles.joinedOn}>📅 Joined {item.joinedOn}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <button
//                     className={styles.navButton}
//                     onClick={handleAnniversaryNext}
//                     disabled={anniversaryPage >= anniversaryTotalPages - 1}
//                     aria-label="Next"
//                   >
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="9 18 15 12 9 6"></polyline>
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className={styles.bottomStack}>
//                 <div className={styles.dots}>
//                   {getDots(anniversaryTotalPages).map((index) => (
//                     <button
//                       key={index}
//                       className={`${styles.dot} ${index === anniversaryPage ? styles.active : ''}`}
//                       onClick={() => setAnniversaryPage(index)}
//                       aria-label={`Go to page ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//                 <div className={styles.footer}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <line x1="12" y1="16" x2="12" y2="12"></line>
//                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                   </svg>
//                   <span>Showing {anniversaries.length} employees with anniversaries in {selectedMonthLabel}.</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ===== BIRTHDAYS PANEL ===== */}
//         <div className={styles.panelCard}>
//           <div className={styles.panelHeader}>
//             <div className={styles.panelTitleWrap}>
//               <h2 className={styles.title}>🎂 Employee Birthdays – {selectedMonthLabel}</h2>
//               <p className={styles.subtitle}>Celebrate and make your colleagues feel special!</p>
//             </div>
//             {renderMonthSelector()}
//           </div>

//           <div className={styles.summaryBanner}>
//             <div className={styles.summaryIcon}>
//               <CakeIconSmall />
//             </div>
//             <div className={styles.summaryText}>
//               <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
//               <span className={styles.summaryLabel}>Birthdays This Month</span>
//               <span className={styles.summaryCount}>{birthdays.length}<span> employees</span></span>
//             </div>
//           </div>

//           {birthdayError && <div className={styles.errorBanner}>{birthdayError}</div>}
//           {!birthdayError && birthdays.length === 0 && (
//             <div className={styles.emptyState}>No birthdays in {selectedMonthLabel}.</div>
//           )}

//           {birthdays.length > 0 && (
//             <div className={styles.panelBody}>
//               <div className={styles.contentRow}>
//                 <div className={styles.carouselWrap}>
//                   <button
//                     className={styles.navButton}
//                     onClick={handleBirthdayPrev}
//                     disabled={birthdayPage === 0}
//                     aria-label="Previous"
//                   >
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="15 18 9 12 15 6"></polyline>
//                     </svg>
//                   </button>

//                   <div className={styles.birthdayGrid}>
//                     {currentBirthdayItems.map((item) => (
//                       <div key={item.employeeId} className={styles.birthdayCard}>
//                         <div className={styles.cakeHeader}>
//                           <CakeCandlesIcon />
//                         </div>
//                         <div className={styles.dateCenter}>
//                           <span className={styles.dateDay}>{item.date} {selectedMonthShort}</span>
//                           <span className={styles.dateWeekday}>{item.day}</span>
//                         </div>
//                         <div className={styles.cardDivider} />
//                         <div className={styles.cardBody}>
//                           <h3 className={styles.employeeName}>{item.fullName}</h3>
//                           <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
//                           <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
//                         </div>
//                         <div className={styles.cardFooter}>
//                           <span className={styles.happyBirthdayTag}>🎉 Happy Birthday! ✨</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     className={styles.navButton}
//                     onClick={handleBirthdayNext}
//                     disabled={birthdayPage >= birthdayTotalPages - 1}
//                     aria-label="Next"
//                   >
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="9 18 15 12 9 6"></polyline>
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className={styles.bottomStack}>
//                 <div className={styles.dots}>
//                   {getDots(birthdayTotalPages).map((index) => (
//                     <button
//                       key={index}
//                       className={`${styles.dot} ${index === birthdayPage ? styles.active : ''}`}
//                       onClick={() => setBirthdayPage(index)}
//                       aria-label={`Go to page ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//                 <div className={styles.footer}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <line x1="12" y1="16" x2="12" y2="12"></line>
//                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                   </svg>
//                   <span>Showing {birthdays.length} employees with birthdays in {selectedMonthLabel}.</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnniversariesBirthday;



// src/webparts/applicationOperationsPortal/components/AnniversariesBirthday/AnniversariesBirthday.tsx

import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './AnniversariesBirthday.module.scss';
import { employeeService, IEmployeeAnniversaryItem, IEmployeeBirthdayItem } from '../../services/EmployeeService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IAnniversariesBirthdayProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?: WebPartContext;
}

// ✅ 3 items per page
const ANNIVERSARY_ITEMS_PER_PAGE = 3;
const BIRTHDAY_ITEMS_PER_PAGE = 3;
const AUTO_ROTATE_MS = 10000;

// ✅ Only current + next 5 months = 6 months total
const FUTURE_MONTHS_RANGE = 5;

interface IMonthOption {
  label: string;
  value: string;
  date: Date;
}

type RankVariant = 'gold' | 'silver' | 'bronze' | 'default';

const getMonthLabel = (date: Date): string =>
  date.toLocaleString('default', { month: 'long', year: 'numeric' });

const getMonthShort = (date: Date): string =>
  date.toLocaleString('default', { month: 'short' });

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

// ===== Medal colors (fill / stroke / text) =====
const rankColors: Record<RankVariant, { fill: string; stroke: string; text: string }> = {
  gold: { fill: '#F5C542', stroke: '#D4A017', text: '#8A6A00' },
  silver: { fill: '#C5CDD8', stroke: '#9AA3B2', text: '#4B5563' },
  bronze: { fill: '#E09A5B', stroke: '#C67B3C', text: '#7A4014' },
  default: { fill: '#b3a5ac', stroke: '#9aa3b2', text: '#6b7280' },
};

// ===== Years color mapping for laurel wreath (matches medal rank) =====
const yearsColorMap: Record<RankVariant, string> = {
  gold: '#D4A017',   // Gold color for years
  silver: '#9AA3B2', // Silver color for years
  bronze: '#C67B3C', // Bronze color for years
  default: '#b3a5ac',
};

// ===== Small inline icons used inside card body rows =====
const ClipboardIcon: React.FC = () => (
  <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <line x1="9" y1="11" x2="15" y2="11" />
    <line x1="9" y1="15" x2="13" y2="15" />
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

const CalendarIcon: React.FC = () => (
  <svg className={styles.rowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ===== Trophy icon for anniversaries summary banner =====
const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 5H4a2 2 0 0 0 0 4h3" />
    <path d="M17 5h3a2 2 0 0 1 0 4h-3" />
  </svg>
);

// ===== Cake icon for birthdays summary banner (small) =====
const CakeIconSmall: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-8H4v8" />
    <path d="M4 13V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M12 3v4" />
    <path d="M9 3.5c0 1.5 3 1.5 3 3.5" />
    <path d="M15 3.5c0 1.5-3 1.5-3 3.5" />
  </svg>
);

// ===== Large cake with lit candles =====
const CakeCandlesIcon: React.FC = () => (
  <svg className={styles.cakeCandlesIcon} viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M32 6c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M48 10c-2 3 2 5 0 8" stroke="#f0973b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <rect x="14" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
    <rect x="30" y="14" width="4" height="14" rx="1" fill="#f6da9a" />
    <rect x="46" y="18" width="4" height="10" rx="1" fill="#f6da9a" />
    <rect x="8" y="28" width="48" height="12" rx="3" fill="currentColor" opacity="0.95" />
    <rect x="4" y="40" width="56" height="12" rx="3" fill="currentColor" />
    <circle cx="16" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
    <circle cx="32" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
    <circle cx="48" cy="34" r="1.6" fill="#ffffff" opacity="0.85" />
  </svg>
);

// ===== Small icon used inside footer info banner =====
const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// ===== Icon used for empty states =====
const EmptyStateIcon: React.FC = () => (
  <svg className={styles.emptyStateIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
  </svg>
);

// ============================================================
// ===== Medal Ribbon Icon =====
// Rank 1/2/3 -> gold/silver/bronze fill+stroke, rank number
// rendered inside the medal disc.
// ============================================================
const MedalRibbonIcon: React.FC<{ rank: number; variant: RankVariant }> = ({ rank, variant }) => {
  const c = rankColors[variant];

  return (
    <svg className={styles.medalIcon} viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg">
      {/* Ribbon tails */}
      <path d="M18 34 L14 52 L24 46 L34 52 L30 34" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Medal disc */}
      <circle cx="24" cy="20" r="16" fill={c.fill} stroke={c.stroke} strokeWidth="2" />
      {/* Inner circle */}
      <circle cx="24" cy="20" r="12" fill="#FFFDF7" stroke={c.stroke} strokeWidth="1.25" />
      {/* Rank number */}
      <text x="24" y="25" textAnchor="middle" fontSize="15" fontWeight="800" fill={c.text} fontFamily="Segoe UI, sans-serif">
        {rank}
      </text>
    </svg>
  );
};

// ============================================================
// ===== Laurel Wreath Badge — vector wreath, color matches rank =====
// gold rank -> gold wreath + gold years text
// silver rank -> silver wreath + silver years text
// bronze rank -> bronze wreath + bronze years text
// SVG keeps the wreath crisp at any size (no squish/blur like a
// raster badge does when the card shrinks on mobile).
// ============================================================
const LaurelYearsBadge: React.FC<{ years: number | string; variant: RankVariant }> = ({ years, variant }) => {
  const yearsColor = yearsColorMap[variant] || yearsColorMap.default;

  return (
    <div className={styles.laurelWrap}>
      <svg className={styles.laurelSvg} viewBox="0 0 96 64" xmlns="http://www.w3.org/2000/svg">
        <g stroke={yearsColor} strokeWidth="2.4" fill="none" strokeLinecap="round">
          {/* Left branch */}
          <path d="M42 6 C24 10 13 24 13 39 C13 49 20 57 29 60" />
          <path d="M21 15 C17 19 13.5 25 12.5 31" />
          <path d="M16.5 26 C13 29 11 33 10 38" />
          <path d="M15 37 C11.5 40 9.5 44 9.5 48" />
          {/* Right branch (mirrored) */}
          <path d="M54 6 C72 10 83 24 83 39 C83 49 76 57 67 60" />
          <path d="M75 15 C79 19 82.5 25 83.5 31" />
          <path d="M79.5 26 C83 29 85 33 86 38" />
          <path d="M81 37 C84.5 40 86.5 44 86.5 48" />
        </g>
      </svg>
      {/* Years text centered inside wreath with rank color */}
      <div className={styles.yearsCenter} style={{ color: yearsColor }}>
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

  // ===== Anniversary state =====
  const [anniversaries, setAnniversaries] = React.useState<IEmployeeAnniversaryItem[]>([]);
  const [isAnniversaryLoading, setIsAnniversaryLoading] = React.useState(true);
  const [anniversaryError, setAnniversaryError] = React.useState('');
  const [anniversaryPage, setAnniversaryPage] = React.useState(0);

  // ===== Birthday state =====
  const [birthdays, setBirthdays] = React.useState<IEmployeeBirthdayItem[]>([]);
  const [isBirthdayLoading, setIsBirthdayLoading] = React.useState(true);
  const [birthdayError, setBirthdayError] = React.useState('');
  const [birthdayPage, setBirthdayPage] = React.useState(0);

  const selectedMonth = React.useMemo(() => {
    const found = monthOptions.filter((m) => m.value === selectedMonthValue)[0];
    return found ? found.date : new Date();
  }, [monthOptions, selectedMonthValue]);

  // ===== Load anniversaries =====
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

  // ===== Load birthdays =====
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
  const birthdayTotalPages = Math.ceil(birthdays.length / BIRTHDAY_ITEMS_PER_PAGE);

  // ===== Auto-rotate =====
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
    birthdayPage * BIRTHDAY_ITEMS_PER_PAGE,
    birthdayPage * BIRTHDAY_ITEMS_PER_PAGE + BIRTHDAY_ITEMS_PER_PAGE
  );

  const isLoading = isAnniversaryLoading || isBirthdayLoading;
  const selectedMonthLabel = getMonthLabel(selectedMonth);
  const selectedMonthShort = getMonthShort(selectedMonth);

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
      <CalendarIcon />
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

        {/* ===== ANNIVERSARIES PANEL ===== */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleWrap}>
              <h2 className={styles.title}>🎉 Employee Anniversaries – {selectedMonthLabel}</h2>
              <p className={styles.subtitle}>Celebrating work anniversaries this month.</p>
            </div>
            {renderMonthSelector()}
          </div>

          <div className={styles.summaryBanner}>
            <div className={styles.summaryIcon}>
              <TrophyIcon />
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
                    className={styles.navButton}
                    onClick={handleAnniversaryPrev}
                    disabled={anniversaryPage === 0}
                    aria-label="Previous"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* ✅ 3 cards per row with rank-colored years */}
                  <div className={styles.anniversaryGrid}>
                    {currentAnniversaryItems.map((item, idx) => {
                      const globalIndex = anniversaryPage * ANNIVERSARY_ITEMS_PER_PAGE + idx;
                      const variant = getRankVariant(globalIndex);
                      const accentColor = rankColors[variant].stroke;
                      return (
                        <div
                          key={item.employeeId}
                          className={styles.anniversaryCard}
                          style={{ '--accent': accentColor } as React.CSSProperties}
                        >
                          <div className={styles.annCardTop}>
                            <MedalRibbonIcon rank={globalIndex + 1} variant={variant} />
                            {/* ✅ Laurel wreath color follows medal rank */}
                            <LaurelYearsBadge years={item.years} variant={variant} />
                          </div>
                          <div className={styles.cardBody}>
                            <h3 className={styles.employeeName}>{item.fullName}</h3>
                            <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
                            <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
                          </div>
                          <div className={styles.cardFooter}>
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
                    className={styles.navButton}
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
                      onClick={() => setAnniversaryPage(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
                <div className={styles.footer}>
                  <span className={styles.footerIcon}><InfoIcon /></span>
                  <span>Showing {anniversaries.length} employees with anniversaries in {selectedMonthLabel}.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== BIRTHDAYS PANEL ===== */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleWrap}>
              <h2 className={styles.title}>🎂 Employee Birthdays – {selectedMonthLabel}</h2>
              <p className={styles.subtitle}>Celebrate and make your colleagues feel special!</p>
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
              <div className={styles.contentRow}>
                <div className={styles.carouselWrap}>
                  <button
                    className={styles.navButton}
                    onClick={handleBirthdayPrev}
                    disabled={birthdayPage === 0}
                    aria-label="Previous"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <div className={styles.birthdayGrid}>
                    {currentBirthdayItems.map((item) => (
                      <div key={item.employeeId} className={styles.birthdayCard}>
                        <div className={styles.cakeHeader}>
                          <CakeCandlesIcon />
                        </div>
                        <div className={styles.dateCenter}>
                          <span className={styles.dateDay}>{item.date} {selectedMonthShort}</span>
                          <span className={styles.dateWeekday}>{item.day}</span>
                        </div>
                        <div className={styles.cardDivider} />
                        <div className={styles.cardBody}>
                          <h3 className={styles.employeeName}>{item.fullName}</h3>
                          <span className={styles.infoRow}><ClipboardIcon />{item.jobTitle}</span>
                          <span className={styles.infoRow}><BuildingIcon />{item.department}</span>
                        </div>
                        <div className={styles.cardFooter}>
                          <span className={styles.happyBirthdayTag}>🎉 Happy Birthday! ✨</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className={styles.navButton}
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

              <div className={styles.bottomStack}>
                <div className={styles.dots}>
                  {getDots(birthdayTotalPages).map((index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${index === birthdayPage ? styles.active : ''}`}
                      onClick={() => setBirthdayPage(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
                <div className={styles.footer}>
                  <span className={styles.footerIcon}><InfoIcon /></span>
                  <span>Showing {birthdays.length} employees with birthdays in {selectedMonthLabel}.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnniversariesBirthday;