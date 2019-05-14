# Upgrade project SP.Stacker to v1.8.0

Date: 2019-5-14

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.8.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i @microsoft/sp-core-library@1.8.0 -SE
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i @microsoft/sp-lodash-subset@1.8.0 -SE
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i @microsoft/sp-office-ui-fabric-core@1.8.0 -SE
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i @microsoft/sp-webpart-base@1.8.0 -SE
```

File: [./package.json](./package.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i react@16.7.0 -SE
```

File: [./package.json](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i react-dom@16.7.0 -SE
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i @microsoft/sp-build-web@1.8.0 -DE
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i @microsoft/sp-module-interfaces@1.8.0 -DE
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i @microsoft/sp-webpart-workbench@1.8.0 -DE
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Install SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i @microsoft/sp-tslint-rules@1.8.0 -DE
```

File: [./package.json](./package.json)

### FN002010 @microsoft/rush-stack-compiler-2.7 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.7

Execute the following command:

```sh
npm i @microsoft/rush-stack-compiler-2.7@0.4.0 -DE
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src/webparts/itemStacker/ItemStackerWebPart.manifest.json](src/webparts/itemStacker/ItemStackerWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src/webparts/itemStacker/ItemStackerWebPart.manifest.json](src/webparts/itemStacker/ItemStackerWebPart.manifest.json)

### FN012014 tsconfig.json compiler options inlineSources | Required

Update tsconfig.json inlineSources value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012015 tsconfig.json compiler options strictNullChecks | Required

Update tsconfig.json strictNullChecks value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012016 tsconfig.json compiler options noUnusedLocals | Required

