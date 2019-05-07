import * as React from 'react';
import styles from './ItemStacker.module.scss';
import { IItemStackerProps } from './IItemStackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import StackerAccordion from './accordion/StackerAccordion';
import SiteServices from '../services/SiteServices';

export default class ItemStacker extends React.Component<IItemStackerProps, {}> {
  public render(): React.ReactElement<IItemStackerProps> {
    return (
      <div className={ styles.itemStacker }>
        <div className={ styles.container }>
          <StackerAccordion items={this.props.collectionData}
          displayMode={this.props.displayMode}
          fnUpdate={this.props.fnSetText}/>
        </div>
      </div>
    );
  }

  public componentWillReceiveProps (nextProps : IItemStackerProps) {
    console.log(nextProps);
    if(nextProps.restrictedGroup !== this.props.restrictedGroup){
      const siteServices = new SiteServices(this.props.context);
      siteServices.checkUserInGroup(this.props.restrictedGroup);
    }
  }

  public componentDidMount() {
    if(this.props.restrictedGroup){
      const siteServices = new SiteServices(this.props.context);
      siteServices.checkUserInGroup(this.props.restrictedGroup);
    }
  }
}
