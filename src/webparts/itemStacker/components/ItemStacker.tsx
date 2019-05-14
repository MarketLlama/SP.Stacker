import * as React from 'react';
import styles from './ItemStacker.module.scss';
import { IItemStackerProps } from './IItemStackerProps';
import StackerAccordion from './accordion/StackerAccordion';
import SiteServices from '../services/SiteServices';


export default class ItemStacker extends React.Component<IItemStackerProps, {}> {
  /**
   *
   */
  constructor(props : IItemStackerProps) {
    super(props);
  }
  public render(): React.ReactElement<IItemStackerProps> {
    return (
      <div className={styles.itemStacker}>
        <div className={styles.container}>
          <StackerAccordion items={this.props.collectionData}
            userInRestricted = {this.props.userInRestrictedGroup}
            displayMode={this.props.displayMode}
            fnUpdate={this.props.fnSetText} />
        </div>
      </div>
    );
  }
}
