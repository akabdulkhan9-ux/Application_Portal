

// // src/webparts/applicationOperationsPortal/services/EmployeeService.ts

// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { getSP } from "./pnpjsConfig"; // ⚠️ adjust to match your project's SPFI accessor

// export interface IEmployeeAnniversaryItem {
//   id: string;
//   employeeId: string;      // Title, e.g. "EMP001"
//   employeeEmail: string;
//   fullName: string;
//   jobTitle: string;
//   department: string;
//   years: number;
//   joinedOn: string;
//   hireDate: Date;
// }

// export interface IEmployeeBirthdayItem {
//   id: string;
//   employeeId: string;
//   employeeEmail: string;
//   fullName: string;
//   jobTitle: string;
//   department: string;
//   date: string;
//   day: string;
//   dateOfBirth: Date;
// }

// interface IRawEmployee {
//   Id: number;
//   Title: string;
//   EmployeeName: string;
//   JobTitle: string;
//   Department: string;
//   HireDate: string | null;
//   DateOfBirth: string | null;
//   EmployeeEmail: string;
// }

// const EMPLOYEE_LIST_NAME = "EmployeeLeaveDetails";

// const formatDisplayDate = (date: Date): string =>
//   date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// const formatShortDate = (date: Date): string =>
//   date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

// const getDayName = (date: Date): string =>
//   date.toLocaleDateString("en-US", { weekday: "long" });

// class EmployeeService {
//   private getWeb() {
//     return getSP().web;
//   }

//   /**
//    * EmployeeLeaveDetails has one row per LEAVE REQUEST, so an employee's bio
//    * fields (DateOfBirth, HireDate, Department...) repeat on every leave row
//    * they have. This dedupes by Employee ID (Title) so each person is only
//    * counted once, regardless of how many leave requests they've filed.
//    */
//   public async getAllEmployees(): Promise<IRawEmployee[]> {
//     try {
//       const items: IRawEmployee[] = await this.getWeb()
//         .lists.getByTitle(EMPLOYEE_LIST_NAME)
//         .items.select("Id", "Title", "EmployeeName", "JobTitle", "Department", "HireDate", "DateOfBirth", "EmployeeEmail")
//         .top(2000)();

//       const seen: { [key: string]: boolean } = {};
//       const distinct: IRawEmployee[] = [];
//       items.forEach((item) => {
//         if (item.Title && !seen[item.Title]) {
//           seen[item.Title] = true;
//           distinct.push(item);
//         }
//       });

//       return distinct;
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       return [];
//     }
//   }

//   /**
//    * ✅ UPDATED: Employees whose HIRE DATE matches TODAY (month + day)
//    * Shows ONLY employees with anniversaries TODAY, not the whole month.
//    */
//   public async getAnniversariesForMonth(monthDate: Date): Promise<IEmployeeAnniversaryItem[]> {
//     const today = new Date();
//     const todayMonth = today.getMonth();
//     const todayDay = today.getDate();

//     console.log("🎉 Today's date for anniversaries:", today);

//     try {
//       const employees = await this.getAllEmployees();
//       const results: IEmployeeAnniversaryItem[] = [];

//       employees.forEach((item) => {
//         if (!item.HireDate) return;
//         const hireDate = new Date(item.HireDate);
        
//         // ✅ Check if HireDate month AND day match TODAY
//         if (hireDate.getMonth() !== todayMonth) return;
//         if (hireDate.getDate() !== todayDay) return;  // 👈 Added day check

//         const years = today.getFullYear() - hireDate.getFullYear();
//         if (years < 1) return;

//         console.log("🎉 Anniversary today:", item.EmployeeName, "Years:", years);

//         results.push({
//           id: item.Id.toString(),
//           employeeId: item.Title || "",
//           employeeEmail: item.EmployeeEmail || "",
//           fullName: item.EmployeeName || "Unknown",
//           jobTitle: item.JobTitle || "N/A",
//           department: item.Department || "N/A",
//           years,
//           joinedOn: formatDisplayDate(hireDate),
//           hireDate,
//         });
//       });

