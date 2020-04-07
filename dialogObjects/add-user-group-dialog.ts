import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import SystemPermission from "../dataObjects/system-permission";
import TestPermission from "../dataObjects/test-permission";
import UserAccount from "../dataObjects/user-account";
import UserGroup from "../dataObjects/user-group";
import ElementWrapper from "../wrappers/element-wrapper";

export default class AddUserGroupDialog {
    // Elements
    protected _txtGroupname: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtGroupName\"]")));
    protected _txtUserName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"inputUserName\"]")));
    protected _btnAddUserGroup: ElementWrapper = new ElementWrapper(element(by.xpath("//button[contains(., \"Save\")]")));

    // Methods

    /**
     * 
     * @param userGroup the object that contains all information of an user group
     */
    public async submitInfo(userGroup: UserGroup): Promise<void> {
        let listSystemPermissions = userGroup.getlistSystemPermissions();
        let listSingleTestPermissions = userGroup.getlistSingleTestPermissions();
        let listUsers = userGroup.getlistUsers();

        // User group name
        await this._txtGroupname.sendKeys(userGroup.getName());

        // System Permission
        await this.setSystemPermission(listSystemPermissions);

        // Is Admin
        await this.setIsAdminPermission(userGroup.getIsAmin());

        // View report permisstion
        await this.setViewReportPermission(userGroup.getIsAbleToViewReport());

        // Test permission
        await this.setFullTestPermission(userGroup.getIsFullPermissionForTests());
        await this.setCreateTestPermission(userGroup.getIsAbleToCreateTest());
        await this.setTestPermission(listSingleTestPermissions);
        await this.addUserIntoGroup(listUsers);

        // Click Save
        await this._btnAddUserGroup.click();
    }

    /**
     * To set system permission of an user group
     * @param listSystemPermissions the list of the system permission
     */
    public async setSystemPermission(listSystemPermissions: SystemPermission[]): Promise<void> {
        for (let i = 0; i < listSystemPermissions.length; i++) {
            let sysPermission = listSystemPermissions[i];
            await this.selectPermission(sysPermission.getGroupName(), "Full Permission", sysPermission.getIsFullPermission());
            await this.selectPermission(sysPermission.getGroupName(), "View", sysPermission.getIsAbleToView());
            await this.selectPermission(sysPermission.getGroupName(), "Create", sysPermission.getIsAbleToCreate());
            await this.selectPermission(sysPermission.getGroupName(), "Edit", sysPermission.getIsAbleToEdit());
            await this.selectPermission(sysPermission.getGroupName(), "Delete", sysPermission.getIsAbleToDelete());
        }
    }

    /**
     * To set admin permission
     * @param isAdmin the boolean value which point out user in group is admin or not
     */
    public async setIsAdminPermission(isAdmin: Boolean): Promise<void> {
        if (isAdmin) {
            let radioBtnIsAdmin = new ElementWrapper(element(by.xpath("//input[@id=\"isAdmin_Yes\"]/following-sibling::label")));
            await radioBtnIsAdmin.click();
        }
        else if (!isAdmin) {
            let radioBtnIsAdmin = new ElementWrapper(element(by.xpath("//input[@id=\"isAdmin_No\"]/following-sibling::label")));
            await radioBtnIsAdmin.click();
        }
    }

    /**
     * To set view report permission of group
     * @param isAbleToViewReport the boolean value which point out user in group could view report or not
     */
    public async setViewReportPermission(isAbleToViewReport: Boolean): Promise<void> {
        if (isAbleToViewReport) {
            let radioBtnIsAbleToViewReport = new ElementWrapper(element(by.xpath("//input[@id=\"view_report_Yes\"]/following-sibling::label")));
            await radioBtnIsAbleToViewReport.click();
        }
        else {
            let radioBtnIsAbleToViewReport = new ElementWrapper(element(by.xpath("//input[@id=\"view_report_No\"]/following-sibling::label")));
            await radioBtnIsAbleToViewReport.click();
        }
    }

    /**
     * To set full test permission
     * @param isFullPermisstion the boolean value which point out user in group has full permission of all tests or not
     */
    public async setFullTestPermission(isFullPermisstion: Boolean): Promise<void> {
        let cbxfullPermissionTest = new ElementWrapper(element(by.xpath("//input[@id=\"full_permissions_test\"]/..")));
        if (isFullPermisstion != await cbxfullPermissionTest.isSelected()) {
            await cbxfullPermissionTest.click();
        }
    }

    /**
     * To add users into group
     * @param listUsers the list of user which to be added
     */
    public async addUserIntoGroup(listUsers: UserAccount[]): Promise<void> {
        for (let i = 0; i < listUsers.length; i++) {
            let user = listUsers[i];
            await CommonAction.selectOptionByValue(this._txtUserName, user.getUsername());
        }
    }

    /**
     * To set create test permission for user in group
     * @param isAbleToCreateTest the boolean value which point out user in group could create new test or not
     */
    public async setCreateTestPermission(isAbleToCreateTest: Boolean): Promise<void> {
        let cbxCreateTest = new ElementWrapper(element(by.xpath("//input[@id=\"create_test\"]")));
        if (isAbleToCreateTest != await cbxCreateTest.isSelected()) {
            await (new ElementWrapper(element(by.xpath("//input[@id=\"create_test\"]/following-sibling::label")))).click();
        }
    }

    /**
     * To set permission of each tests in list
     * @param listSingleTestPermissions the list of single test permissions
     */
    public async setTestPermission(listSingleTestPermissions: TestPermission[]): Promise<void> {
        let txtTestName = new ElementWrapper(element(by.xpath("//input[@id=\"txtTestName\"]")));
        let btnAdd = new ElementWrapper(element(by.xpath("//button[contains(.,\"Add\")]")));
        for (let i = 0; i < listSingleTestPermissions.length; i++) {
            let testPermission = listSingleTestPermissions[i];
            await CommonAction.selectOptionByValue(txtTestName, testPermission.getTestName());
            await btnAdd.click();
            await this.selectPermission(testPermission.getTestName(), "Full Permission", testPermission.getIisFullPermission());
            await this.selectPermission(testPermission.getTestName(), "Run", testPermission.getIsAbleToRun());
            await this.selectPermission(testPermission.getTestName(), "View", testPermission.getIsAbleToView());
            await this.selectPermission(testPermission.getTestName(), "Edit", testPermission.getIsAbleToEdit());
            await this.selectPermission(testPermission.getTestName(), "Delete", testPermission.getIsAbleToDelete());
        }
    }

    /**
     * To select permission base on groupname, permission name and decision to check or not
     * @param groupName the name of group permission
     * @param permission the permission name of group which contaisn this permission
     * @param isCheck the decision to check or not
     */
    public async selectPermission(groupName: string, permission: string, isCheck: Boolean): Promise<void> {
        let cbXpath = "//app-add-edit-user-group//div[span[contains(., \"" + groupName + "\")]]/../..//div[label[contains(.,\"" + permission + "\")]]//input[@type=\"checkbox\"]";
        let cbPermission = new ElementWrapper(element(by.xpath(cbXpath)));
        if ((isCheck && !await cbPermission.isSelected()) || (!isCheck && await cbPermission.isSelected())) {
            await new ElementWrapper(element(by.xpath(cbXpath + "/following-sibling::label"))).click();
        }
    }

}