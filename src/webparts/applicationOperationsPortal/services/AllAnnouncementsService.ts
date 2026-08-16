// services/AllAnnouncementsService.ts
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

export interface IAllAnnouncementsResult {
  items: IAnnouncement[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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

// Cache for image URLs
let imageCache: Record<string, string> = {};

function getCachedImageUrl(cacheKey: string): string | undefined {
  return imageCache[cacheKey] || undefined;
}

function setCachedImageUrl(cacheKey: string, url: string): void {
  imageCache[cacheKey] = url;
}

export class AllAnnouncementsService {
  
//   private pageSize: number = 9;

  private formatDay(dateString: string): string {
    if (!dateString) return "01";
    const date = new Date(dateString);
    const day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }

  private formatMonthYear(dateString: string): string {
    if (!dateString) return "JAN 2024";
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return month + ' ' + year;
  }

  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<string> {
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

    setCachedImageUrl(cacheKey, url);
    return url;
  }

  /**
   * Get all announcements with built-in pagination
   * @param context - SPFx context
   * @param page - Page number (1-based, default: 1)
   * @param pageSize - Items per page (default: 9)
   * @returns Paginated announcements with metadata
   */
  public async getAllAnnouncements(
    context?: WebPartContext, 
    page: number = 1, 
    pageSize: number = 9
  ): Promise<IAllAnnouncementsResult> {
    try {
      const sp = getSP(context);
      if (!sp) {
        return this.getEmptyResult(page, pageSize);
      }

      // Fetch all active announcements
      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("AnnouncementDate", false)
        .select("Id", "Title", "Description", "AnnouncementDate")() as IAnnouncementListItem[];

      if (items.length === 0) {
        return this.getEmptyResult(page, pageSize);
      }

      // Load all images in parallel
      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls = await Promise.all(imagePromises);

      // Transform all items
      const allAnnouncements: IAnnouncement[] = items.map((item, index: number) => ({
        id: item.Id.toString(),
        title: item.Title || "",
        description: item.Description || "",
        day: this.formatDay(item.AnnouncementDate ?? ""),
        monthYear: this.formatMonthYear(item.AnnouncementDate ?? ""),
        imageUrl: imageUrls[index] || 'https://picsum.photos/id/20/300/150'
      }));

      // Apply pagination
      const totalCount = allAnnouncements.length;
      const totalPages = Math.ceil(totalCount / pageSize);
      const currentPage = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalCount);
      const paginatedItems = allAnnouncements.slice(startIndex, endIndex);

      return {
        items: paginatedItems,
        totalCount: totalCount,
        currentPage: currentPage,
        totalPages: totalPages,
        pageSize: pageSize,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      };

    } catch (error) {
      console.error("Error fetching all announcements:", error);
      return this.getEmptyResult(page, pageSize);
    }
  }

  /**
   * Get top 3 announcements for home page
   */
  public async getTopAnnouncements(context?: WebPartContext): Promise<IAnnouncement[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("AnnouncementDate", false)
        .top(3)
        .select("Id", "Title", "Description", "AnnouncementDate")() as IAnnouncementListItem[];

      if (items.length === 0) return [];

      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls = await Promise.all(imagePromises);

      return items.map((item, index: number) => ({
        id: item.Id.toString(),
        title: item.Title || "",
        description: item.Description || "",
        day: this.formatDay(item.AnnouncementDate ?? ""),
        monthYear: this.formatMonthYear(item.AnnouncementDate ?? ""),
        imageUrl: imageUrls[index] || 'https://picsum.photos/id/20/300/150'
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get single announcement by ID
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
      const imageUrl = await this.getImageFromAttachments(parseInt(id, 10), context);
      
      return {
        id: item.Id.toString(),
        title: item.Title || "",
        description: item.Description || "",
        day: this.formatDay(item.AnnouncementDate ?? ""),
        monthYear: this.formatMonthYear(item.AnnouncementDate ?? ""),
        imageUrl: imageUrl || 'https://picsum.photos/id/20/300/150'
      };
    } catch {
      return undefined;
    }
  }

  private getEmptyResult(page: number, pageSize: number): IAllAnnouncementsResult {
    return {
      items: [],
      totalCount: 0,
      currentPage: page,
      totalPages: 0,
      pageSize: pageSize,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }

  public clearCache(): void {
    imageCache = {};
  }
}

export const allAnnouncementsService = new AllAnnouncementsService();
