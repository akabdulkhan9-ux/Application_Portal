// // src/webparts/applicationOperationsPortal/services/LeaveService.ts

// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { getSP } from "./pnpjsConfig"; // ✅ Correct import
// export interface IEmployeeLeaveItem {
//   id: string;
//   employeeId: string;
//   fullName: string;
//   jobTitle: string;
//   department: string;
//   email: string;
//   managerName: string;
//   leaveType: string;
//   startDate: string;      // formatted for display, e.g. "10 Jul 2026"
//   endDate: string;        // formatted for display
//   startDateRaw: Date;
//   endDateRaw: Date;
//   days: number;
//   leaveStatus: string;
// }

// const LIST_NAME = "EmployeeLeaveDetails";

// const formatDisplayDate = (date: Date): string =>
//   date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// class LeaveService {
//   private getWeb() {
//     return getSP().web;
//   }

//   /**
//    * Returns every APPROVED leave whose date range overlaps the given month —
//    * so a leave from 15-Aug to 05-Oct is returned for Aug, Sep, AND Oct, not
//    * just the month it starts or ends in.
//    */
//   public async getLeavesForMonth(monthDate: Date): Promise<IEmployeeLeaveItem[]> {
//     const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
//     const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

//     const monthStartIso = monthStart.toISOString();
//     const monthEndIso = monthEnd.toISOString();

//     try {
//       const items: any[] = await this.getWeb()
//         .lists.getByTitle(LIST_NAME)
//         .items.filter(
//           `StartDate le datetime'${monthEndIso}' and EndDate ge datetime'${monthStartIso}' and LeaveStatus eq 'Approved'`
//         )
//         .select(
//           "Id",
//           "Title",
//           "EmployeeName",
//           "Department",
//           "EmployeeEmail",
//           "JobTitle",
//           "ManagerName",
//           "LeaveType",
//           "StartDate",
//           "EndDate",
//           "Days",
//           "LeaveStatus"
//         )
//         .top(500)();

//       return items
//         .map((item) => {
//           const start = new Date(item.StartDate);
//           const end = new Date(item.EndDate);
//           return {
//             id: item.Id.toString(),
//             employeeId: item.Title,
//             fullName: item.EmployeeName,
//             jobTitle: item.JobTitle,
//             department: item.Department,
//             email: item.EmployeeEmail,
//             managerName: item.ManagerName,
//             leaveType: item.LeaveType,
//             startDate: formatDisplayDate(start),
//             endDate: formatDisplayDate(end),
//             startDateRaw: start,
//             endDateRaw: end,
//             days: item.Days,
//             leaveStatus: item.LeaveStatus,
//           } as IEmployeeLeaveItem;
//         })
//         .sort((a, b) => a.startDateRaw.getTime() - b.startDateRaw.getTime());
//     } catch (error) {
//       console.error("Error fetching leaves for month:", error);
//       return [];
//     }
//   }

//   /**
//    * Optional: fetch a single employee's full leave history (e.g. for a profile view).
//    */
//   public async getLeavesByEmployeeId(employeeId: string): Promise<IEmployeeLeaveItem[]> {
//     try {
//       const items: any[] = await this.getWeb()
//         .lists.getByTitle(LIST_NAME)
//         .items.filter(`Title eq '${employeeId}'`)
//         .select(
//           "Id",
//           "Title",
//           "EmployeeName",
//           "Department",
//           "EmployeeEmail",
//           "JobTitle",
//           "ManagerName",
//           "LeaveType",
//           "StartDate",
//           "EndDate",
//           "Days",
//           "LeaveStatus"
//         )();

//       return items.map((item) => {
//         const start = new Date(item.StartDate);
//         const end = new Date(item.EndDate);
//         return {
//           id: item.Id.toString(),
//           employeeId: item.Title,
//           fullName: item.EmployeeName,
//           jobTitle: item.JobTitle,
//           department: item.Department,
//           email: item.EmployeeEmail,
//           managerName: item.ManagerName,
//           leaveType: item.LeaveType,
//           startDate: formatDisplayDate(start),
//           endDate: formatDisplayDate(end),
//           startDateRaw: start,
//           endDateRaw: end,
//           days: item.Days,
//           leaveStatus: item.LeaveStatus,
//         } as IEmployeeLeaveItem;
//       });
//     } catch (error) {
//       console.error("Error fetching leaves for employee:", error);
//       return [];
//     }
//   }
// }

// export const leaveService = new LeaveService();



// src/webparts/applicationOperationsPortal/services/LeaveService.ts

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getSP } from "./pnpjsConfig";

