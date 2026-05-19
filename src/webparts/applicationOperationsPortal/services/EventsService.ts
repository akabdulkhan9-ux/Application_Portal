// import { getSP } from "./pnpjsConfig";

// export interface IEvent {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   time: string;
//   imageUrl: string;
// }

// export class EventsService {
//   /**
//    * Format date to display format (e.g., "05 July 2024")
//    */
//   private formatDate(dateString: string): string {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'long' });
//     const year = date.getFullYear();
//     return `${day} ${month} ${year}`;
//   }

//   /**
//    * Format time from StartTime and EndTime (e.g., "11:00 AM - 12:00 PM")
//    */
//   private formatTime(startTime: string, endTime: string): string {
//     const start = new Date(startTime);
//     const end = new Date(endTime);
    
//     const formatTime12 = (date: Date): string => {
//       let hours = date.getHours();
//       const minutes = date.getMinutes();
//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12;
//       hours = hours ? hours : 12;
//       const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
//       return `${hours}:${minutesStr} ${ampm}`;
//     };
    
//     return `${formatTime12(start)} - ${formatTime12(end)}`;
//   }

//   /**
//    * Get top 3 active events from SharePoint list
//    */
//   public async getEvents(): Promise<IEvent[]> {
//     try {
//       const sp = getSP();
//       if (!sp) return [];

//       const items = await sp.web.lists.getByTitle("EventsList").items
//         .filter("IsActive eq 1")
//         // .orderBy("Order", true)
//         .orderBy("EventDate", false)
//         .top(3)
//         .select(
//           "Id",
//           "Title",
//           "Location",
//           "EventDate",
//           "StartTime",
//           "EndTime",
//           "ImageUrl"
//         )();

//       return items.map((item: any) => {
//         return {
//           id: item.Id.toString(),
//           title: item.Title,
//           location: item.Location || "",
//           date: this.formatDate(item.EventDate),
//           time: this.formatTime(item.StartTime, item.EndTime),
//           imageUrl: item.ImageUrl?.Url || ""
//         };
//       });
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       return [];
//     }
//   }
// }

// export const eventsService = new EventsService();


import { getSP } from "./pnpjsConfig";

export interface IEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  description?: string;
}

export class EventsService {
  
  private formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  private formatTime(startTime: string, endTime: string): string {
    if (!startTime || !endTime) return "";
    
    const formatTime12 = function(dateTimeStr: string): string {
      var date = new Date(dateTimeStr);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutesStr + ' ' + ampm;
    };
    
    return formatTime12(startTime) + ' - ' + formatTime12(endTime);
  }

  public async getEvents(): Promise<IEvent[]> {
    try {
      const sp = getSP();
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .orderBy("EventDate", false)
        .top(3)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime", "ImageUrl")();

      var result: IEvent[] = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        result.push({
          id: item.Id.toString(),
          title: item.Title || "",
          location: item.Location || "",
          date: this.formatDate(item.EventDate),
          time: this.formatTime(item.StartTime, item.EndTime),
          imageUrl: item.ImageUrl ? item.ImageUrl.Url : "",
          description: ""
        });
      }
      return result;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }

  public async getAllEvents(): Promise<IEvent[]> {
    try {
      const sp = getSP();
      if (!sp) return [];

      const items = await sp.web.lists.getByTitle("EventsList").items
        .filter("IsActive eq 1")
        .orderBy("Order", true)
        .orderBy("EventDate", false)
        .select("Id", "Title", "Location", "EventDate", "StartTime", "EndTime", "ImageUrl")();

      var result: IEvent[] = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        result.push({
          id: item.Id.toString(),
          title: item.Title || "",
          location: item.Location || "",
          date: this.formatDate(item.EventDate),
          time: this.formatTime(item.StartTime, item.EndTime),
          imageUrl: item.ImageUrl ? item.ImageUrl.Url : "",
          description: ""
        });
      }
      return result;
    } catch (error) {
      console.error("Error fetching all events:", error);
      return [];
    }
  }
}

export const eventsService = new EventsService();