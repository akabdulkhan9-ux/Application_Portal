


// import { getSP } from "./pnpjsConfig";

// export interface IEvent {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   time: string;
//   imageUrl: string;
//   description?: string;
// }

// // ✅ Cache to store image URLs (prevents multiple API calls)
// let imageCache: Record<string, string> = {};

// export class EventsService {
  
//   /**
//    * Format ISO date string to "DD Month YYYY" format
//    */
//   private formatDate(dateString: string): string {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'long' });
//     const year = date.getFullYear();
//     return `${day} ${month} ${year}`;
//   }

//   /**
//    * Format time from ISO string to 12-hour format
//    */
//   private formatTime(startTime: string, endTime: string): string {
//     if (!startTime || !endTime) return "";
    
//     const formatTime12 = (dateTimeStr: string): string => {
//       const date = new Date(dateTimeStr);
//       let hours = date.getHours();
//       const minutes = date.getMinutes();
//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12;
//       hours = hours ? hours : 12;
//       const minutesStr = minutes < 10 ? '0' + minutes : minutes;
//       return `${hours}:${minutesStr} ${ampm}`;
//     };
    
//     return `${formatTime12(startTime)} - ${formatTime12(endTime)}`;
//   }

//   /**
//    * Get image URL from attachments (with caching)
//    */
//   private async getImageFromAttachments(itemId: number, context?: any): Promise<string> {
//     // ✅ Return from cache if already loaded
//     const cacheKey = `event_${itemId}`;
//     if (imageCache[cacheKey]) {
//       return imageCache[cacheKey];
//     }
    
//     try {
//       const sp = getSP(context);
//       if (!sp) return '';
      
//       const attachments = await sp.web.lists.getByTitle("EventsList").items.getById(itemId).attachmentFiles();
      
//       if (attachments && attachments.length > 0) {
//         const attachment = attachments[0];
//         const attachmentUrl = `${window.location.origin}${attachment.ServerRelativeUrl}`;
//         // ✅ Store in cache
//         imageCache[cacheKey] = attachmentUrl;
//         return attachmentUrl;
//       }
//     } catch (error) {
//       // No attachment found
//     }
    
//     // ✅ Store empty string in cache to prevent re-fetching
//     imageCache[cacheKey] = '';
//     return '';
//   }

//   /**
//    * Get top 3 active events for home page (OPTIMIZED - PARALLEL)
//    */
//   public async getEvents(context?: any): Promise<IEvent[]> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return [];

//       // 1. Get events (1 API call)
//       const items = await sp.web.lists.getByTitle("EventsList").items
//         .filter("IsActive eq 1")
//         .orderBy("EventDate", false)
//         .top(3)
//         .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")();

//       if (items.length === 0) return [];

//       // 2. ✅ Load ALL images in PARALLEL (not sequential)
//       const imagePromises = items.map((item: any) => 
//         this.getImageFromAttachments(item.Id, context)
//       );
//       const imageUrls: string[] = await Promise.all(imagePromises);

