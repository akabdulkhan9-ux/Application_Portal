// services/AllEventsService.ts
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
  day: string;
  monthYear: string;
}

export interface IAllEventsResult {
  items: IEvent[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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

// Cache for image URLs
let imageCache: Record<string, string> = {};

function getCachedImageUrl(cacheKey: string): string | undefined {
  return imageCache[cacheKey] || undefined;
}

function setCachedImageUrl(cacheKey: string, url: string): void {
  imageCache[cacheKey] = url;
}

export class AllEventsService {
  
//   private pageSize: number = 9;

  private formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

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

  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<string> {
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

    setCachedImageUrl(cacheKey, url);
    return url;
  }

  public async getAllEvents(
    context?: WebPartContext, 
    page: number = 1, 
    pageSize: number = 9
  ): Promise<IAllEventsResult> {
    try {
      const sp = getSP(context);
      if (!sp) {
        return this.getEmptyResult(page, pageSize);
      }

      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter("IsActive eq 1")
        .orderBy("EventDate", false)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime")() as IEventListItem[];

      if (items.length === 0) {
        return this.getEmptyResult(page, pageSize);
      }

      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageUrls = await Promise.all(imagePromises);

      const allEvents: IEvent[] = items.map((item, index: number) => ({
        id: item.Id.toString(),
        title: item.Title || "",
        location: item.Location || "",
        date: this.formatDate(item.EventDate ?? ""),
        time: this.formatTime(item.StartTime ?? "", item.EndTime ?? ""),
        imageUrl: imageUrls[index] || 'https://picsum.photos/id/20/800/500',
        description: "",
        day: this.formatDay(item.EventDate ?? ""),
        monthYear: this.formatMonthYear(item.EventDate ?? "")
      }));

      const totalCount = allEvents.length;
      const totalPages = Math.ceil(totalCount / pageSize);
      const currentPage = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalCount);
      const paginatedItems = allEvents.slice(startIndex, endIndex);

      return {
        items: paginatedItems,
        totalCount: totalCount,
        currentPage: currentPage,
        totalPages: totalPages,
        pageSize: pageSize,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      };

    } catch {
      return this.getEmptyResult(page, pageSize);
    }
  }

  private getEmptyResult(page: number, pageSize: number): IAllEventsResult {
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

export const allEventsService = new AllEventsService();
