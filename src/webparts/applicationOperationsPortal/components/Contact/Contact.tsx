// import * as React from 'react';
// import styles from './Contact.module.scss';

// // Internal interfaces
// interface IContactInfo {
//   email: string;
//   phone: string;
//   office: string;
// }

// interface IContactMessage {
//   fullName: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// export interface IContactProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// const initialMessage: IContactMessage = {
//   fullName: "",
//   email: "",
//   subject: "",
//   message: "",
// };

// export const Contact: React.FC<IContactProps> = () => {
//   const [info, setInfo] = React.useState<IContactInfo | undefined>();
//   const [form, setForm] = React.useState<IContactMessage>(initialMessage);
//   const [sending, setSending] = React.useState(false);
//   const [success, setSuccess] = React.useState(false);

//   // Mock data - replace with intranetService.getContactInfo()
//   const getMockContactInfo = (): Promise<IContactInfo> => {
//     return Promise.resolve({
//       email: "support@company.com",
//       phone: "+971 2 123 4567",
//       office: "Al Maryah Island, Abu Dhabi, UAE"
//     });
//   };

//   // Mock send - replace with intranetService.sendContactMessage()
//   const sendMockMessage = async (message: IContactMessage): Promise<void> => {
//     console.log("Contact message:", message);
//     return new Promise((resolve) => setTimeout(resolve, 1000));
//   };

//   React.useEffect(() => {
//     getMockContactInfo().then(setInfo).catch(console.error);
//   }, []);

//   const update = (key: keyof IContactMessage, value: string) => {
//     setForm((f) => ({ ...f, [key]: value }));
//   };

//   const submit = async (ev: React.FormEvent) => {
//     ev.preventDefault();
//     setSending(true);
//     setSuccess(false);
//     try {
//       await sendMockMessage(form);
//       setForm(initialMessage);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <section className={styles.section}>
//       <h2 className={styles.title}>CONTACT US</h2>
//       <div className={styles.grid}>
//         <div className={styles.left}>
//           <h3 className={styles.subTitle}>Get in Touch</h3>
//           {info && (
//             <ul className={styles.infoList}>
//               <li>
//                 <span className={styles.iconBubble}>📧</span>
//                 <div>
//                   <div className={styles.label}>Email</div>
//                   <div className={styles.value}>{info.email}</div>
//                 </div>
//               </li>
//               <li>
//                 <span className={styles.iconBubble}>📞</span>
//                 <div>
//                   <div className={styles.label}>Phone</div>
//                   <div className={styles.value}>{info.phone}</div>
//                 </div>
//               </li>
//               <li>
//                 <span className={styles.iconBubble}>📍</span>
//                 <div>
//                   <div className={styles.label}>Office</div>
//                   <div className={styles.value}>{info.office}</div>
//                 </div>
//               </li>
//             </ul>
//           )}
//         </div>

//         <form className={styles.right} onSubmit={submit}>
//           <h3 className={styles.subTitle}>Send a Message</h3>
//           {success && <div className={styles.successMessage}>Message sent successfully!</div>}
//           <div className={styles.row2}>
//             <input
//               type="text"
//               className={styles.input}
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={(e) => update("fullName", e.target.value)}
//               required
//             />
//             <input
//               type="email"
//               className={styles.input}
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) => update("email", e.target.value)}
//               required
//             />
//           </div>
//           <input
//             type="text"
//             className={styles.input}
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) => update("subject", e.target.value)}
//             required
//           />
//           <textarea
//             className={styles.textarea}
//             placeholder="Your Message"
//             value={form.message}
//             onChange={(e) => update("message", e.target.value)}
//             rows={4}
//             required
//           />
//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={sending}
//           >
//             {sending ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

import * as React from 'react';
import styles from './Contact.module.scss';
import { contactService, IContactMessage } from '../../services/ContactService';
import { isPnPjsInitialized } from '../../services/pnpjsConfig';

export interface IContactProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
}

// Hardcoded contact info - No SharePoint list needed
const CONTACT_INFO = {
  email: "support@company.com",
  phone: "+971 2 123 4567",
  office: "Al Maryah Island, Abu Dhabi, UAE"
};

const initialMessage: IContactMessage = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export const Contact: React.FC<IContactProps> = () => {
  const [form, setForm] = React.useState<IContactMessage>(initialMessage);
  const [sending, setSending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const update = (key: keyof IContactMessage, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSending(true);
    setSuccess(false);
    
    try {
      // Wait for PnPjs to be ready
      let retries = 0;
      while (!isPnPjsInitialized() && retries < 15) {
        await new Promise(resolve => setTimeout(resolve, 500));
        retries++;
      }
      
      await contactService.sendContactMessage(form);
      setForm(initialMessage);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>CONTACT US</h2>
      <div className={styles.grid}>
        {/* Get in Touch - Hardcoded values */}
        <div className={styles.left}>
          <h3 className={styles.subTitle}>Get in Touch</h3>
          <ul className={styles.infoList}>
            <li>
              <span className={styles.iconBubble}>📧</span>
              <div>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{CONTACT_INFO.email}</div>
              </div>
            </li>
            <li>
              <span className={styles.iconBubble}>📞</span>
              <div>
                <div className={styles.label}>Phone</div>
                <div className={styles.value}>{CONTACT_INFO.phone}</div>
              </div>
            </li>
            <li>
              <span className={styles.iconBubble}>📍</span>
              <div>
                <div className={styles.label}>Office</div>
                <div className={styles.value}>{CONTACT_INFO.office}</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Send a Message Form - Saves to SharePoint list */}
        <form className={styles.right} onSubmit={submit}>
          <h3 className={styles.subTitle}>Send a Message</h3>
          {success && <div className={styles.successMessage}>Message sent successfully!</div>}
          <div className={styles.row2}>
            <input
              type="text"
              className={styles.input}
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              required
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            className={styles.input}
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            required
          />
          <textarea
            className={styles.textarea}
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
            required
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};