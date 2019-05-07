import { IStackerAccordionItem } from "./accordion/IStackerAccordionItem";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IItemStackerProps {
  collectionData: IStackerAccordionItem[];
  displayMode : DisplayMode;
}
