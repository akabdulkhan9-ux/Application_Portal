import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";

export interface IContactInfo {
  email: string;
  phone: string;
  office: string;
  poBox: string;
}

export class ContactInfoService {

  /**
   * Get active contact information from SharePoint
   * @param context - SPFx context for SharePoint connection
   * @returns Contact info or undefined if not found
   */
  public async getActiveContactInfo(context?: WebPartContext): Promise<IContactInfo | undefined> {
    try {
      const sp = getSP(context);
      if (!sp) return undefined;

      const items = await sp.web.lists.getByTitle("ContactInfo").items
        .filter("IsActive eq 1")
        .top(1)
        .select("Email", "Phone", "Office", "POBox")();

      if (items.length === 0) return undefined;
      
      const item = items[0];
      
      return {
        email: item.Email || "info@alubafbank.com",
        phone: item.Phone || "+973 1751 7722",
        office: item.Office || "ALUBAF Tower, Building 854, Road 3618, Avenue 436, Al Seef District, Kingdom of Bahrain",
        poBox: item.POBox || "P.O. Box 11529, Manama, Bahrain"
      };
    } catch {
      return undefined;
    }
  }
}

export const contactInfoService = new ContactInfoService();
