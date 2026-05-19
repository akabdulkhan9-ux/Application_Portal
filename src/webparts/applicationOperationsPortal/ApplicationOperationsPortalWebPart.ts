

// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// import * as strings from 'ApplicationOperationsPortalWebPartStrings';
// import ApplicationOperationsPortal from './components/ApplicationOperationsPortal';
// import { IApplicationOperationsPortalProps } from './components/IApplicationOperationsPortalProps';
// import { initPnPjs } from './services/pnpjsConfig';

// export interface IApplicationOperationsPortalWebPartProps {
//   description: string;
// }

// export default class ApplicationOperationsPortalWebPart extends BaseClientSideWebPart<IApplicationOperationsPortalWebPartProps> {

//   protected onInit(): Promise<void> {
//     // Initialize PnPjs with SharePoint context
//     initPnPjs(this.context);
//     return super.onInit();
//   }

//   public render(): void {
//     const element: React.ReactElement<IApplicationOperationsPortalProps> = React.createElement(
//       ApplicationOperationsPortal,
//       {
//         description: this.properties.description,
//         isDarkTheme: false,
//         environmentMessage: '',
//         hasTeamsContext: !!this.context.sdks.microsoftTeams,
//         userDisplayName: this.context.pageContext.user.displayName
//       }
//     );

//     ReactDom.render(element, this.domElement);
//   }

//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected get dataVersion(): Version {
//     return Version.parse('1.0');
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: strings.PropertyPaneDescription
//           },
//           groups: [
//             {
//               groupName: strings.BasicGroupName,
//               groupFields: [
//                 PropertyPaneTextField('description', {
//                   label: strings.DescriptionFieldLabel
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
// }

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ApplicationOperationsPortalWebPartStrings';
import ApplicationOperationsPortal from './components/ApplicationOperationsPortal';
import { IApplicationOperationsPortalProps } from './components/IApplicationOperationsPortalProps';

export interface IApplicationOperationsPortalWebPartProps {
  description: string;
}

export default class ApplicationOperationsPortalWebPart extends BaseClientSideWebPart<IApplicationOperationsPortalWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IApplicationOperationsPortalProps> = React.createElement(
      ApplicationOperationsPortal,
      {
        description: this.properties.description,
        isDarkTheme: false,
        environmentMessage: '',
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        spfxContext: this.context  // Pass context for PnPjs
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}