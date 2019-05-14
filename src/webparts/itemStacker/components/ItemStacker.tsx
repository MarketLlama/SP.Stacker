import * as React from 'react';
import styles from './ItemStacker.module.scss';
import { IItemStackerProps } from './IItemStackerProps';
import StackerAccordion from './accordion/StackerAccordion';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';


export default class ItemStacker extends React.Component<IItemStackerProps, {}> {
  /**
   *
   */
  constructor(props: IItemStackerProps) {
    super(props);
  }
  public render(): React.ReactElement<IItemStackerProps> {
    return (
      <div className={styles.itemStacker}>
        <div className={styles.container}>
          {this.props.collectionData && this.props.collectionData.length > 0 ? (
            <StackerAccordion items={this.props.collectionData}
              userInRestricted={this.props.userInRestrictedGroup}
              displayMode={this.props.displayMode}
              fnUpdate={this.props.fnSetText} />)
            : (
              <Placeholder
                iconName='Edit'
                iconText={'Configure your accordion'}
                description={'Please configure the web part in order to show tiles the accordion'}
                buttonLabel={'Configure'}
                onConfigure={this.props.fPropertyPaneOpen} />
            )
          }
        </div>
      </div>
    );
  }
}
