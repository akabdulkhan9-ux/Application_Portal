import * as React from "react";
import styles from "./Header.module.scss";
import { userService, IUserInfo } from "../../services/UserService";
import { isPnPjsInitialized } from "../../services/pnpjsConfig";

export interface IHeaderProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const [user, setUser] = React.useState<IUserInfo | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadUser = async (): Promise<void> => {
      try {
        const hour = new Date().getHours();
        let greeting = "Welcome back";
        if (hour < 12) greeting = "Good morning";
        else if (hour < 18) greeting = "Good afternoon";
        else greeting = "Good evening";

        setUser({
          displayName: props.userDisplayName || "User",
          email: "",
          greeting: greeting,
          photoUrl: "",
          loginName: ""
        });
        setLoading(false);

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
      }
    };

    loadUser().catch((): void => undefined);
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