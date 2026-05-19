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
  
//   private formatDate(dateString: string): { day: string; monthYear: string } {
//     const date = new Date(dateString);
//     let day = date.getDate().toString();
//     if (day.length === 1) day = "0" + day;
//     const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
//     const year = date.getFullYear();
//     return { day, monthYear: `${month} ${year}` };
//   }

//   public async getAnnouncements(): Promise<IAnnouncement[]> {
//     try {
//       const sp = getSP();
//       if (!sp) return [];
      
//       const items = await sp.web.lists.getByTitle("Announcements").items
//         .filter("IsActive eq 1")
//         .orderBy("Order", true)
//         .orderBy("AnnouncementDate", false)
//         .top(3)
//         .select("Id", "Title", "Description", "AnnouncementDate", "ImageUrl")();

//       return items.map((item: any) => {
//         const { day, monthYear } = this.formatDate(item.AnnouncementDate);
//         return {
//           id: item.Id.toString(),
//           title: item.Title,
//           description: item.Description,
//           day: day,
//           monthYear: monthYear,
//           imageUrl: item.ImageUrl?.Url || ""
//         };
//       });
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//       return [];
//     }
//   }
// }



// export const announcementsService = new AnnouncementsService();



import { getSP } from "./pnpjsConfig";

export interface IAnnouncement {
  id: string;
  title: string;
  description: string;
  day: string;
  monthYear: string;
  imageUrl: string;
}

export class AnnouncementsService {
  
  private formatDate(dateString: string): { day: string; monthYear: string } {
    const date = new Date(dateString);
    let day = date.getDate().toString();
    if (day.length === 1) day = "0" + day;
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, monthYear: `${month} ${year}` };
  }

  private formatDay(dateString: string): string {
    var date = new Date(dateString);
    var day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }

  private formatMonthYear(dateString: string): string {
    var date = new Date(dateString);
    var month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    var year = date.getFullYear();
    return month + ' ' + year;
  }

  public async getAnnouncements(): Promise<IAnnouncement[]> {
    try {
      const sp = getSP();
      if (!sp) return [];
      
      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .orderBy("AnnouncementDate", false)
        .top(3)
        .select("Id", "Title", "Description", "AnnouncementDate", "ImageUrl")();

      var result: IAnnouncement[] = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var formatted = this.formatDate(item.AnnouncementDate);
        result.push({
          id: item.Id.toString(),
          title: item.Title,
          description: item.Description,
          day: formatted.day,
          monthYear: formatted.monthYear,
          imageUrl: item.ImageUrl?.Url || ""
        });
      }
      return result;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      return [];
    }
  }

  public async getAllAnnouncements(): Promise<IAnnouncement[]> {
    try {
      const sp = getSP();
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("Announcements").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .orderBy("AnnouncementDate", false)
        .select("Id", "Title", "Description", "AnnouncementDate", "ImageUrl")();

      var result: IAnnouncement[] = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var day = this.formatDay(item.AnnouncementDate);
        var monthYear = this.formatMonthYear(item.AnnouncementDate);
        
        result.push({
          id: item.Id.toString(),
          title: item.Title,
          description: item.Description,
          day: day,
          monthYear: monthYear,
          imageUrl: item.ImageUrl?.Url || ""
        });
      }
      return result;
    } catch (error) {
      console.error("Error fetching all announcements:", error);
      return [];
    }
  }
}

export const announcementsService = new AnnouncementsService();