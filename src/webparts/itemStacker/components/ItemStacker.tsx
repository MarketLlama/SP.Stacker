import * as React from 'react';
import styles from './ItemStacker.module.scss';
import { IItemStackerProps } from './IItemStackerProps';
import StackerAccordion from './accordion/StackerAccordion';
import SiteServices from '../services/SiteServices';

export interface IItemStackerState {
  restrictedUser : boolean;
}

export default class ItemStacker extends React.Component<IItemStackerProps, IItemStackerState> {
  /**
   *
   */
  constructor(props : IItemStackerProps) {
    super(props);
    this.state ={
      restrictedUser : false
    };
    console.log(this.props.restrictedGroup);
  }
  public render(): React.ReactElement<IItemStackerProps> {
    return (
      <div className={styles.itemStacker}>
        <div className={styles.container}>
          <StackerAccordion items={this.props.collectionData}
            userInRestricted = {this.state.restrictedUser}
            displayMode={this.props.displayMode}
            fnUpdate={this.props.fnSetText} />
        </div>
      </div>
    );
  }

  public componentWillReceiveProps = (nextProps: IItemStackerProps) =>{
    if (nextProps.restrictedGroup !== this.props.restrictedGroup) {
      const siteServices = new SiteServices(this.props.context);
      siteServices.checkUserInGroup(nextProps.restrictedGroup).then(check =>{
        this.setState({
          restrictedUser : check
        });
      });
    }
  }

  public componentDidMount = () => {
    if (this.props.restrictedGroup) {
      const siteServices = new SiteServices(this.props.context);
      siteServices.checkUserInGroup(this.props.restrictedGroup).then(check =>{
        this.setState({
          restrictedUser : check
        });
      });
    }
  }
}
