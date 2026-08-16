

// // src/webparts/applicationOperationsPortal/services/EmployeeWishesService.ts

// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { getSP } from "./pnpjsConfig";

// export interface IWishItem {
//   Id: string;
//   Title: string;
//   EmployeeId: string;
//   EmployeeName: string;
//   WishType: string;
//   Message: string;
//   SenderName: string;
//   SenderEmail: string;
//   Created: Date;
// }

// const WISHES_LIST_NAME = "EmployeeWishes";

// class EmployeeWishesService {
//   private getWeb() {
//     return getSP().web;
//   }

//   /**
//    * ✅ Get wishes by type AND employee name (only for specific employee)
//    */
//   public async getWishesByTypeAndEmployee(
//     wishType: string,
//     employeeName: string
//   ): Promise<IWishItem[]> {
//     try {
//       const items: any[] = await this.getWeb()
//         .lists.getByTitle(WISHES_LIST_NAME)
//         .items
//         .filter(
//           `WishType eq '${wishType}' and EmployeeName eq '${employeeName}'`
//         )
//         .select(
//           "Id",
//           "Title",
//           "EmployeeId",
//           "EmployeeName",
//           "WishType",
//           "Message",
//           "SenderName",
//           "SenderEmail",
//           "Created"
//         )
//         .orderBy("Created", false)
//         .top(500)();

//       return items.map((item) => ({
//         Id: item.Id.toString(),
//         Title: item.Title || "",
//         EmployeeId: item.EmployeeId || "",
//         EmployeeName: item.EmployeeName || "",
//         WishType: item.WishType || "",
//         Message: item.Message || "",
//         SenderName: item.SenderName || "",
//         SenderEmail: item.SenderEmail || "",
//         Created: new Date(item.Created)
//       }));
//     } catch (error) {
//       console.error("Error fetching wishes by type and employee:", error);
//       return [];
//     }
//   }

//   /**
//    * ✅ Get wishes by employee name only (for current user)
//    */
//   public async getWishesByEmployeeName(employeeName: string): Promise<IWishItem[]> {
//     try {
//       const items: any[] = await this.getWeb()
//         .lists.getByTitle(WISHES_LIST_NAME)
//         .items
//         .filter(`EmployeeName eq '${employeeName}'`)
//         .select(
//           "Id",
//           "Title",
//           "EmployeeId",
//           "EmployeeName",
//           "WishType",
//           "Message",
//           "SenderName",
//           "SenderEmail",
//           "Created"
//         )
//         .orderBy("Created", false)
//         .top(500)();

//       return items.map((item) => ({
//         Id: item.Id.toString(),
//         Title: item.Title || "",
//         EmployeeId: item.EmployeeId || "",
//         EmployeeName: item.EmployeeName || "",
//         WishType: item.WishType || "",
//         Message: item.Message || "",
//         SenderName: item.SenderName || "",
//         SenderEmail: item.SenderEmail || "",
//         Created: new Date(item.Created)
//       }));
//     } catch (error) {
//       console.error("Error fetching wishes by employee:", error);
//       return [];
//     }
//   }

//   /**
//    * ✅ Save a wish
//    */
//   public async saveWish(
//     employeeId: string,
//     employeeName: string,
//     wishType: string,
//     message: string,
//     senderName: string,
//     senderEmail: string
//   ): Promise<boolean> {
//     try {
//       const result = await this.getWeb()
//         .lists.getByTitle(WISHES_LIST_NAME)
//         .items.add({
//           Title: `Wish for ${employeeName}`,
//           EmployeeId: employeeId,
//           EmployeeName: employeeName,
//           WishType: wishType,
//           Message: message,
//           SenderName: senderName,
//           SenderEmail: senderEmail
//         });

//       console.log("Wish saved successfully:", result);
//       return true;
//     } catch (error) {
//       console.error("Error saving wish:", error);
//       return false;
//     }
//   }
// }

// export const employeeWishesService = new EmployeeWishesService();


