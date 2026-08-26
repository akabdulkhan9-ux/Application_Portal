import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './Contact.module.scss';
import { contactService, IContactMessage } from '../../services/ContactService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';
import { userService, IUserInfo } from '../../services/UserService';
import { leaveService, IEmployeeLeaveItem } from '../../services/LeaveService';
import { useResponsiveCardCount } from '../../hooks/useResponsiveCardCount';

export interface IContactProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?: WebPartContext;
}

const AUTO_ROTATE_MS = 15000;
const PAST_MONTHS_RANGE = 3;
const FUTURE_MONTHS_RANGE = 9;

interface IMonthOption {
  label: string;
  value: string;
  date: Date;
}

const initialMessage: IContactMessage = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};

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

  for (let i = -PAST_MONTHS_RANGE; i <= FUTURE_MONTHS_RANGE; i++) {
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

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowLeftIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const PlaneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.5 19l19-7-19-7 4.5 7-4.5 7z" />
  </svg>
);

const UserCheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const HeartPulseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.7 0-3 .8-4.5 2.5C11.5 4.8 10.2 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2.3 1.5 4 3 5.5l6.6 6.6a1 1 0 0 0 1.4 0L19 14z" />
    <polyline points="3 12 7 12 9 9 12 15 14 12 21 12" />
  </svg>
);

const leaveTypeIcon = (type: string): React.ReactElement => {
  if (type === 'Sick Leave') return <HeartPulseIcon />;
  if (type === 'Personal Leave') return <UserCheckIcon />;
  return <PlaneIcon />;
};

const UserIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const TagIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41 13 21l-9-9V4h8l8.59 8.59a2 2 0 0 1 0 2.82Z" />
    <circle cx="7.5" cy="7.5" r="1" />
  </svg>
);

const MessageIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PeopleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MESSAGE_RECIPIENT = {
  name: 'Application Operations and Shared Services',
  email: 'AOSSLeadership@cibccaribbean.com',
};

const SendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckCircleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const Contact: React.FC<IContactProps> = (props) => {
  const monthOptions = React.useMemo(() => buildMonthOptions(), []);
  const currentMonthValue = React.useMemo(() => getMonthValue(new Date()), []);

  const [selectedMonthValue, setSelectedMonthValue] = React.useState<string>(currentMonthValue);

  const [leaves, setLeaves] = React.useState<IEmployeeLeaveItem[]>([]);
  const [isLeaveLoading, setIsLeaveLoading] = React.useState(true);
  const [leaveError, setLeaveError] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [leaveTrackEl, setLeaveTrackEl] = React.useState<HTMLDivElement | undefined>(undefined);
  const itemsPerPage = useResponsiveCardCount(leaveTrackEl, 3);

  const [form, setForm] = React.useState<IContactMessage>(initialMessage);
  const [sending, setSending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState<IUserInfo | null>(null);
  const [isContactLoading, setIsContactLoading] = React.useState(true);

  const selectedMonth = React.useMemo(() => {
    const found = monthOptions.filter((m) => m.value === selectedMonthValue)[0];
    return found ? found.date : new Date();
  }, [monthOptions, selectedMonthValue]);

  React.useEffect(() => {
    let cancelled = false;
    const loadUser = async (): Promise<void> => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          retries++;
        }

        const user = await userService.getCurrentUser();
        if (cancelled) return;
        setCurrentUser(user);

        if (user) {
          setForm({
            ...initialMessage,
            fullName: user.displayName,
            email: user.email,
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        if (!cancelled) setIsContactLoading(false);
      }
    };

    loadUser().catch((): void => undefined);
    return () => { cancelled = true; };
  }, [props.context]);

  React.useEffect(() => {
    let cancelled = false;
    const loadLeaves = async (): Promise<void> => {
      setIsLeaveLoading(true);
      setLeaveError('');
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 15) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          retries++;
        }

        const data = await leaveService.getLeavesForMonth(selectedMonth);
        if (!cancelled) {
          setLeaves(data);
          setCurrentPage(0);
        }
      } catch (error) {
        console.error('Error loading leaves:', error);
        if (!cancelled) {
          setLeaveError('Unable to load leave data. Please try again later.');
          setLeaves([]);
        }
      } finally {
        if (!cancelled) setIsLeaveLoading(false);
      }
    };

    loadLeaves().catch((): void => undefined);
    return () => { cancelled = true; };
  }, [selectedMonth, props.context]);

  const totalPages = Math.ceil(leaves.length / itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  React.useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [totalPages]);

  const handlePrev = (): void => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNext = (): void => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedMonthValue(e.target.value);

  const getLeaveTypeClass = (type: string): string => {
    switch (type) {
      case 'Annual Leave': return styles.annualLeave;
      case 'Personal Leave': return styles.personalLeave;
      case 'Sick Leave': return styles.sickLeave;
      default: return styles.annualLeave;
    }
  };

  const update = (key: keyof IContactMessage, value: string): void =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (ev: React.FormEvent): Promise<void> => {
    ev.preventDefault();
    setSending(true);
    setSuccess(false);

    try {
      let retries = 0;
      while (!isPnPjsInitialized() && retries < 15) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        retries++;
      }

      await contactService.sendContactMessage(form);

      const resetForm = { ...initialMessage };
      if (currentUser) {
        resetForm.fullName = currentUser.displayName;
        resetForm.email = currentUser.email;
      }
      setForm(resetForm);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const isLoading = isLeaveLoading || isContactLoading;

  if (isLoading) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.loadingState}>Loading...</div>
      </section>
    );
  }

  const currentItems = leaves.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);
  const leaveTrackClass = `${styles.carouselTrack} ${
    itemsPerPage === 1 ? styles.cols1 : itemsPerPage === 2 ? styles.cols2 : styles.cols3
  }`;
  const selectedMonthLabel = getMonthLabel(selectedMonth);
  const isCurrentMonth = selectedMonthValue === currentMonthValue;
  const leaveTitleMonth = isCurrentMonth ? 'Current Month' : selectedMonthLabel;

  return (
    <section className={styles.contactSection}>
      <div className={styles.grid}>

        <div className={styles.leaveColumn}>
          <div className={styles.leaveHeader}>
            <div className={styles.leaveTitleWrap}>
              <h2 className={styles.title}>Employees on Leave – {leaveTitleMonth}</h2>
              <p className={styles.subtitle}>View all employees who are on leave during the current month.</p>
            </div>

            <div className={styles.monthSelectorWrap}>
              <CalendarIcon className={styles.monthSelectorIcon} />
              <select
                className={styles.monthSelect}
                value={selectedMonthValue}
                onChange={handleMonthChange}
                aria-label="Select month"
              >
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <ChevronIcon className={styles.monthSelectorChevron} />
            </div>
          </div>

          <div className={styles.summaryBanner}>
            <div className={styles.calendarIconWrap}>
              <CalendarIcon />
            </div>
            <div className={styles.summaryText}>
              <span className={styles.summaryMonth}>{selectedMonthLabel}</span>
              <span className={styles.summaryLabel}>Employees on Leave</span>
              <span className={styles.summaryCount}>{leaves.length}<span> employees</span></span>
            </div>
          </div>

          {leaveError && <div className={styles.errorBanner}>{leaveError}</div>}
          {!leaveError && leaves.length === 0 && (
            <div className={styles.emptyState}>No employees are on leave in {selectedMonthLabel}.</div>
          )}

          {leaves.length > 0 && (
            <React.Fragment>
              <div className={styles.carouselWrap}>
                <button className={`${styles.navButton} ${styles.navPrev}`} onClick={handlePrev} disabled={currentPage === 0} aria-label="Previous">
                  <ArrowLeftIcon />
                </button>

                <div className={styles.carouselViewport}>
                  <div className={leaveTrackClass} ref={(node): void => setLeaveTrackEl(node || undefined)}>
                    {currentItems.map((leave) => (
                      <div key={leave.id} className={styles.leaveCard}>
                        <h3 className={styles.employeeName}>{leave.fullName}</h3>
                        <span className={styles.employeeTitle}>{leave.jobTitle}</span>
                        <span className={`${styles.leaveType} ${getLeaveTypeClass(leave.leaveType)}`}>
                          <span className={styles.leaveTypeIcon}>{leaveTypeIcon(leave.leaveType)}</span>
                          {leave.leaveType}
                        </span>
                        <span className={styles.dateRange}>
                          <CalendarIcon />
                          {leave.startDate} – {leave.endDate}
                        </span>
                        <span className={styles.days}>{leave.days} {leave.days === 1 ? 'Day' : 'Days'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`${styles.navButton} ${styles.navNext}`}
                  onClick={handleNext}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next"
                >
                  <ArrowRightIcon />
                </button>
              </div>

              <div className={styles.dots}>
                {getDots(totalPages).map((index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </React.Fragment>
          )}

          <div className={styles.footer}>
            <InfoIcon />
            <span>Showing employees who are on leave during {selectedMonthLabel}.</span>
          </div>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formHeader}>
            <div className={styles.formIconWrap}>
              <MessageIcon />
            </div>
            <div>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <p className={styles.formSubtitle}>We usually reply within one business day.</p>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={submit}>
            {success && (
              <div className={styles.successMessage}>
                <CheckCircleIcon />
                Message sent successfully!
              </div>
            )}

            <div className={styles.fieldWrap}>
              <span className={styles.fieldLabel}>To</span>
              <div className={styles.toField} aria-label={`To ${MESSAGE_RECIPIENT.name}`}>
                <PeopleIcon />
                <div className={styles.toFieldText}>
                  <span className={styles.toName}>{MESSAGE_RECIPIENT.name}</span>
                  <span className={styles.toEmail}>{MESSAGE_RECIPIENT.email}</span>
                </div>
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.fieldWrap}>
                <label className={styles.fieldLabel} htmlFor="contact-full-name">Full Name</label>
                <div className={styles.inputIconWrap}>
                  <UserIcon />
                  <input
                    id="contact-full-name"
                    type="text"
                    className={styles.input}
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    required
                    disabled={isContactLoading}
                  />
                </div>
              </div>

              <div className={styles.fieldWrap}>
                <label className={styles.fieldLabel} htmlFor="contact-email">Email</label>
                <div className={styles.inputIconWrap}>
                  <MailIcon />
                  <input
                    id="contact-email"
                    type="email"
                    className={styles.input}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                    disabled={isContactLoading}
                  />
                </div>
              </div>
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel} htmlFor="contact-subject">Subject</label>
              <div className={styles.inputIconWrap}>
                <TagIcon />
                <input
                  id="contact-subject"
                  type="text"
                  className={styles.input}
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel} htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                className={styles.textareaLarge}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={sending || isContactLoading}>
              <SendIcon />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;