Update tsconfig.json noUnusedLocals value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.7/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src/webparts/itemStacker/ItemStackerWebPart.ts](src/webparts/itemStacker/ItemStackerWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
```

File: [src/webparts/itemStacker/ItemStackerWebPart.ts:4:1](src/webparts/itemStacker/ItemStackerWebPart.ts)

### FN014006 sourceMapPathOverrides in .vscode/launch.json | Recommended

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*"

In file [.vscode/launch.json](.vscode/launch.json) update the code as follows:

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

File: [.vscode/launch.json](.vscode/launch.json)

### FN014006 sourceMapPathOverrides in .vscode/launch.json | Recommended

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*"

In file [.vscode/launch.json](.vscode/launch.json) update the code as follows:

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

File: [.vscode/launch.json](.vscode/launch.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

In file [./package.json](./package.json) update the code as follows:

```json
{
  "resolutions": {
    "@types/react": "16.4.2"
  }
}
```

File: [./package.json](./package.json)

### FN001005 @types/react | Required

Upgrade SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm i @types/react@16.4.2 -SE
```

File: [./package.json](./package.json)

### FN001006 @types/react-dom | Required

Upgrade SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm i @types/react-dom@16.0.5 -SE
```

File: [./package.json](./package.json)

### FN002008 tslint-microsoft-contrib | Required

Remove SharePoint Framework dev dependency package tslint-microsoft-contrib

Execute the following command:

```sh
npm un tslint-microsoft-contrib -D
```

File: [./package.json](./package.json)

### FN006003 package-solution.json isDomainIsolated | Required

Update package-solution.json isDomainIsolated

In file [./config/package-solution.json](./config/package-solution.json) update the code as follows:

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

File: [./config/package-solution.json](./config/package-solution.json)

### FN010007 .yo-rc.json isDomainIsolated | Recommended

Update isDomainIsolated in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN018001 Web part Microsoft Teams tab resources folder | Optional

Create folder for Microsoft Teams tab resources

Execute the following command:

```sh
mkdir /Users/mark/Source/repos/SP.Stacker/teams_itemStacker
```

File: [teams_itemStacker](teams_itemStacker)

### FN018002 Web part Microsoft Teams tab manifest | Optional

Create Microsoft Teams tab manifest for the web part

Execute the following command:

```sh
cat > /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/manifest.json << EOF
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "Item Stacker",
  "id": "07442648-3fec-4d71-9a5b-46ae6322773e",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "Item Stacker"
  },
  "description": {
    "short": "Item Stacker description",
    "full": "Item Stacker description"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=07442648-3fec-4d71-9a5b-46ae6322773e",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
```

File: [teams_itemStacker/manifest.json](teams_itemStacker/manifest.json)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp /usr/local/lib/node_modules/@pnp/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab20x20.png /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/tab20x20.png
```

File: [teams_itemStacker/tab20x20.png](teams_itemStacker/tab20x20.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp /usr/local/lib/node_modules/@pnp/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab96x96.png /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/tab96x96.png
```

File: [teams_itemStacker/tab96x96.png](teams_itemStacker/tab96x96.png)

### FN019001 tslint.json rulesDirectory | Required

Remove rulesDirectory from tslint.json

In file [./tslint.json](./tslint.json) update the code as follows:

```json
{
  "rulesDirectory": []
}
```

File: [./tslint.json](./tslint.json)

### FN019002 tslint.json extends | Required

Update tslint.json extends property

In file [./tslint.json](./tslint.json) update the code as follows:

```json
{
  "extends": "@microsoft/sp-tslint-rules/base-tslint.json"
}
```

File: [./tslint.json](./tslint.json)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm i @microsoft/sp-core-library@1.8.0 @microsoft/sp-lodash-subset@1.8.0 @microsoft/sp-office-ui-fabric-core@1.8.0 @microsoft/sp-webpart-base@1.8.0 react@16.7.0 react-dom@16.7.0 @types/react@16.4.2 @types/react-dom@16.0.5 -SE
npm i @microsoft/sp-build-web@1.8.0 @microsoft/sp-module-interfaces@1.8.0 @microsoft/sp-webpart-workbench@1.8.0 @microsoft/sp-tslint-rules@1.8.0 @microsoft/rush-stack-compiler-2.7@0.4.0 -DE
npm un tslint-microsoft-contrib -D
mkdir /Users/mark/Source/repos/SP.Stacker/teams_itemStacker
cat > /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/manifest.json << EOF
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "Item Stacker",
  "id": "07442648-3fec-4d71-9a5b-46ae6322773e",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "Item Stacker"
  },
  "description": {
    "short": "Item Stacker description",
    "full": "Item Stacker description"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=07442648-3fec-4d71-9a5b-46ae6322773e",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
cp /usr/local/lib/node_modules/@pnp/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab20x20.png /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/tab20x20.png
cp /usr/local/lib/node_modules/@pnp/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab96x96.png /Users/mark/Source/repos/SP.Stacker/teams_itemStacker/tab96x96.png
npm dedupe
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.0"
  }
}
```

Update isDomainIsolated in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}
```

#### [src/webparts/itemStacker/ItemStackerWebPart.manifest.json](src/webparts/itemStacker/ItemStackerWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json inlineSources value:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

Update tsconfig.json strictNullChecks value:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

Update tsconfig.json noUnusedLocals value:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.7/includes/tsconfig-web.json"
}
```

#### [src/webparts/itemStacker/ItemStackerWebPart.ts](src/webparts/itemStacker/ItemStackerWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
```

#### [.vscode/launch.json](.vscode/launch.json)

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*":

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

In the .vscode/launch.json file, for each configuration, in the sourceMapPathOverrides property, add "webpack:///.././src/*": "${webRoot}/src/*":

```json
{
  "configurations": [
    {
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "16.4.2"
  }
}
```

#### [./config/package-solution.json](./config/package-solution.json)

Update package-solution.json isDomainIsolated:

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

#### [./tslint.json](./tslint.json)

Remove rulesDirectory from tslint.json:

```json
{
  "rulesDirectory": []
}
```

Update tslint.json extends property:

```json
{
  "extends": "@microsoft/sp-tslint-rules/base-tslint.json"
}
```
