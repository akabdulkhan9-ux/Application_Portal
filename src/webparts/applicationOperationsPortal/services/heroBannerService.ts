// import { getSP } from "./pnpjsConfig";

// export interface IHeroBannerData {
//   id: string;
//   title: string;
//   paragraph: string;
//   imageUrl: string;
// }

// export class HeroBannerService {

//   /**
//    * ✅ Get image URL from item attachments (Same as Events)
//    */
//   private async getImageFromAttachments(itemId: number, context?: any): Promise<string> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return '';
      
//       const attachments = await sp.web.lists.getByTitle("HeroBanner").items.getById(itemId).attachmentFiles();
      
//       if (attachments && attachments.length > 0) {
//         const attachment = attachments[0];
//         const attachmentUrl = `${window.location.origin}${attachment.ServerRelativeUrl}`;
//         console.log(`✅ Found attachment for hero banner ${itemId}:`, attachmentUrl);
//         return attachmentUrl;
//       }
//     } catch (error) {
//       console.error(`Error getting attachments for hero banner ${itemId}:`, error);
//     }
//     return '';
//   }

//   public async getActiveHeroBanner(context?: any): Promise<IHeroBannerData | null> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return null;

//       const items = await sp.web.lists.getByTitle("HeroBanner").items
//         .filter("IsActive eq 1")
//         .orderBy("Order", true)
//         .top(1)
//         .select("Id", "Title", "Paragraph")();

//       if (items.length === 0) return null;
      
//       const item = items[0];
      
//       // ✅ Get image from attachments
//       const imageUrl = await this.getImageFromAttachments(item.Id, context);
      
//       return {
//         id: item.Id.toString(),
//         title: item.Title || "CEO Message",
//         paragraph: item.Paragraph || "",
//         imageUrl: imageUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
//       };
//     } catch (error) {
//       console.error("Error fetching hero banner:", error);
//       return null;
//     }
//   }
// }

// export const heroBannerService = new HeroBannerService();\


import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";

export interface IHeroBannerData {
  id: string;
  title: string;
  paragraph: string;
  imageUrl: string;
}

interface IHeroBannerListItem {
  Id: number;
  Title?: string;
  Paragraph?: string;
}

interface IAttachmentFile {
  ServerRelativeUrl: string;
}

export class HeroBannerService {

  /**
   * Get image URL from item attachments
   * @param itemId - SharePoint list item ID
   * @param context - SPFx context for SharePoint connection
   * @returns Image URL or empty string if no attachment found
   */
  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<string> {
    try {
      const sp = getSP(context);
      if (!sp) return '';
      
      const attachments = await sp.web.lists.getByTitle("HeroBanner").items.getById(itemId).attachmentFiles();
      
      if (attachments && attachments.length > 0) {
        const attachment = attachments[0] as IAttachmentFile;
        return `${window.location.origin}${attachment.ServerRelativeUrl}`;
      }
    } catch {
      // No attachment found - return empty string
    }
    return '';
  }

  /**
   * Get the active hero banner from SharePoint
   * Fetches only one item where IsActive = true, ordered by Order field
   * @param context - SPFx context for SharePoint connection
   * @returns Hero banner data or undefined if not found
   */
  public async getActiveHeroBanner(context?: WebPartContext): Promise<IHeroBannerData | undefined> {
    try {
      const sp = getSP(context);
      if (!sp) return undefined;

      const items = await sp.web.lists.getByTitle("HeroBanner").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .top(1)
        .select("Id", "Title", "Paragraph")() as IHeroBannerListItem[];

      if (items.length === 0) return undefined;
      
      const item = items[0];
      const imageUrl = await this.getImageFromAttachments(item.Id, context);
      
      return {
        id: item.Id.toString(),
        title: item.Title || "CEO Message",
        paragraph: item.Paragraph || "",
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
      };
    } catch {
      return undefined;
    }
  }
}

export const heroBannerService = new HeroBannerService();