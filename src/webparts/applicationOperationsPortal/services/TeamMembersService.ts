

// import { getSP } from "./pnpjsConfig";

// export interface ITeamMember {
//   id: string;
//   name: string;
//   role: string;
//   email?: string;
//   phone?: string;
//   department?: string;
//   profileImageUrl: string;
// }

// // ✅ Cache: Stores image URLs after first load (memory)
// // Prevents fetching same image multiple times
// let imageCache: Record<string, string> = {};

// export class TeamMembersService {

//   /**
//    * Get image URL from attachments (with caching)
//    */
//   private async getImageFromAttachments(itemId: number, context?: any): Promise<string> {
//     // Step 1: Check cache first - if already loaded, return immediately
//     const cacheKey = `member_${itemId}`;
//     if (imageCache[cacheKey]) {
//       return imageCache[cacheKey];  // Fast path: no API call
//     }
    
//     try {
//       const sp = getSP(context);
//       if (!sp) return '';
      
//       // Step 2: Fetch attachments for this member (1 API call per member)
//       const attachments = await sp.web.lists.getByTitle("TeamMembers").items.getById(itemId).attachmentFiles();
      
//       // Step 3: If attachment exists, build full URL and save to cache
//       if (attachments && attachments.length > 0) {
//         const attachment = attachments[0];
//         const attachmentUrl = `${window.location.origin}${attachment.ServerRelativeUrl}`;
//         imageCache[cacheKey] = attachmentUrl;  // Save for next time
//         return attachmentUrl;
//       }
//     } catch (error) {
//       // No attachment found
//     }
    
//     // Step 4: No image exists - cache empty string (prevents future retries)
//     imageCache[cacheKey] = '';
//     return '';
//   }

//   /**
//    * Get all team members in PARALLEL (fast!)
//    */
//   public async getTeamMembers(context?: any): Promise<ITeamMember[]> {
//     try {
//       const sp = getSP(context);
//       if (!sp) return [];

//       // Step 1: Fetch all members (ONLY 1 API call)
//       const items: any[] = await sp.web.lists.getByTitle("TeamMembers").items
//         .filter("IsActive eq 1")
//         .orderBy("Order", true)
//         .select("Id", "FullName", "Title", "Role", "Email", "Phone", "Department")();

//       // Step 2: 🔥 KEY TECHNIQUE - Load ALL images simultaneously using Promise.all
//       // Creates array of promises (1 per member) and waits for ALL to complete
//       const imagePromises = items.map((item: any) => 
//         this.getImageFromAttachments(item.Id, context)
//       );
//       const imageUrls: string[] = await Promise.all(imagePromises);  // All at once!

//       // Step 3: Combine member data with their image URLs
//       const results: ITeamMember[] = [];
//       for (let i = 0; i < items.length; i++) {
//         const item: any = items[i];
//         const personName = item.FullName || item.Title || "Unknown";
        
//         results.push({
//           id: item.Id.toString(),
//           name: personName,
//           role: item.Role || "",
//           email: item.Email || "",
//           phone: item.Phone || "",
//           department: item.Department || "",
//           profileImageUrl: imageUrls[i]  // Already fetched URL
//         });
//       }
      
//       return results;
//     } catch (error) {
//       return [];
//     }
//   }

//   /**
//    * Clear cache (useful after adding new images)
//    */
//   public clearCache(): void {
//     imageCache = {};
//   }
// }

// export const teamMembersService = new TeamMembersService();


import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  department?: string;
  profileImageUrl: string;   // Original image
  thumbnailUrl: string;       // Thumbnail for list (80x80)
  popupImageUrl: string;      // ✅ 800px for popup - CRYSTAL CLEAR!
}

interface ITeamMemberListItem {
  Id: number;
  FullName?: string;
  Title?: string;
  Role?: string;
  Email?: string;
  Phone?: string;
  Department?: string;
}

interface IAttachmentFile {
  ServerRelativeUrl: string;
}

interface IMemberImageUrls {
  original: string;
  thumbnail: string;
  popup: string;
}

const emptyMemberImages: IMemberImageUrls = { original: '', thumbnail: '', popup: '' };

let imageCache: Record<string, IMemberImageUrls> = {};

function getCachedMemberImages(cacheKey: string): IMemberImageUrls | undefined {
  return imageCache[cacheKey];
}

function setCachedMemberImages(cacheKey: string, images: IMemberImageUrls): void {
  imageCache[cacheKey] = images;
}

export class TeamMembersService {

  private async getImageFromAttachments(itemId: number, context?: WebPartContext): Promise<IMemberImageUrls> {
    const cacheKey = `member_${itemId}`;
    const cached = getCachedMemberImages(cacheKey);
    if (cached) {
      return cached;
    }

    const sp = getSP(context);
    if (!sp) return emptyMemberImages;

    let result = emptyMemberImages;
    try {
      const attachments = await sp.web.lists.getByTitle("TeamMembers").items.getById(itemId).attachmentFiles();

      if (attachments && attachments.length > 0) {
        const attachment = attachments[0] as IAttachmentFile;
        const originalUrl = `${window.location.origin}${attachment.ServerRelativeUrl}`;

        // Thumbnail for list (80x80)
        const thumbnailUrl = `${originalUrl}?width=80&height=80&crop=1`;

        // ✅ 800px for popup - CRYSTAL CLEAR QUALITY
        const popupUrl = `${originalUrl}?width=800&height=800&crop=1`;

        result = { original: originalUrl, thumbnail: thumbnailUrl, popup: popupUrl };
      }
    } catch {
      // No attachment found
    }

    setCachedMemberImages(cacheKey, result);
    return result;
  }

  public async getTeamMembers(context?: WebPartContext): Promise<ITeamMember[]> {
    try {
      const sp = getSP(context);
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("TeamMembers").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .select("Id", "FullName", "Title", "Role", "Email", "Phone", "Department")() as ITeamMemberListItem[];

      const imagePromises = items.map((item) => 
        this.getImageFromAttachments(item.Id, context)
      );
      const imageResults = await Promise.all(imagePromises);

      const results: ITeamMember[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const personName = item.FullName || item.Title || "Unknown";
        
        results.push({
          id: item.Id.toString(),
          name: personName,
          role: item.Role || "",
          email: item.Email || "",
          phone: item.Phone || "",
          department: item.Department || "",
          profileImageUrl: imageResults[i].original,
          thumbnailUrl: imageResults[i].thumbnail,
          popupImageUrl: imageResults[i].popup       // ✅ 800px image
        });
      }
      return results;
    } catch {
      return [];
    }
  }

  public clearCache(): void {
    imageCache = {};
  }
}

export const teamMembersService = new TeamMembersService();