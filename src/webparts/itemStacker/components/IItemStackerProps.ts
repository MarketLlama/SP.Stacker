import { IStackerAccordionItem } from "./accordion/IStackerAccordionItem";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IItemStackerProps {
  context : WebPartContext;
  collectionData: IStackerAccordionItem[];
  displayMode : DisplayMode;
  fnSetText : Function;
  userInRestrictedGroup : boolean;
  fPropertyPaneOpen: () => void;
}
