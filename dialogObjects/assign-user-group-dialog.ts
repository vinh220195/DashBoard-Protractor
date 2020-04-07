import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import ElementWrapper from "../wrappers/element-wrapper";

export default class AssignUserGroupDialog {
    // Elements
    private _txtGroupName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"idGroupName\"]")));

    // Methods

    /**
     * To submit assign user group dialog
     * @param groupName the name of group which user is going to be assigned
     * @param submitType the value set (Cancel, Save) option
     */
    public async submitInfo(groupName: string = "", submitType: string = "Cancel"): Promise<void> {
        let btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[.=\"" + submitType + "\"]")));
        await CommonAction.selectOptionByValue(this._txtGroupName, groupName);
        await btnSave.click();
    }

}