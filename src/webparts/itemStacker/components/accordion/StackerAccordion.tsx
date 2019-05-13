import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { IStackerAccordionItem } from './IStackerAccordionItem';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import styles from "../ItemStacker.module.scss";

export interface StackerAccordionProps {
  items: IStackerAccordionItem[];
  displayMode: DisplayMode;
  fnUpdate: Function;
}

export interface StackerAccordionState {
  userInRestricted: boolean;
}
//https://github.com/springload/react-accessible-accordion/tree/v2.4.5
class StackerAccordion extends React.Component<StackerAccordionProps, StackerAccordionState> {
  constructor(props: StackerAccordionProps) {
    super(props);
    this.state = {
      userInRestricted: false
    };
  }
  public render() {
    return (
      <div>
        <div className={styles.buttonRow}>
          <div>
            <IconButton className={styles.iconButton}
              iconProps={{ iconName: 'ChevronFold10' }}
              title="ChevronFold10"
              onClick={this._expandAllItems}
              ariaLabel="Colapse All" />
          </div>
          <div className={`${styles.icon} ${styles.warningIcon}`}>
            <Icon iconName="Warning"
            ariaLabel="Restricted Content below"/>
          </div>
        </div>
        <Accordion accordion={false}>
          {this.props.items.length > 0 ? this.props.items.map((item, index) => {
            if (item.show) {
              console.log(item);
              return (
                <AccordionItem expanded={item.isOpen}>
                  {item.isRestricted ? <AccordionItemTitle className={styles.isRestricted}>
                    {item.name}
                  </AccordionItemTitle> :
                    <AccordionItemTitle>
                      {item.name}  <Icon iconName="Remove"/>
                    </AccordionItemTitle>}
                  <AccordionItemBody>
                    <RichText value={item.text}
                      onChange={(text) => this._setText(text, index)}
                      isEditMode={(this.props.displayMode == DisplayMode.Edit) ? true : false}
                    />
                  </AccordionItemBody>
                </AccordionItem>
              );
            }
          }) : null}
        </Accordion>
      </div>
    );
  }

  private _setText = (text: string, index): string => {
    this.props.fnUpdate(text, index);
    return text;
  }

  private _hasRestrictedContent = (): boolean => {
    return true;
  }

  private _expandAllItems = () => {

  }
}

export default StackerAccordion;
