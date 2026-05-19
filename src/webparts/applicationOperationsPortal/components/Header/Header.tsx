// import * as React from "react";
// import styles from "./Header.module.scss";

// // Internal interface
// interface IUserInfo {
//   displayName: string;
//   greeting: string;
//   photoUrl?: string;
// }

// export interface IHeaderProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// export const Header: React.FC<IHeaderProps> = () => {
//   const [user, setUser] = React.useState<IUserInfo | undefined>();

//   // Mock data - replace with intranetService.getCurrentUser()
//   const getMockUser = (): Promise<IUserInfo> => {
//     return Promise.resolve({
//       displayName: "Hassan Al-Zahrani",
//       greeting: "Welcome back",
//       photoUrl: ""
//     });
//   };

//   React.useEffect(() => {
//     getMockUser().then(setUser).catch(console.error);
//   }, []);

//   // Get first letter for avatar
//   const getInitial = (name: string): string => {
//     return name.charAt(0).toUpperCase();
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.inner}>
//         <div className={styles.logoBox} aria-label="CIBC">
//           <span className={styles.logoText}>CIBC</span>
//           <span className={styles.logoMark} />
//         </div>

//         <nav className={styles.nav}>
//           {user && (
//             <div className={styles.userBlock}>
//               <div className={styles.persona}>
//                 <div className={styles.personaAvatar}>
//                   {user.photoUrl ? (
//                     <img src={user.photoUrl} alt={user.displayName} />
//                   ) : (
//                     <span>{getInitial(user.displayName)}</span>
//                   )}
//                 </div>
//                 <div className={styles.personaText}>
//                   <div className={styles.personaName}>{user.displayName}</div>
//                   <div className={styles.personaGreeting}>{user.greeting}</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };


import * as React from "react";
import styles from "./Header.module.scss";
import { userService, IUserInfo } from "../../services/UserService";
import { isPnPjsInitialized } from "../../services/pnpjsConfig";

export interface IHeaderProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;  // This comes from web part - always available
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const [user, setUser] = React.useState<IUserInfo | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        // First, use props as immediate fallback (always works)
        const hour = new Date().getHours();
        let greeting = "Welcome back";
        if (hour < 12) greeting = "Good morning";
        else if (hour < 18) greeting = "Good afternoon";
        else greeting = "Good evening";

        // Set initial user from props immediately
        setUser({
          displayName: props.userDisplayName || "User",
          email: "",
          greeting: greeting,
          photoUrl: "",
          loginName: ""
        });
        setLoading(false);

        // Then try to get real data from SharePoint if PnPjs is ready
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }

        if (isPnPjsInitialized()) {
          const currentUser = await userService.getCurrentUser();
          if (currentUser && currentUser.displayName !== "User") {
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        // Keep the fallback user already set
      }
    };

    loadUser();
  }, [props.userDisplayName]);

  const getInitial = (name: string): string => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  if (loading) {
    return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.logoBox} aria-label="CIBC">
            <span className={styles.logoText}>CIBC</span>
            <span className={styles.logoMark} />
          </div>
          <nav className={styles.nav}>
            <div className={styles.userBlock}>
              <div className={styles.persona}>
                <div className={styles.personaAvatar}>
                  <span>...</span>
                </div>
                <div className={styles.personaText}>
                  <div className={styles.personaName}>Loading...</div>
                  <div className={styles.personaGreeting}>Please wait</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoBox} aria-label="CIBC">
          <span className={styles.logoText}>CIBC</span>
          <span className={styles.logoMark} />
        </div>

        <nav className={styles.nav}>
          {user && (
            <div className={styles.userBlock}>
              <div className={styles.persona}>
                <div className={styles.personaAvatar}>
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.displayName} />
                  ) : (
                    <span>{getInitial(user.displayName)}</span>
                  )}
                </div>
                <div className={styles.personaText}>
                  <div className={styles.personaName}>{user.displayName}</div>
                  <div className={styles.personaGreeting}>{user.greeting}</div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};