//       // 3. Combine data
//       const results: IEvent[] = [];
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         results.push({
//           id: item.Id.toString(),
//           title: item.Title || "",
//           location: item.Location || "",
//           date: this.formatDate(item.EventDate),
//           time: this.formatTime(item.StartTime, item.EndTime),
//           imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/800/500',
//           description: ""
//         });
//       }
//       return results;
//     } catch (error) {
//       return [];
//     }
//   }

//   /**
//    * Get all active events (OPTIMIZED - PARALLEL)
//    */
//   public async getAllEvents(context?: any): Promise<IEvent[]> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return [];

//       const items = await sp.web.lists.getByTitle("EventsList").items
//         .filter("IsActive eq 1")
//         .orderBy("EventDate", false)
//         .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")();

//       if (items.length === 0) return [];

//       // ✅ Load ALL images in PARALLEL
//       const imagePromises = items.map((item: any) => 
//         this.getImageFromAttachments(item.Id, context)
//       );
//       const imageUrls: string[] = await Promise.all(imagePromises);

//       const results: IEvent[] = [];
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         results.push({
//           id: item.Id.toString(),
//           title: item.Title || "",
//           location: item.Location || "",
//           date: this.formatDate(item.EventDate),
//           time: this.formatTime(item.StartTime, item.EndTime),
//           imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/800/500',
//           description: ""
//         });
//       }
//       return results;
//     } catch (error) {
//       return [];
//     }
//   }

//   /**
//    * Get single event by ID (with cache)
//    */
//   public async getEventById(id: string, context?: any): Promise<IEvent | null> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return null;

//       const items = await sp.web.lists.getByTitle("EventsList").items
//         .filter(`Id eq ${id}`)
//         .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")();

//       if (items.length === 0) return null;
      
//       const item = items[0];
//       const imageUrl = await this.getImageFromAttachments(parseInt(id), context);
      
//       return {
//         id: item.Id.toString(),
//         title: item.Title || "",
//         location: item.Location || "",
//         date: this.formatDate(item.EventDate),
//         time: this.formatTime(item.StartTime, item.EndTime),
//         imageUrl: imageUrl || 'https://picsum.photos/id/20/800/500',
//         description: ""
//       };
//     } catch (error) {
//       return null;
//     }
//   }

//   /**
//    * Clear cache (useful after adding new images)
//    */
//   public clearCache(): void {
//     imageCache = {};
//   }
// }

// export const eventsService = new EventsService();

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";

export interface IEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  description?: string;
  day: string;        // ✅ ADDED - for date badge
  monthYear: string;  // ✅ ADDED - for date badge
}

interface IEventListItem {
  Id: number;
  Title?: string;
  Location?: string;
  EventDate?: string;
  StartTime?: string;
  EndTime?: string;
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

export class EventsService {
  
  /**
   * Format ISO date string to "DD Month YYYY" format
   */
  private formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  /**
   * ✅ Format day for date badge (e.g., "05")
   */
  private formatDay(dateString: string): string {
    if (!dateString) return "01";
    const date = new Date(dateString);
    const day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }

  /**
   * ✅ Format month and year for date badge (e.g., "JUL 2024")
   */
  private formatMonthYear(dateString: string): string {
    if (!dateString) return "JAN 2024";
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return month + ' ' + year;
  }

  /**
   * Format time from ISO string to 12-hour format
   */
  private formatTime(startTime: string, endTime: string): string {
    if (!startTime || !endTime) return "";
    
    const formatTime12 = (dateTimeStr: string): string => {
      const date = new Date(dateTimeStr);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    };
    
    return `${formatTime12(startTime)} - ${formatTime12(endTime)}`;
  }

  /**
   * Get image URL from attachments (with caching)
   */
  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<string> {
    // ✅ Return from cache if already loaded
    const cacheKey = `event_${itemId}`;
    const cached = getCachedImageUrl(cacheKey);
    if (cached) {
      return cached;
    }

    const sp = getSP(context);
    if (!sp) return '';

    let url = '';
    try {
      const attachments = await sp.web.lists.getByTitle("EventsList").items.getById(itemId).attachmentFiles();

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
   * Get top 3 active events for home page (OPTIMIZED - PARALLEL)
   */
  public async getEvents(context?: WebPartContext): Promise<IEvent[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];

      // 1. Get events (1 API call)
      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter("IsActive eq 1")
        .orderBy("EventDate", false)
        .top(3)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")() as IEventListItem[];

      if (items.length === 0) return [];

      // 2. ✅ Load ALL images in PARALLEL (not sequential)
      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls: string[] = await Promise.all(imagePromises);

      // 3. Combine data
      const results: IEvent[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        results.push({
          id: item.Id.toString(),
          title: item.Title || "",
          location: item.Location || "",
          date: this.formatDate(item.EventDate ?? ""),
          time: this.formatTime(item.StartTime ?? "", item.EndTime ?? ""),
          imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/800/500',
          description: "",
          day: this.formatDay(item.EventDate ?? ""),           // ✅ ADDED
          monthYear: this.formatMonthYear(item.EventDate ?? "") // ✅ ADDED
        });
      }
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Get all active events (OPTIMIZED - PARALLEL)
   * NOTE: This is kept for backward compatibility
   * For All Events page, use AllEventsService instead
   */
  public async getAllEvents(context?: WebPartContext): Promise<IEvent[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter("IsActive eq 1")
        .orderBy("EventDate", false)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")() as IEventListItem[];

      if (items.length === 0) return [];

      // ✅ Load ALL images in PARALLEL
      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls: string[] = await Promise.all(imagePromises);

      const results: IEvent[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        results.push({
          id: item.Id.toString(),
          title: item.Title || "",
          location: item.Location || "",
          date: this.formatDate(item.EventDate ?? ""),
          time: this.formatTime(item.StartTime ?? "", item.EndTime ?? ""),
          imageUrl: imageUrls[i] || 'https://picsum.photos/id/20/800/500',
          description: "",
          day: this.formatDay(item.EventDate ?? ""),           // ✅ ADDED
          monthYear: this.formatMonthYear(item.EventDate ?? "") // ✅ ADDED
        });
      }
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Get single event by ID (with cache)
   */
  public async getEventById(id: string, context?: WebPartContext): Promise<IEvent | undefined> {
    try {
      const sp = getSP(context);
      if (!sp) return undefined;

      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter(`Id eq ${id}`)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")() as IEventListItem[];

      if (items.length === 0) return undefined;
      
      const item = items[0];
      const imageUrl = await this.getImageFromAttachments(parseInt(id, 10), context);
      
      return {
        id: item.Id.toString(),
        title: item.Title || "",
        location: item.Location || "",
        date: this.formatDate(item.EventDate ?? ""),
        time: this.formatTime(item.StartTime ?? "", item.EndTime ?? ""),
        imageUrl: imageUrl || 'https://picsum.photos/id/20/800/500',
        description: "",
        day: this.formatDay(item.EventDate ?? ""),           // ✅ ADDED
        monthYear: this.formatMonthYear(item.EventDate ?? "") // ✅ ADDED
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

export const eventsService = new EventsService();