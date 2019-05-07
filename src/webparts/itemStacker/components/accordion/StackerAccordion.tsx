import * as React from "react";
import { Accordion, AccordionItem } from 'react-sanfona';
import { IStackerAccordionItem } from './IStackerAccordionItem';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from "@microsoft/sp-core-library";


export interface StackerAccordionProps {
  items : IStackerAccordionItem[];
  displayMode : DisplayMode;
}

export interface StackerAccordionState {

}

class StackerAccordion extends React.Component<StackerAccordionProps, StackerAccordionState> {
  constructor(props: StackerAccordionProps) {
    super(props);
  }
  public render() {
    return (

      <Accordion allowMultiple={true}>
        {this.props.items.length > 0 ? this.props.items.map(item => {
          return (
            <AccordionItem title={item.name} expanded={item.isOpen}>
              <RichText value={item.text}
                        onChange={(text)=>this._setText(text)}
                        isEditMode={(this.props.displayMode == DisplayMode.Edit)? true : false}
              />
            </AccordionItem>
          );
        }) : null}
      </Accordion>
    );
  }

  private _setText = (text : string) : string => {

    return text;
  }

  private _hasRestrictedContent = () : boolean =>{
    return true;
  }

  private _expandAllItems = () =>{

  }
}

export default StackerAccordion;