// src/webparts/applicationOperationsPortal/services/EmployeeWishesService.ts

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getSP } from "./pnpjsConfig"; // ⚠️ adjust to match your project's SPFI accessor

export type WishType = "Birthday" | "Anniversary";

export interface IWishItem {
  Id: string;
  Title: string;
  EmployeeId: string;
  EmployeeName: string;
  WishType: WishType;
  Message: string;
  SenderName: string;
  SenderEmail: string;
  Created: Date;
}

const WISHES_LIST_NAME = "EmployeeWishes";

interface IRawWishListItem {
  Id: number;
  Title?: string;
  EmployeeId?: string;
  EmployeeName?: string;
  WishType?: string;
  Message?: string;
  SenderName?: string;
  SenderEmail?: string;
  Created: string;
}

const mapItem = (item: IRawWishListItem): IWishItem => ({
  Id: item.Id.toString(),
  Title: item.Title || "",
  EmployeeId: item.EmployeeId || "",
  EmployeeName: item.EmployeeName || "",
  WishType: item.WishType === "Birthday" || item.WishType === "Anniversary" ? item.WishType : "Birthday",
  Message: item.Message || "",
  SenderName: item.SenderName || "",
  SenderEmail: item.SenderEmail || "",
  Created: new Date(item.Created),
});

class EmployeeWishesService {
  private getWeb(): NonNullable<ReturnType<typeof getSP>>["web"] {
    const sp = getSP();
    if (!sp) {
      throw new Error("PnPjs not initialized");
    }
    return sp.web;
  }

  /**
   * Wishes of ONE type (Birthday or Anniversary) sent to ONE employee,
   * matched by EmployeeId (not name — names can differ by spacing/case,
   * IDs are stable). Used for the "Recent Wishes" preview.
   */
  public async getWishesForEmployee(employeeId: string, wishType: WishType, top: number = 5): Promise<IWishItem[]> {
    if (!employeeId) {
      return [];
    }
    try {
      const items: IRawWishListItem[] = await this.getWeb()
        .lists.getByTitle(WISHES_LIST_NAME)
        .items.filter(`EmployeeId eq '${employeeId}' and WishType eq '${wishType}'`)
        .select("Id", "Title", "EmployeeId", "EmployeeName", "WishType", "Message", "SenderName", "SenderEmail", "Created")
        .orderBy("Created", false)
        .top(top)();

      return items.map(mapItem);
    } catch (error) {
      console.error("Error fetching wishes for employee:", error);
      return [];
    }
  }

  /**
   * ALL wishes (both Birthday AND Anniversary) sent to ONE employee — this is
   * what powers the "View All Wishes" popup, which is only ever opened by
   * that same employee viewing their own wishes.
   */
  public async getAllWishesForEmployee(employeeId: string, top: number = 300): Promise<IWishItem[]> {
    if (!employeeId) {
      return [];
    }
    try {
      const items: IRawWishListItem[] = await this.getWeb()
        .lists.getByTitle(WISHES_LIST_NAME)
        .items.filter(`EmployeeId eq '${employeeId}'`)
        .select("Id", "Title", "EmployeeId", "EmployeeName", "WishType", "Message", "SenderName", "SenderEmail", "Created")
        .orderBy("Created", false)
        .top(top)();

      return items.map(mapItem);
    } catch (error) {
      console.error("Error fetching all wishes for employee:", error);
      return [];
    }
  }

  public async saveWish(
    employeeId: string,
    employeeName: string,
    wishType: WishType,
    message: string,
    senderName: string,
    senderEmail: string
  ): Promise<boolean> {
    try {
      await this.getWeb()
        .lists.getByTitle(WISHES_LIST_NAME)
        .items.add({
          Title: `Wish for ${employeeName}`,
          EmployeeId: employeeId,
          EmployeeName: employeeName,
          WishType: wishType,
          Message: message,
          SenderName: senderName,
          SenderEmail: senderEmail,
        });
      return true;
    } catch (error) {
      console.error("Error saving wish:", error);
      return false;
    }
  }
}

export const employeeWishesService = new EmployeeWishesService();