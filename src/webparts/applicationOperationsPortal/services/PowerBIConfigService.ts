

// // src/webparts/applicationOperationsPortal/components/services/PowerBIConfigService.ts

// import { getSP, isPnPjsInitialized } from "../services/pnpjsConfig";

// export interface IPowerBIConfig {
//   Id: number;
//   Title: string;
//   ReportURL: string;
//   IsActive: boolean;
// }

// export class PowerBIConfigService {
//   private static instance: PowerBIConfigService;
//   private listName: string = 'PowerBIConfiguration';
//   private cacheKey: string = 'powerBIConfig_cache';
//   private cacheExpiryKey: string = 'powerBIConfig_cache_expiry';
//   private cacheDuration: number = 5 * 60 * 1000;

//   private constructor() {}

//   public static getInstance(): PowerBIConfigService {
//     if (!PowerBIConfigService.instance) {
//       PowerBIConfigService.instance = new PowerBIConfigService();
//     }
//     return PowerBIConfigService.instance;
//   }

//   private async getSP(): Promise<any> {
//     let retries = 0;
//     while (!isPnPjsInitialized() && retries < 15) {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       retries++;
//     }
//     return getSP();
//   }

//   public async getActiveConfiguration(): Promise<IPowerBIConfig | null> {
//     try {
//       const cachedConfig = this.getFromCache();
//       if (cachedConfig) {
//         console.log('[PowerBIConfigService] Using cached configuration');
//         return cachedConfig;
//       }

//       console.log('[PowerBIConfigService] Fetching active configuration from SharePoint');

//       const sp = await this.getSP();
      
//       if (!sp) {
//         console.error('[PowerBIConfigService] PnPjs not initialized');
//         throw new Error('Service not ready. Please refresh the page.');
//       }

//       const items = await sp.web.lists
//         .getByTitle(this.listName)
//         .items
//         .filter("IsActive eq 1")
//         .select("Id", "Title", "ReportURL", "IsActive")
//         .top(1)
//         .get();

//       if (items && items.length > 0) {
//         const item = items[0];
//         const config: IPowerBIConfig = {
//           Id: item.Id,
//           Title: item.Title || '',
//           ReportURL: item.ReportURL || '',
//           IsActive: item.IsActive === true
//         };

//         if (!this.isValidPowerBIUrl(config.ReportURL)) {
//           console.error('[PowerBIConfigService] Invalid Power BI URL format');
//           return null;
//         }

//         this.saveToCache(config);
//         console.log('[PowerBIConfigService] Configuration loaded:', config.Title);
//         return config;
//       }

//       console.warn('[PowerBIConfigService] No active configuration found');
//       return null;
//     } catch (error) {
//       console.error('[PowerBIConfigService] Error:', error);
//       throw new Error('Failed to load Power BI configuration.');
//     }
//   }

//   /**
//    * Validate Power BI embed URL format - ES5 Compatible
//    * Uses indexOf() instead of includes()
//    */
//   private isValidPowerBIUrl(url: string): boolean {
//     if (!url || url.trim() === '') return false;
    
//     // Use indexOf instead of includes (ES5 compatible)
//     const isPowerBIUrl = url.indexOf('powerbi.com') !== -1 && 
//                         (url.indexOf('embed') !== -1 || url.indexOf('report') !== -1);
//     return isPowerBIUrl;
//   }

//   private getFromCache(): IPowerBIConfig | null {
//     try {
//       const cachedData = sessionStorage.getItem(this.cacheKey);
//       const expiry = sessionStorage.getItem(this.cacheExpiryKey);
//       if (!cachedData || !expiry) return null;
      
//       const now = Date.now();
//       const expiryTime = parseInt(expiry, 10);
//       if (now > expiryTime) {
//         sessionStorage.removeItem(this.cacheKey);
//         sessionStorage.removeItem(this.cacheExpiryKey);
//         return null;
//       }
//       return JSON.parse(cachedData) as IPowerBIConfig;
//     } catch (error) {
//       return null;
//     }
//   }

//   private saveToCache(config: IPowerBIConfig): void {
//     try {
//       sessionStorage.setItem(this.cacheKey, JSON.stringify(config));
//       sessionStorage.setItem(this.cacheExpiryKey, (Date.now() + this.cacheDuration).toString());
//     } catch (error) {
//       console.warn('[PowerBIConfigService] Cache save error:', error);
//     }
//   }

//   public clearCache(): void {
//     sessionStorage.removeItem(this.cacheKey);
//     sessionStorage.removeItem(this.cacheExpiryKey);
//   }