//       results.sort((a, b) => b.years - a.years); // longest-serving first
//       console.log("🎉 Total anniversaries today:", results.length);
//       return results;
//     } catch (error) {
//       console.error("Error fetching anniversaries:", error);
//       return [];
//     }
//   }

//   /**
//    * ✅ UPDATED: Employees whose DATE OF BIRTH matches TODAY (month + day)
//    * Shows ONLY employees with birthdays TODAY, not the whole month.
//    */
//   public async getBirthdaysForMonth(monthDate: Date): Promise<IEmployeeBirthdayItem[]> {
//     const today = new Date();
//     const todayMonth = today.getMonth();
//     const todayDay = today.getDate();

//     console.log("🎂 Today's date for birthdays:", today);

//     try {
//       const employees = await this.getAllEmployees();
//       const results: IEmployeeBirthdayItem[] = [];

//       employees.forEach((item) => {
//         if (!item.DateOfBirth) return;
//         const dob = new Date(item.DateOfBirth);
        
//         // ✅ Check if DOB month AND day match TODAY
//         if (dob.getMonth() !== todayMonth) return;
//         if (dob.getDate() !== todayDay) return;  // 👈 Added day check

//         console.log("🎂 Birthday today:", item.EmployeeName, "DOB:", dob);

//         results.push({
//           id: item.Id.toString(),
//           employeeId: item.Title || "",
//           employeeEmail: item.EmployeeEmail || "",
//           fullName: item.EmployeeName || item.Title || "Unknown",
//           jobTitle: item.JobTitle || "N/A",
//           department: item.Department || "N/A",
//           date: formatShortDate(dob),
//           day: getDayName(new Date(today.getFullYear(), dob.getMonth(), dob.getDate())),
//           dateOfBirth: dob,
//         });
//       });

//       results.sort((a, b) => a.dateOfBirth.getDate() - b.dateOfBirth.getDate());
//       console.log("🎂 Total birthdays today:", results.length);
//       return results;
//     } catch (error) {
//       console.error("Error fetching birthdays:", error);
//       return [];
//     }
//   }
// }

// export const employeeService = new EmployeeService();



// src/webparts/applicationOperationsPortal/services/EmployeeService.ts

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getSP } from "./pnpjsConfig";

export interface IEmployeeAnniversaryItem {
  id: string;
  employeeId: string;
  employeeEmail: string;
  fullName: string;
  jobTitle: string;
  department: string;
  years: number;
  joinedOn: string;
  hireDate: Date;
}

export interface IEmployeeBirthdayItem {
  id: string;
  employeeId: string;
  employeeEmail: string;
  fullName: string;
  jobTitle: string;
  department: string;
  date: string;
  day: string;
  dateOfBirth: Date;
}

interface IRawEmployee {
  Id: number;
  Title: string;
  EmployeeName: string;
  JobTitle: string;
  Department: string;
  HireDate?: string;
  DateOfBirth?: string;
  EmployeeEmail: string;
}

// ✅ EmployeeMaster List Name
const EMPLOYEE_LIST_NAME = "EmployeeMaster";

const formatDisplayDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const formatShortDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const getDayName = (date: Date): string =>
  date.toLocaleDateString("en-US", { weekday: "long" });

class EmployeeService {
  private getWeb(): NonNullable<ReturnType<typeof getSP>>["web"] {
    const sp = getSP();
    if (!sp) {
      throw new Error("PnPjs not initialized");
    }
    return sp.web;
  }

  /**
   * Get all employees from EmployeeMaster (NO duplicates - each employee appears ONCE)
   */
  public async getAllEmployees(): Promise<IRawEmployee[]> {
    try {
      const items: IRawEmployee[] = await this.getWeb()
        .lists.getByTitle(EMPLOYEE_LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "EmployeeName",
          "JobTitle",
          "Department",
          "HireDate",
          "DateOfBirth",
          "EmployeeEmail"
        )
        .top(2000)();

      console.log("Total employees from EmployeeMaster:", items.length);
      return items;
    } catch (error) {
      console.error("Error fetching employees from EmployeeMaster:", error);
      return [];
    }
  }

