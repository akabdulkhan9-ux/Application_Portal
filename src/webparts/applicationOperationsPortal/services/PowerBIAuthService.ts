// src/webparts/applicationOperationsPortal/components/services/PowerBIAuthService.ts

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient } from "@microsoft/sp-http";

export interface IPowerBIReport {
  id: string;
  name: string;
  embedUrl: string;
  accessToken: string;
}

export class PowerBIAuthService {
  
  /**
   * Get Power BI report with access token
   */
  public static async getReportWithToken(
    context: WebPartContext,
    reportId: string,
    workspaceId: string
  ): Promise<IPowerBIReport | undefined> {
    try {
      // Create AAD HTTP client for Power BI API
      const client = await context.aadHttpClientFactory.getClient(
        "https://analysis.windows.net/powerbi/api"
      );

      // Get report details from Power BI API
      const apiUrl = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;
      
      const response = await client.get(apiUrl, AadHttpClient.configurations.v1);

      if (!response.ok) {
        console.error('[PowerBIAuthService] Failed to get report:', response.status);
        return undefined;
      }

      const data = await response.json();

      // Get embed token for the report
      const tokenResponse = await client.post(
        `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`,
        AadHttpClient.configurations.v1,
        {
          body: JSON.stringify({
            accessLevel: 'View',
            allowSaveAs: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!tokenResponse.ok) {
        console.error('[PowerBIAuthService] Failed to get token:', tokenResponse.status);
        return undefined;
      }

      const tokenData = await tokenResponse.json();

      return {
        id: data.id,
        name: data.name,
        embedUrl: data.embedUrl,
        accessToken: tokenData.token
      };

    } catch (error) {
      console.error('[PowerBIAuthService] Error:', error);
      return undefined;
    }
  }

  /**
   * Get Power BI report embed URL and token from the report URL
   * Alternative approach: Extract from iframe URL
   */
  public static extractFromUrl(reportUrl: string): { embedUrl: string; reportId: string } | undefined {
    try {
      const url = new URL(reportUrl);
      const reportId = url.searchParams.get('reportId');
      const embedUrl = reportUrl;
      
      if (reportId) {
        return { embedUrl, reportId };
      }
      return undefined;
    } catch (error) {
      console.error('[PowerBIAuthService] Error extracting from URL:', error);
      return undefined;
    }
  }
}
