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
  showWarning : boolean;
  showOpenClose : boolean;
}

export interface StackerAccordionState {
  expandAll : boolean;
  hasRestrictedContent? : boolean;
  openList : boolean[];
  displayMode : boolean;
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
      expandAll : false,
      displayMode : true
    };
    this._editModeFix();
  }

  public render() {
    const isRestricted = this.props.items.filter(item =>{
      return item.isRestricted == true;
    });
    const hasRestrictedContent =  (isRestricted.length > 0 && this.props.userInRestricted);
    return (
      <div>
        {this.props.showOpenClose || this.props.showWarning?
        <div className={styles.buttonRow}>
          <div>
            {this.props.showOpenClose?
            <IconButton className={styles.iconButton}
              iconProps={this.state.expandAll? { iconName: 'ChevronUnfold10' } : {iconName: 'Chevronfold10'}}
              title="Collapse"
              onClick={this._expandCloseAllItems}
              ariaLabel="Collapse All" /> : null}
          </div>
          {hasRestrictedContent && this.props.showWarning?
            <div className={`${styles.icon} ${styles.warningIcon}`}>
              <Icon iconName="Warning"
                ariaLabel="Restricted Content below" />
            </div>
          : null }
        </div>
        : null}
        <div className={styles.accordion}>
          {this.props.items.length > 0 ? this.props.items.map((item, index) => {
            const openState = this.state.openList[index];
            if (item.show) {
              if(item.isRestricted == true && this.props.userInRestricted == false) return;
              return (
                <div>
                  <div className={styles.accordionHeader + ' ' + (openState? styles.accordionHeaderOpen : '')
                    +  ' ' + (item.isRestricted? styles.isRestricted : '')}
                  onClick={() => this._openClose(index)}>
                      {item.name}
                      <Icon iconName={openState? 'Remove': 'Add'}/>
                  </div>
                  <div className={styles.accordionContent + ' ' + (openState? styles.show : styles.hide)}>
                    <RichText value={item.text}
                      onChange={(text) => this._setText(text, index)}
                      isEditMode={this.state.displayMode}
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

  //TO:DO : wait Until fix then remove...
  public componentDidUpdate(prevProps  : StackerAccordionProps, prevState : StackerAccordionState) {
    if(prevProps.displayMode!==this.props.displayMode){
      this._editModeFix();
    }
  }

  private _editModeFix = () =>{
    setTimeout(() =>{
      this.setState({
        displayMode : (this.props.displayMode == DisplayMode.Edit) ? true : false
      });
    },10);
  }
  //
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
