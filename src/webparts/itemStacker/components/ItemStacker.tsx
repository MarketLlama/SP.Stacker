import * as React from 'react';
import styles from './ItemStacker.module.scss';
import { IItemStackerProps } from './IItemStackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import StackerAccordion from './accordion/StackerAccordion';

export default class ItemStacker extends React.Component<IItemStackerProps, {}> {
  public render(): React.ReactElement<IItemStackerProps> {
    return (
      <div className={ styles.itemStacker }>
        <div className={ styles.container }>
          <StackerAccordion items={this.props.collectionData} displayMode={this.props.displayMode}/>
        </div>
      </div>
    );
  }
}
