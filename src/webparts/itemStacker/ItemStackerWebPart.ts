import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import SiteServices from "./services/SiteServices";
import * as strings from 'ItemStackerWebPartStrings';
import ItemStacker from './components/ItemStacker';
import { IItemStackerProps } from './components/IItemStackerProps';
import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType
} from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';


export interface IItemStackerWebPartProps {
  collectionData: any[];
  numberOfItems : number;
}

export default class ItemStackerWebPart extends BaseClientSideWebPart<IItemStackerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IItemStackerProps > = React.createElement(
      ItemStacker,
      {
        collectionData: this.properties.collectionData? this.properties.collectionData : [],
        displayMode : this.displayMode
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected getStackItems = async () =>{
    const siteServices = new SiteServices(this.context);
    siteServices.checkUserInGroup('restricted');
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
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
                      id: "state",
                      title: "Is restricted?",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "no",
                          text: "No"
                        },
                        {
                          key: "yes",
                          text: "Yes"
                        }
                      ],
                      required: true
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
                PropertyFieldNumber("numberValue", {
                  key: "numberValue",
                  label: "Number of items",
                  description: "Number of accordion fields",
                  value: this.properties.numberOfItems,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
