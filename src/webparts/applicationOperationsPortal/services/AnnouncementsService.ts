

// import { getSP } from "./pnpjsConfig";

// export interface IAnnouncement {
//   id: string;
//   title: string;
//   description: string;
//   day: string;
//   monthYear: string;
//   imageUrl: string;
// }

// export class AnnouncementsService {
  
//   /**
//    * Format date to { day, monthYear } object
//    * Example: { day: "02", monthYear: "JAN 2024" }
//    */
//   private formatDate(dateString: string): { day: string; monthYear: string } {
//     if (!dateString) return { day: "01", monthYear: "JAN 2024" };
//     const date = new Date(dateString);
//     let day = date.getDate().toString();
//     if (day.length === 1) day = "0" + day;
//     const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
//     const year = date.getFullYear();
//     return { day, monthYear: `${month} ${year}` };
//   }

//   /**
//    * Format date to day only with leading zero
//    * Example: "02" for 2nd of month
//    */
//   private formatDay(dateString: string): string {
//     if (!dateString) return "01";
//     const date = new Date(dateString);
//     const day = date.getDate();
//     return day < 10 ? '0' + day : '' + day;
//   }

//   /**
//    * Format date to month and year only
//    * Example: "JAN 2024"
//    */
//   private formatMonthYear(dateString: string): string {
//     if (!dateString) return "JAN 2024";
//     const date = new Date(dateString);
//     const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
//     const year = date.getFullYear();
//     return month + ' ' + year;
//   }

//   /**
//    * Get image URL from item attachments
//    * @param itemId - SharePoint list item ID
//    * @param context - SPFx context for SharePoint connection
//    * @returns Image URL or placeholder if no attachment found
//    */
//   private async getImageFromAttachments(itemId: number, context?: any): Promise<string> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return '';
      
//       const attachments = await sp.web.lists.getByTitle("Announcements").items.getById(itemId).attachmentFiles();
      
//       if (attachments && attachments.length > 0) {
//         const attachment = attachments[0];
//         return `${window.location.origin}${attachment.ServerRelativeUrl}`;
//       }
//     } catch (error) {
//       // No attachment found - return empty string
//     }
//     return '';
//   }

//   /**
//    * Get top 3 active announcements for home page
//    * Filters by IsActive = true, ordered by AnnouncementDate descending
//    * @param context - SPFx context for SharePoint connection
//    * @returns Array of announcements (max 3)
//    */
//   public async getAnnouncements(context?: any): Promise<IAnnouncement[]> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return [];
      
//       const items = await sp.web.lists.getByTitle("Announcements").items
//         .filter("IsActive eq 1")
//         .orderBy("AnnouncementDate", false)
//         .top(3)
//         .select("Id", "Title", "Description", "AnnouncementDate")();

//       const results: IAnnouncement[] = [];
      
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         const formatted = this.formatDate(item.AnnouncementDate);
//         const imageUrl = await this.getImageFromAttachments(item.Id, context);
        
//         results.push({
//           id: item.Id.toString(),
//           title: item.Title || "",
//           description: item.Description || "",
//           day: formatted.day,
//           monthYear: formatted.monthYear,
//           imageUrl: imageUrl || 'https://picsum.photos/id/20/300/150'
//         });
//       }
//       return results;
//     } catch (error) {
//       return [];
//     }
//   }

//   /**
//    * Get all active announcements for the All Announcements page
//    * Filters by IsActive = true, ordered by AnnouncementDate descending
//    * @param context - SPFx context for SharePoint connection
//    * @returns Array of all active announcements
//    */
//   public async getAllAnnouncements(context?: any): Promise<IAnnouncement[]> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return [];

//       const items = await sp.web.lists.getByTitle("Announcements").items
//         .filter("IsActive eq 1")
//         .orderBy("AnnouncementDate", false)
//         .select("Id", "Title", "Description", "AnnouncementDate")();

//       const results: IAnnouncement[] = [];
      
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         const imageUrl = await this.getImageFromAttachments(item.Id, context);
        
//         results.push({
//           id: item.Id.toString(),
//           title: item.Title || "",
//           description: item.Description || "",
//           day: this.formatDay(item.AnnouncementDate),
//           monthYear: this.formatMonthYear(item.AnnouncementDate),
//           imageUrl: imageUrl || 'https://picsum.photos/id/20/300/150'
//         });
//       }
//       return results;
//     } catch (error) {
//       return [];
//     }
//   }

//   /**
//    * Get single announcement by ID for detail page
//    * @param id - Announcement ID to fetch
//    * @param context - SPFx context for SharePoint connection
//    * @returns Announcement data or null if not found
//    */
//   public async getAnnouncementById(id: string, context?: any): Promise<IAnnouncement | null> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return null;

//       const items = await sp.web.lists.getByTitle("Announcements").items
//         .filter(`Id eq ${id}`)
//         .select("Id", "Title", "Description", "AnnouncementDate")();

//       if (items.length === 0) return null;
      
//       const item = items[0];
//       const formatted = this.formatDate(item.AnnouncementDate);
//       const imageUrl = await this.getImageFromAttachments(parseInt(id), context);
      
//       return {
//         id: item.Id.toString(),
//         title: item.Title || "",
//         description: item.Description || "",
//         day: formatted.day,
//         monthYear: formatted.monthYear,
//         imageUrl: imageUrl || 'https://picsum.photos/id/20/300/150'
//       };
//     } catch (error) {
//       return null;
//     }
//   }
// }