  /**
   * ✅ Employees whose HIRE DATE falls in the SELECTED month (any year)
   * Shows anniversaries for the ENTIRE month, not just today
   */
  public async getAnniversariesForMonth(monthDate: Date): Promise<IEmployeeAnniversaryItem[]> {
    const targetMonth = monthDate.getMonth();  // 👈 Uses selected month

    console.log("🎉 Selected month for anniversaries:", monthDate);

    try {
      const employees = await this.getAllEmployees();
      const results: IEmployeeAnniversaryItem[] = [];

      employees.forEach((item) => {
        if (!item.HireDate) return;
        const hireDate = new Date(item.HireDate);
        
        // ✅ Check if HireDate month matches selected month (NOT just today)
        if (hireDate.getMonth() !== targetMonth) return;

        const years = monthDate.getFullYear() - hireDate.getFullYear();
        if (years < 1) return;

        results.push({
          id: item.Id.toString(),
          employeeId: item.Title || "",
          employeeEmail: item.EmployeeEmail || "",
          fullName: item.EmployeeName || "Unknown",
          jobTitle: item.JobTitle || "N/A",
          department: item.Department || "N/A",
          years,
          joinedOn: formatDisplayDate(hireDate),
          hireDate,
        });
      });

      results.sort((a, b) => b.years - a.years);
      console.log("🎉 Total anniversaries in month:", results.length);
      return results;
    } catch (error) {
      console.error("Error fetching anniversaries:", error);
      return [];
    }
  }

  /**
   * ✅ Employees whose DATE OF BIRTH falls in the SELECTED month (any year)
   * Shows birthdays for the ENTIRE month, not just today
   */
  public async getBirthdaysForMonth(monthDate: Date): Promise<IEmployeeBirthdayItem[]> {
    const targetMonth = monthDate.getMonth();  // 👈 Uses selected month

    console.log("🎂 Selected month for birthdays:", monthDate);

    try {
      const employees = await this.getAllEmployees();
      const results: IEmployeeBirthdayItem[] = [];

      employees.forEach((item) => {
        if (!item.DateOfBirth) return;
        const dob = new Date(item.DateOfBirth);
        
        // ✅ Check if DOB month matches selected month (NOT just today)
        if (dob.getMonth() !== targetMonth) return;

        results.push({
          id: item.Id.toString(),
          employeeId: item.Title || "",
          employeeEmail: item.EmployeeEmail || "",
          fullName: item.EmployeeName || item.Title || "Unknown",
          jobTitle: item.JobTitle || "N/A",
          department: item.Department || "N/A",
          date: formatShortDate(dob),
          day: getDayName(new Date(monthDate.getFullYear(), dob.getMonth(), dob.getDate())),
          dateOfBirth: dob,
        });
      });

      results.sort((a, b) => a.dateOfBirth.getDate() - b.dateOfBirth.getDate());
      console.log("🎂 Total birthdays in month:", results.length);
      return results;
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      return [];
    }
  }

  /**
   * ✅ Get employee by EmployeeId from EmployeeMaster
   */
  public async getEmployeeById(employeeId: string): Promise<IRawEmployee | undefined> {
    try {
      const items: IRawEmployee[] = await this.getWeb()
        .lists.getByTitle(EMPLOYEE_LIST_NAME)
        .items
        .filter(`Title eq '${employeeId}'`)
        .select(
          "Id",
          "Title",
          "EmployeeName",
          "JobTitle",
          "Department",
          "HireDate",
          "DateOfBirth",
          "EmployeeEmail"
        )
        .top(1)();

      if (items.length > 0) {
        return items[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching employee by ID:", error);
      return undefined;
    }
  }

  /**
   * ✅ Get employee by Email from EmployeeMaster
   */
  public async getEmployeeByEmail(email: string): Promise<IRawEmployee | undefined> {
    try {
      const items: IRawEmployee[] = await this.getWeb()
        .lists.getByTitle(EMPLOYEE_LIST_NAME)
        .items
        .filter(`EmployeeEmail eq '${email}'`)
        .select(
          "Id",
          "Title",
          "EmployeeName",
          "JobTitle",
          "Department",
          "HireDate",
          "DateOfBirth",
          "EmployeeEmail"
        )
        .top(1)();

      if (items.length > 0) {
        return items[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching employee by email:", error);
      return undefined;
    }
  }
}

export const employeeService = new EmployeeService();