//   public async refreshConfiguration(): Promise<IPowerBIConfig | null> {
//     this.clearCache();
//     return await this.getActiveConfiguration();
//   }
// }

// export const powerBIConfigService = PowerBIConfigService.getInstance();


// src/webparts/applicationOperationsPortal/components/services/PowerBIConfigService.ts

import { SPFI } from "@pnp/sp";
import { getSP, isPnPjsInitialized } from "../services/pnpjsConfig";

export interface IPowerBIConfig {
  Id: number;
  Title: string;
  ReportURL: string;
  IsActive: boolean;
  WorkspaceId?: string;  // ✅ NEW: For Power BI workspace
  ReportId?: string;     // ✅ NEW: For Power BI report ID
}

export class PowerBIConfigService {
  private static instance: PowerBIConfigService;
  private listName: string = 'PowerBIConfiguration';
  private cacheKey: string = 'powerBIConfig_cache';
  private cacheExpiryKey: string = 'powerBIConfig_cache_expiry';
  private cacheDuration: number = 5 * 60 * 1000;

  private constructor() {}

  public static getInstance(): PowerBIConfigService {
    if (!PowerBIConfigService.instance) {
      PowerBIConfigService.instance = new PowerBIConfigService();
    }
    return PowerBIConfigService.instance;
  }

  private async getSP(): Promise<SPFI | undefined> {
    let retries = 0;
    while (!isPnPjsInitialized() && retries < 15) {
      await new Promise(resolve => setTimeout(resolve, 500));
      retries++;
    }
    return getSP();
  }

  public async getActiveConfiguration(): Promise<IPowerBIConfig | undefined> {
    try {
      const cachedConfig = this.getFromCache();
      if (cachedConfig) {
        console.log('[PowerBIConfigService] Using cached configuration');
        return cachedConfig;
      }

      console.log('[PowerBIConfigService] Fetching active configuration from SharePoint');

      const sp = await this.getSP();
      
      if (!sp) {
        console.error('[PowerBIConfigService] PnPjs not initialized');
        throw new Error('Service not ready. Please refresh the page.');
      }

      const items = await sp.web.lists
        .getByTitle(this.listName)
        .items
        .filter("IsActive eq 1")
        .select("Id", "Title", "ReportURL", "IsActive")
        .top(1)();

      if (items && items.length > 0) {
        const item = items[0];
        const config: IPowerBIConfig = {
          Id: item.Id,
          Title: item.Title || '',
          ReportURL: item.ReportURL || '',
          IsActive: item.IsActive === true
        };

        if (!this.isValidPowerBIUrl(config.ReportURL)) {
          console.error('[PowerBIConfigService] Invalid Power BI URL format');
          return undefined;
        }

        this.saveToCache(config);
        console.log('[PowerBIConfigService] Configuration loaded:', config.Title);
        return config;
      }

      console.warn('[PowerBIConfigService] No active configuration found');
      return undefined;
    } catch (error) {
      console.error('[PowerBIConfigService] Error:', error);
      throw new Error('Failed to load Power BI configuration.');
    }
  }

  private isValidPowerBIUrl(url: string): boolean {
    if (!url || url.trim() === '') return false;
    const isPowerBIUrl = url.indexOf('powerbi.com') !== -1 && 
                        (url.indexOf('embed') !== -1 || url.indexOf('report') !== -1);
    return isPowerBIUrl;
  }

  private getFromCache(): IPowerBIConfig | undefined {
    try {
      const cachedData = sessionStorage.getItem(this.cacheKey);
      const expiry = sessionStorage.getItem(this.cacheExpiryKey);
      if (!cachedData || !expiry) return undefined;
      
      const now = Date.now();
      const expiryTime = parseInt(expiry, 10);
      if (now > expiryTime) {
        sessionStorage.removeItem(this.cacheKey);
        sessionStorage.removeItem(this.cacheExpiryKey);
        return undefined;
      }
      return JSON.parse(cachedData) as IPowerBIConfig;
    } catch {
      return undefined;
    }
  }

  private saveToCache(config: IPowerBIConfig): void {
    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify(config));
      sessionStorage.setItem(this.cacheExpiryKey, (Date.now() + this.cacheDuration).toString());
    } catch (error) {
      console.warn('[PowerBIConfigService] Cache save error:', error);
    }
  }

  public clearCache(): void {
    sessionStorage.removeItem(this.cacheKey);
    sessionStorage.removeItem(this.cacheExpiryKey);
  }

  public async refreshConfiguration(): Promise<IPowerBIConfig | undefined> {
    this.clearCache();
    return await this.getActiveConfiguration();
  }
}

export const powerBIConfigService = PowerBIConfigService.getInstance();