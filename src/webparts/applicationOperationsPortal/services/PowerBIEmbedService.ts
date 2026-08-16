// src/webparts/applicationOperationsPortal/components/services/PowerBIEmbedService.ts

import * as powerbi from 'powerbi-client';
import * as models from 'powerbi-models';
import { IPowerBIReport } from './PowerBIAuthService';

export interface IPowerBIReportSettings {
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
  autoFitToWindow?: boolean;
  [key: string]: unknown;
}

export interface IEmbedConfig {
  type: string;
  id: string;
  embedUrl: string;
  accessToken: string;
  tokenType: models.TokenType;
  settings?: IPowerBIReportSettings;
}

export interface IPowerBIEmbed {
  on(event: string, handler: (event?: unknown) => void): void;
}

export interface IPowerBIService {
  reset(container: HTMLElement): void;
  embed(container: HTMLElement, config: IEmbedConfig): IPowerBIEmbed;
}

export class PowerBIEmbedService {
  private static powerbiInstance: IPowerBIService | undefined;

  /**
   * Initialize powerbi client
   */
  public static init(): void {
    if (!PowerBIEmbedService.powerbiInstance) {
      PowerBIEmbedService.powerbiInstance = powerbi as unknown as IPowerBIService;
    }
  }

  /**
   * Embed Power BI report in container
   */
  public static embedReport(
    container: HTMLElement,
    report: IPowerBIReport,
    settings?: IPowerBIReportSettings
  ): IPowerBIEmbed {
    PowerBIEmbedService.init();

    const config: IEmbedConfig = {
      type: 'report',
      id: report.id,
      embedUrl: report.embedUrl,
      accessToken: report.accessToken,
      tokenType: models.TokenType.Aad,
      settings: {
        filterPaneEnabled: settings?.filterPaneEnabled || false,
        navContentPaneEnabled: settings?.navContentPaneEnabled || true,
        autoFitToWindow: settings?.autoFitToWindow || true,
        ...settings
      }
    };

    // Reset container before embedding
    PowerBIEmbedService.powerbiInstance!.reset(container);

    // Embed report
    const embeddedReport = PowerBIEmbedService.powerbiInstance!.embed(container, config);

    // Add event handlers
    embeddedReport.on('loaded', () => {
      console.log('[PowerBIEmbedService] Report loaded successfully');
    });

    embeddedReport.on('error', (error?: unknown) => {
      console.error('[PowerBIEmbedService] Report error:', error);
    });

    embeddedReport.on('rendered', () => {
      console.log('[PowerBIEmbedService] Report rendered successfully');
    });

    return embeddedReport;
  }

  /**
   * Get powerbi instance
   */
  public static getInstance(): IPowerBIService {
    PowerBIEmbedService.init();
    return PowerBIEmbedService.powerbiInstance!;
  }
}