// export const announcementsService = new AnnouncementsService();


import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";

export interface IAnnouncement {
  id: string;
  title: string;
  description: string;
  day: string;
  monthYear: string;
  imageUrl: string;
}

interface IAnnouncementListItem {
  Id: number;
  Title?: string;
  Description?: string;
  AnnouncementDate?: string;
}

interface IAttachmentFile {
  ServerRelativeUrl: string;
}

// ✅ Cache to store image URLs (prevents multiple API calls)
let imageCache: Record<string, string> = {};

function getCachedImageUrl(cacheKey: string): string | undefined {
  return imageCache[cacheKey] || undefined;
}

function setCachedImageUrl(cacheKey: string, url: string): void {
  imageCache[cacheKey] = url;
}

export class AnnouncementsService {
  
  /**
   * Format date to { day, monthYear } object
   * Example: { day: "02", monthYear: "JAN 2024" }
   */
  private formatDate(dateString: string): { day: string; monthYear: string } {
    if (!dateString) return { day: "01", monthYear: "JAN 2024" };
    const date = new Date(dateString);
    let day = date.getDate().toString();
    if (day.length === 1) day = "0" + day;
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, monthYear: `${month} ${year}` };
  }

  /**
   * Format date to day only with leading zero
   * Example: "02" for 2nd of month
   */
  private formatDay(dateString: string): string {
    if (!dateString) return "01";
    const date = new Date(dateString);
    const day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }

  /**
   * Format date to month and year only
   * Example: "JAN 2024"
   */
  private formatMonthYear(dateString: string): string {
    if (!dateString) return "JAN 2024";
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return month + ' ' + year;
  }

  /**
   * Get image URL from attachments (with caching)
   */
  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<string> {
    // ✅ Return from cache if already loaded
    const cacheKey = `announcement_${itemId}`;
    const cached = getCachedImageUrl(cacheKey);
    if (cached) {
      return cached;
    }

    const sp = getSP(context);
    if (!sp) return '';

    let url = '';
    try {
      const attachments = await sp.web.lists.getByTitle("Announcements").items.getById(itemId).attachmentFiles();

      if (attachments && attachments.length > 0) {
        const attachment = attachments[0] as IAttachmentFile;
        url = `${window.location.origin}${attachment.ServerRelativeUrl}`;
      }
    } catch {
      // No attachment found
    }

    // ✅ Store in cache to prevent re-fetching
    setCachedImageUrl(cacheKey, url);
    return url;
  }

  /**
   * Get top 3 active announcements for home page (OPTIMIZED - PARALLEL)
   */
  public async getAnnouncements(context?: WebPartContext): Promise<IAnnouncement[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];
      
      // 1. Get announcements (1 API call)
      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("AnnouncementDate", false)
        .top(3)
        .select("Id", "Title", "Description", "AnnouncementDate")() as IAnnouncementListItem[];

      if (items.length === 0) return [];

      // 2. ✅ Load ALL images in PARALLEL (not sequential)
      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls: string[] = await Promise.all(imagePromises);

      // 3. Combine data
      const results: IAnnouncement[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const formatted = this.formatDate(item.AnnouncementDate ?? "");
        
        results.push({
          id: item.Id.toString(),
          title: item.Title || "",
          description: item.Description || "",
          day: formatted.day,
          monthYear: formatted.monthYear,
          imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/300/150'
        });
      }
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Get all active announcements for the All Announcements page (OPTIMIZED - PARALLEL)
   */
  public async getAllAnnouncements(context?: WebPartContext): Promise<IAnnouncement[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("AnnouncementDate", false)
        .select("Id", "Title", "Description", "AnnouncementDate")() as IAnnouncementListItem[];

      if (items.length === 0) return [];

      // ✅ Load ALL images in PARALLEL
      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls: string[] = await Promise.all(imagePromises);

      const results: IAnnouncement[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        results.push({
          id: item.Id.toString(),
          title: item.Title || "",
          description: item.Description || "",
          day: this.formatDay(item.AnnouncementDate ?? ""),
          monthYear: this.formatMonthYear(item.AnnouncementDate ?? ""),
          imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/300/150'
        });
      }
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Get single announcement by ID for detail page (with cache)
   */
  public async getAnnouncementById(id: string, context?: WebPartContext): Promise<IAnnouncement | undefined> {
    try {
      const sp = getSP(context);
      if (!sp) return undefined;

      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter(`Id eq ${id}`)
        .select("Id", "Title", "Description", "AnnouncementDate")() as IAnnouncementListItem[];

      if (items.length === 0) return undefined;
      
      const item = items[0];
      const formatted = this.formatDate(item.AnnouncementDate ?? "");
      const imageUrl = await this.getImageFromAttachments(parseInt(id, 10), context);
      
      return {
        id: item.Id.toString(),
        title: item.Title || "",
        description: item.Description || "",
        day: formatted.day,
        monthYear: formatted.monthYear,
        imageUrl: imageUrl || 'https://picsum.photos/id/20/300/150'
      };
    } catch {
      return undefined;
    }
  }

  /**
   * Clear cache (useful after adding new images)
   */
  public clearCache(): void {
    imageCache = {};
  }
}

export const announcementsService = new AnnouncementsService();