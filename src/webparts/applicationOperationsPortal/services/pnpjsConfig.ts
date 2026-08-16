import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/attachments";
import { WebPartContext } from "@microsoft/sp-webpart-base";

let _sp: SPFI | undefined = undefined;
let _initialized = false;

export const initPnPjs = async (context: WebPartContext): Promise<void> => {
  try {
    _sp = spfi().using(SPFx(context));
    _initialized = true;
    console.log("PnPjs initialized successfully");
  } catch (error) {
    console.error("Failed to initialize PnPjs:", error);
  }
};

export const getSP = (context?: WebPartContext): SPFI | undefined => {
  if (context && !_sp) {
    _sp = spfi().using(SPFx(context));
    _initialized = true;
  }
  return _sp;
};

export const isPnPjsInitialized = (): boolean => {
  return _initialized;
};
