import { by, element } from "protractor";
import UserGroup from "../dataObjects/user-group";
import ElementWrapper from "../wrappers/element-wrapper";
import AddUserGroupDialog from "./add-user-group-dialog";

export default class EditUserGroupDialog extends AddUserGroupDialog {
    // Elements
    private _btnDeleteUserGroup: ElementWrapper = new ElementWrapper(element(by.xpath("//button[contains(., \"delete\")]")));

    // Methods

    /**
     * To delete an user group
     */
    public async deleteUserGroup(): Promise<void> {
        await this._btnDeleteUserGroup.click();
    }

    /**
     * To edit user group
     * @param userGroup the object that contains all the information of an user group
     */
    public async editUserGroup(userGroup: UserGroup): Promise<void> {
        //Edit Group name
        if (await this._txtGroupname.getText() != userGroup.getName()) {
            await this._txtGroupname.sendKeys(userGroup.getName());
        }

        // Edit system permission
        await this.setSystemPermission(userGroup.getlistSystemPermissions());

        // View Report permission
        await this.setViewReportPermission(userGroup.getIsAbleToViewReport());

        // Is admin permission
        await this.setIsAdminPermission(userGroup.getIsAmin());

        // Edit Test permission
        await this.setFullTestPermission(userGroup.getIsFullPermissionForTests());

        // Edit create Test permission
        await this.setCreateTestPermission(userGroup.getIsAbleToCreateTest());

        // Edit Single test permission
        await this.deleteAllSingleTestPermissions();
        await this.setTestPermission(userGroup.getlistSingleTestPermissions());

        // Edit user in group
        await this.deleteAllUserInGroup();
        await this.addUserIntoGroup(userGroup.getlistUsers());

        await this._btnAddUserGroup.click();
    }

    /**
     * To delete all single test permission on the list of user group
     */
    public async deleteAllSingleTestPermissions(): Promise<void> {
        let btnDelete = new ElementWrapper(element(by.xpath("//legend[.=\"Test permissions\"]/..//button[contains(., \"remove\")]")));
        (await btnDelete.findElements()).forEach(async (btn) => {
            await btn.click();
        });
    }

    /**
     * To delete all user in group
     */
    public async deleteAllUserInGroup(): Promise<void> {
        let btnDelete = new ElementWrapper(element(by.xpath("//div[contains(@class, \"user-container\")]//i[normalize-space(text())=\"cancel\"]")));
        (await btnDelete.findElements()).forEach(async (btn) => {
            await btn.click();
        });
    }
}