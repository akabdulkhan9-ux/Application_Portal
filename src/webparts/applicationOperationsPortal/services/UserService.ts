

export interface IUserInfo {
  displayName: string;
  email: string;
  greeting: string;
  photoUrl?: string;
  loginName: string;
}

export class UserService {
  
  public async getCurrentUser(): Promise<IUserInfo> {
    try {
      // Use direct REST API instead of PnPjs
      const response = await fetch(`${window.location.origin}/_api/web/currentUser`, {
        method: "GET",
        headers: {
          "Accept": "application/json;odata=verbose"
        },
        credentials: "same-origin"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const userData = data.d;
      
      const hour = new Date().getHours();
      let greeting = "Welcome back";
      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";
      else greeting = "Good evening";

      return {
        displayName: userData.Title || userData.LoginName?.split('|').pop() || "User",
        email: userData.Email || "",
        greeting: greeting,
        photoUrl: "",
        loginName: userData.LoginName || ""
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return {
        displayName: "User",
        email: "",
        greeting: "Welcome back",
        photoUrl: "",
        loginName: ""
      };
    }
  }
}

export const userService = new UserService();