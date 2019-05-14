import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartPropertiesMetadata,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import SiteServices from "./services/SiteServices";
import * as strings from 'ItemStackerWebPartStrings';
import ItemStacker from './components/ItemStacker';
import { IItemStackerProps } from './components/IItemStackerProps';
import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType
} from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';


export interface IItemStackerWebPartProps {
  collectionData: any[];
  numberOfItems : number;
  restrictedGroup : string;
}

export default class ItemStackerWebPart extends BaseClientSideWebPart<IItemStackerWebPartProps> {

  private dropdownOptions: IPropertyPaneDropdownOption[] = [];
  private loadingIndicator: boolean = true;

  public render(): void {
    const siteServices = new SiteServices(this.context);
    const groupName = this.properties.restrictedGroup? this.properties.restrictedGroup : '';
    siteServices.checkUserInGroup(groupName).then(isInGroup =>{
      const element: React.ReactElement<IItemStackerProps > = React.createElement(
        ItemStacker,
        {
          context : this.context,
          collectionData: this.properties.collectionData? this.properties.collectionData : [],
          displayMode : this.displayMode,
          fnSetText : (value : string , index : number) =>{
            this.properties.collectionData[index].text = value;
          },
          userInRestrictedGroup : isInGroup,
          fPropertyPaneOpen: this.context.propertyPane.open
        }
      );

      ReactDom.render(element, this.domElement);
    });

  }

  protected onPropertyPaneConfigurationStart(): void {
    this.getSiteGroups().then((response) => {
      this.dropdownOptions = response;
      this.context.propertyPane.refresh();
      this.loadingIndicator = false;
    });
  }

  protected getSiteGroups = () =>{
    return new Promise<IPropertyPaneDropdownOption[]>(async (resolve, reject) => {
      try {
        let options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        const siteServices = new SiteServices(this.context);
        const groups = await siteServices.getSiteGroupNames();
        for (const group of groups) {
          options.push({
            key : group,
            text : group
          });
        }
        resolve(options);
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'collectionData': { isSearchablePlainText: true }
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      showLoadingIndicator: this.loadingIndicator,
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "name",
                      title: "Name",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "isRestricted",
                      title: "Is restricted?",
                      type: CustomCollectionFieldType.boolean,
                    },
                    {
                      id: "show",
                      title: "Show",
                      type: CustomCollectionFieldType.boolean
                    },
                    {
                      id: "isOpen",
                      title: "Is Open?",
                      type: CustomCollectionFieldType.boolean
                    }
                  ],
                  disabled: false
                }),
                PropertyPaneDropdown('restrictedGroup', {
                  label: "Select Restricted Group",
                  options: this.dropdownOptions,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
