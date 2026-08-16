import { SPFI } from "@pnp/sp";
import { getSP, isPnPjsInitialized } from "./pnpjsConfig";

export interface IContactMessage {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactService {
  
  private async getSP(): Promise<SPFI | undefined> {
    let retries = 0;
    while (!isPnPjsInitialized() && retries < 15) {
      await new Promise(resolve => setTimeout(resolve, 500));
      retries++;
    }
    return getSP();
  }

  /**
   * Save contact message to SharePoint list
   */
  public async sendContactMessage(message: IContactMessage): Promise<void> {
    try {
      const sp = await this.getSP();
      
      if (!sp) {
        console.error("PnPjs not initialized");
        throw new Error("Service not ready");
      }

      await sp.web.lists.getByTitle("ContactMessages").items.add({
        FullName: message.fullName,
        Email: message.email,
        Subject: message.subject,
        Message: message.message,
        SubmittedDate: new Date(),
        IsRead: false
      });
      
      console.log("Message saved to ContactMessages list");
    } catch (error) {
      console.error("Error saving contact message:", error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
