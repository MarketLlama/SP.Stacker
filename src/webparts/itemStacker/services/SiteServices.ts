
import { sp, ItemAddResult, WebEnsureUserResult } from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClient } from '@microsoft/sp-http';
import { SiteGroups, SiteGroup } from '@pnp/sp/src/sitegroups';

class SiteServices {
  private _client: MSGraphClient = {} as MSGraphClient;

  constructor(context: WebPartContext) {
    sp.setup({
      spfxContext: context
    });
  }

  public checkUserInGroup = async(groupName : string) => {
    return new Promise<any>( async (resolve, reject) => {
      const group : SiteGroup = await this._getGroup(groupName);
      const currentUser = await this._getCurrentUser();
      console.log(group.users);
    });
  }

  public getSiteGroupNames = () =>{
    return new Promise<string[]>((resolve, reject) => {
      try {
        sp.web.siteGroups.get().then((groups : any[]) =>{
          let groupNames = [];
          console.log(groups);
          groups.forEach(group =>{
            groupNames.push(group.Name);
          });
          resolve(groupNames);
        });
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  private _getGroup = (groupName : string) =>{
    return new Promise<SiteGroup>((resolve, reject) => {
      try {
        sp.web.siteGroups.getByName(groupName).get().then((group : SiteGroup) =>{
          console.log(group);
          resolve(group);
        });
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  private _getCurrentUser = () =>{
    return new Promise<any>((resolve, reject) => {
      try {
        sp.web.currentUser.get().then((user : any)=> {
          resolve(user);
        }, error => {
          console.log(error);
          reject();
        });
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }
}

export default SiteServices;
