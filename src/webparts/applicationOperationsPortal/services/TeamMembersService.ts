import { getSP } from "./pnpjsConfig";

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  avatarUrl?: string;
}

export class TeamMembersService {
  
  /**
   * Get all active team members from SharePoint list
   */
  public async getTeamMembers(): Promise<ITeamMember[]> {
    try {
      const sp = getSP();
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("TeamMembers").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .select(
          "Id",
          "FullName",
          "Role",
          "Email",
          "Phone",
          "Department",
          "AvatarUrl"
        )();

      return items.map((item: any) => ({
        id: item.Id.toString(),
        name: item.FullName || "",
        role: item.Role || "",
        email: item.Email || "",
        phone: item.Phone || "",
        department: item.Department || "",
        avatarUrl: item.AvatarUrl?.Url || ""
      }));
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  }
}

export const teamMembersService = new TeamMembersService();