export interface IEmployeeLeaveItem {
  id: string;
  employeeId: string;
  fullName: string;
  jobTitle: string;
  department: string;
  email: string;
  managerName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  startDateRaw: Date;
  endDateRaw: Date;
  days: number;
  leaveStatus: string;
}

// ✅ Make sure this matches your SharePoint list name EXACTLY
const LEAVE_REQUESTS_LIST_NAME = "EmployeeLeaveRequests";

const formatDisplayDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

interface IRawLeaveRequestItem {
  Id?: number;
  Title?: string;
  EmployeeName?: string;
  Department?: string;
  JobTitle?: string;
  ManagerName?: string;
  LeaveType?: string;
  StartDate?: string;
  EndDate?: string;
  Days?: number;
  LeaveStatus?: string;
  [key: string]: unknown;
}

class LeaveService {
  private getWeb(): NonNullable<ReturnType<typeof getSP>>["web"] {
    const sp = getSP();
    if (!sp) {
      throw new Error("PnPjs not initialized");
    }
    return sp.web;
  }

  /**
   * ✅ Get all items from the list (for debugging)
   */
  public async getAllItems(): Promise<Record<string, unknown>[]> {
    try {
      const items: IRawLeaveRequestItem[] = await this.getWeb()
        .lists.getByTitle(LEAVE_REQUESTS_LIST_NAME)
        .items
        .select("*")
        .top(50)();

      console.log("📋 Total items in EmployeeLeaveRequests:", items.length);
      if (items.length > 0) {
        console.log("📋 Sample item:", items[0]);
      }
      return items;
    } catch (error) {
      console.error("❌ Error fetching all items:", error);
      return [];
    }
  }

  /**
   * ✅ Get approved leaves for the selected month
   * ✅ FIXED: Removed EmployeeEmail (doesn't exist in the list)
   */
  public async getLeavesForMonth(monthDate: Date): Promise<IEmployeeLeaveItem[]> {
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

    const monthStartIso = monthStart.toISOString();
    const monthEndIso = monthEnd.toISOString();

    console.log("=========================================");
    console.log("🔍 Fetching leaves for month:", monthDate);
    console.log("📅 Month start:", monthStartIso);
    console.log("📅 Month end:", monthEndIso);
    console.log("=========================================");

    try {
      // ✅ First, verify the list exists and has data
      const allItems = await this.getAllItems();

      if (allItems.length === 0) {
        console.log("⚠️ No items found in EmployeeLeaveRequests list!");
        console.log("⚠️ Check if the list name is correct and has data.");
        return [];
      }

      // ✅ Now get filtered items - REMOVED EmployeeEmail
      const items: IRawLeaveRequestItem[] = await this.getWeb()
        .lists.getByTitle(LEAVE_REQUESTS_LIST_NAME)
        .items
        .filter(
          `StartDate le datetime'${monthEndIso}' and EndDate ge datetime'${monthStartIso}' and LeaveStatus eq 'Approved'`
        )
        .select(
          "Id",
          "Title",
          "EmployeeName",
          "Department",
          "JobTitle",
          "ManagerName",
          "LeaveType",
          "StartDate",
          "EndDate",
          "Days",
          "LeaveStatus"
        )
        .top(500)();

      console.log("✅ Filtered leaves found:", items.length);

      // ✅ Log each filtered item for debugging
      if (items.length > 0) {
        items.forEach((item, index) => {
          console.log(`📋 Item ${index + 1}:`, {
            Title: item.Title,
            EmployeeName: item.EmployeeName,
            LeaveType: item.LeaveType,
            StartDate: item.StartDate,
            EndDate: item.EndDate,
            Days: item.Days,
            LeaveStatus: item.LeaveStatus
          });
        });
      } else {
        console.log("⚠️ No approved leaves found for this month.");
        console.log("💡 Check if:");
        console.log("   - Leave dates are in the selected month");
        console.log("   - LeaveStatus is 'Approved'");
        console.log("   - StartDate and EndDate columns exist");
      }

      // ✅ Map to IEmployeeLeaveItem
      const mappedItems: IEmployeeLeaveItem[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          if (!item.StartDate || !item.EndDate) {
            console.warn("⚠️ Item missing StartDate or EndDate:", item);
            continue;
          }

          const start = new Date(item.StartDate);
          const end = new Date(item.EndDate);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.warn("⚠️ Invalid date format for item:", item);
            continue;
          }

          mappedItems.push({
            id: item.Id ? item.Id.toString() : "",
            employeeId: item.Title || "",
            fullName: item.EmployeeName || item.Title || "Unknown",
            jobTitle: item.JobTitle || "N/A",
            department: item.Department || "N/A",
            email: "", // ✅ EmployeeEmail not available in this list
            managerName: item.ManagerName || "",
            leaveType: item.LeaveType || "N/A",
            startDate: formatDisplayDate(start),
            endDate: formatDisplayDate(end),
            startDateRaw: start,
            endDateRaw: end,
            days: item.Days || 0,
            leaveStatus: item.LeaveStatus || "N/A",
          });
        } catch (err) {
          console.error("❌ Error mapping item:", item, err);
        }
      }

