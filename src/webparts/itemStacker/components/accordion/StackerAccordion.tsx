import * as React from "react";
import { IStackerAccordionItem } from './IStackerAccordionItem';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import styles from "../ItemStacker.module.scss";

export interface StackerAccordionProps {
  items: IStackerAccordionItem[];
  displayMode: DisplayMode;
  fnUpdate: Function;
  userInRestricted: boolean;
}

export interface StackerAccordionState {
  expandAll : boolean;
  hasRestrictedContent? : boolean;
  openList : boolean[];
}

class StackerAccordion extends React.Component<StackerAccordionProps, StackerAccordionState> {
  constructor(props: StackerAccordionProps) {
    super(props);
    let openList = Array<boolean>();
    this.props.items.forEach((item, i) =>{
      openList.push(item.isOpen == true? true : false);
    });
    this.state = {
      openList: openList,
      expandAll : false
    };
  }

  public render() {
    const isRestricted = this.props.items.filter(item =>{
      return item.isRestricted == true;
    });
    const hasRestrictedContent =  (isRestricted.length > 0 && this.props.userInRestricted);
    return (
      <div>
        <div className={styles.buttonRow}>
          <div>
            <IconButton className={styles.iconButton}
              iconProps={this.state.expandAll? { iconName: 'ChevronUnfold10' } : {iconName: 'Chevronfold10'}}
              title="Collapse"
              onClick={this._expandCloseAllItems}
              ariaLabel="Collapse All" />
          </div>
          {hasRestrictedContent?
            <div className={`${styles.icon} ${styles.warningIcon}`}>
              <Icon iconName="Warning"
                ariaLabel="Restricted Content below" />
            </div>
          : null }
        </div>
        <div className={styles.accordion}>
          {this.props.items.length > 0 ? this.props.items.map((item, index) => {
            const openState = this.state.openList[index];
            if (item.show) {
              if(item.isRestricted == true && this.props.userInRestricted == false) return;
              return (
                <div>
                  <div className={styles.accordionHeader + ' ' +  (item.isRestricted? styles.isRestricted : '')}
                  onClick={() => this._openClose(index)}>
                      {item.name}
                      <Icon iconName={openState? 'Remove': 'Add'}/>
                  </div>
                  <div className={styles.accordionContent + ' ' + (openState? styles.show : styles.hide)}>
                    <RichText value={item.text}
                      onChange={(text) => this._setText(text, index)}
                      isEditMode={(this.props.displayMode == DisplayMode.Edit) ? true : false}
                    />
                  </div>
                </div>
              );
            }
          }) : null}
        </div>
      </div>
    );
  }

  private _setText = (text: string, index): string => {
    this.props.fnUpdate(text, index);
    return text;
  }

  private _expandCloseAllItems = () => {
    let list : boolean[]= this.state.openList;
    let explandAll : boolean = this.state.expandAll;
    list.forEach((item, i) => {
      list[i] = explandAll;
    });
    this.setState({
      openList: list,
      expandAll : !explandAll
    });
  }

  private _openClose = (index) =>{
    let list = this.state.openList;
    const newValue = !this.state.openList[index];
    list[index] = newValue;
    this.setState({
      openList : list
    });
  }
}

export default StackerAccordion;
