import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";

let _sp: any = null;
let _initialized = false;

export const initPnPjs = async (context: any): Promise<void> => {
  try {
    _sp = spfi().using(SPFx(context));
    _initialized = true;
    // console.log("PnPjs initialized successfully");
  } catch (error) {
    console.error("Failed to initialize PnPjs:", error);
  }
};

export const getSP = (): any => {
  return _sp;
};

export const isPnPjsInitialized = (): boolean => {
  return _initialized;
};