      mappedItems.sort((a, b) => a.startDateRaw.getTime() - b.startDateRaw.getTime());

      console.log("✅ Mapped leaves count:", mappedItems.length);
      return mappedItems;
    } catch (error) {
      console.error("❌ Error fetching leaves for month:", error);
      return [];
    }
  }

  /**
   * ✅ Get leaves by employee ID
   */
  public async getLeavesByEmployeeId(employeeId: string): Promise<IEmployeeLeaveItem[]> {
    if (!employeeId) {
      console.log("⚠️ No employeeId provided");
      return [];
    }

    try {
      console.log("🔍 Fetching leaves for employee:", employeeId);

      const items: IRawLeaveRequestItem[] = await this.getWeb()
        .lists.getByTitle(LEAVE_REQUESTS_LIST_NAME)
        .items
        .filter(`Title eq '${employeeId}'`)
        .select(
          "Id",
          "Title",
          "EmployeeName",
          "Department",
          "JobTitle",
          "ManagerName",
          "LeaveType",
          "StartDate",
          "EndDate",
          "Days",
          "LeaveStatus"
        )();

      console.log(`✅ Found ${items.length} leaves for employee ${employeeId}`);

      const mappedItems: IEmployeeLeaveItem[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          if (!item.StartDate || !item.EndDate) {
            console.warn("⚠️ Item missing StartDate or EndDate:", item);
            continue;
          }

          const start = new Date(item.StartDate);
          const end = new Date(item.EndDate);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.warn("⚠️ Invalid date format for item:", item);
            continue;
          }

          mappedItems.push({
            id: item.Id ? item.Id.toString() : "",
            employeeId: item.Title || "",
            fullName: item.EmployeeName || item.Title || "Unknown",
            jobTitle: item.JobTitle || "N/A",
            department: item.Department || "N/A",
            email: "",
            managerName: item.ManagerName || "",
            leaveType: item.LeaveType || "N/A",
            startDate: formatDisplayDate(start),
            endDate: formatDisplayDate(end),
            startDateRaw: start,
            endDateRaw: end,
            days: item.Days || 0,
            leaveStatus: item.LeaveStatus || "N/A",
          });
        } catch (err) {
          console.error("❌ Error mapping item:", item, err);
        }
      }

      return mappedItems;
    } catch (error) {
      console.error(`❌ Error fetching leaves for employee ${employeeId}:`, error);
      return [];
    }
  }

  /**
   * ✅ Check if a specific date overlaps with any approved leave
   */
  public async hasLeaveOnDate(employeeId: string, date: Date): Promise<boolean> {
    const dateIso = date.toISOString();
    try {
      const items: IRawLeaveRequestItem[] = await this.getWeb()
        .lists.getByTitle(LEAVE_REQUESTS_LIST_NAME)
        .items
        .filter(
          `Title eq '${employeeId}' and StartDate le datetime'${dateIso}' and EndDate ge datetime'${dateIso}' and LeaveStatus eq 'Approved'`
        )
        .select("Id")
        .top(1)();

      return items.length > 0;
    } catch (error) {
      console.error("Error checking leave on date:", error);
      return false;
    }
  }

  /**
   * ✅ Get leave count for an employee in a month
   */
  public async getLeaveCountForMonth(employeeId: string, monthDate: Date): Promise<number> {
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

    const monthStartIso = monthStart.toISOString();
    const monthEndIso = monthEnd.toISOString();

    try {
      const items: IRawLeaveRequestItem[] = await this.getWeb()
        .lists.getByTitle(LEAVE_REQUESTS_LIST_NAME)
        .items
        .filter(
          `Title eq '${employeeId}' and StartDate le datetime'${monthEndIso}' and EndDate ge datetime'${monthStartIso}' and LeaveStatus eq 'Approved'`
        )
        .select("Id")
        .top(500)();

      return items.length;
    } catch (error) {
      console.error("Error getting leave count:", error);
      return 0;
    }
  }
}

export const leaveService = new LeaveService();