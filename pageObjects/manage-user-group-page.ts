import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import SystemPermission from "../dataObjects/system-permission";
import TestPermission from "../dataObjects/test-permission";
import UserAccount from "../dataObjects/user-account";
import UserGroup from "../dataObjects/user-group";
import AddUserGroupDialog from "../dialogObjects/add-user-group-dialog";
import ConfirmationDialog from "../dialogObjects/confirmation-dialog";
import EditUserGroupDialog from "../dialogObjects/edit-user-group-dialog";
import BrowserWrapper from "../wrappers/browser-wrapper";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class ManageUserGroupPage extends GeneralPage {
    // Elements
    private _btnAddNewGroup: ElementWrapper = new ElementWrapper(element(by.xpath("//button[contains(text(),\"Group\")]")));
    private _txtSearchBox: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@type=\"search\"]")));
    private _btnEdit: ElementWrapper = new ElementWrapper(element(by.xpath("//button[contains(., \"edit\")]")));
    private _txtUGName: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@class=\"group-name\"]/label")));

    // Methods

    /**
     * To create new User group
     * @param userGroup the object that contains all information of an user group
     */
    public async createUserGroup(userGroup: UserGroup): Promise<void> {
        try {
            let createUserGroupDialog = new AddUserGroupDialog();
            await this._btnAddNewGroup.click();
            await createUserGroupDialog.submitInfo(userGroup);
            await this.waitForPageLoaderDisappreared();
            await BrowserWrapper.refresh();
        } catch (ex) {
            console.log("Creating User Group thrown error: " + ex);
        }
    }

    /**
     * To check User group exist or not
     * @param userGroup the object that contains all information of an user group
     */
    public async checkUserGroupExist(userGroup: UserGroup): Promise<Boolean> {
        try {
            await this._txtSearchBox.sendKeys(userGroup.getName());
            return (await new ElementWrapper(element(by.xpath("//mat-option[contains(., \"" + userGroup.getName() + "\")]"))).findElements()).length > 0;
        } catch (ex) {
            console.log("Checking User Group Exist thrown error: " + ex);
        }
    }

    /**
     * To search User group
     * @param usergroup the object that contains all information of an user group
     */
    public async searchUserGroup(usergroup: UserGroup): Promise<void> {
        try {
            await CommonAction.selectOptionByValue(this._txtSearchBox, usergroup.getName());
            await this.waitForPageLoaderDisappreared();
        } catch (ex) {
            console.log("Searhing User Group thrown error: " + ex);
        }
    }

    /**
     * To delete User group
     * @param userGroup the object that contains all information of an user group
     */
    public async deleteUserGroup(userGroup: UserGroup): Promise<void> {
        try {
            let editUserGroupDialog = new EditUserGroupDialog();
            let confirmationDialog = new ConfirmationDialog();
            await this.searchUserGroup(userGroup);
            this._btnEdit.click();
            await editUserGroupDialog.deleteUserGroup();
            await confirmationDialog.Submit(SubmitTypeEnum.YES);
            await this.waitForPageLoaderDisappreared();
        } catch (ex) {
            console.log("Deleting User Group thrown error: " + ex);
        }
    }

    /**
     * To edit an User group
     * @param oldUserGroup the object that contains all information of an old user group
     * @param newUserGroup the object that contains all information of an new user group
     */
    public async editUserGroup(oldUserGroup: UserGroup, newUserGroup: UserGroup): Promise<void> {
        try {
            let editUserGroupDialog = new EditUserGroupDialog();
            await this.searchUserGroup(oldUserGroup);
            await this._btnEdit.click();
            await editUserGroupDialog.editUserGroup(newUserGroup);
        } catch (ex) {
            console.log("Editing User Group thrown error: " + ex);
        }
    }

    /**
     * To check user group information 
     * @param userGroup The object that contains all information of an User group to check
     * @param isCheckUGName the boolean value define that User group name has to be checked or not
     * @param isCheckSystemPermission the boolean value define that system permission has to be checked or not
     * @param isCheckTestPermission the boolean value define that Test Permission has to be checked or not
     * @param isCheckUserInGroup the boolean value deinfe that User in group has to be checked or not
     */
    public async checkUserGroupInfo(userGroup: UserGroup, isCheckUGName: Boolean, isCheckSystemPermission: Boolean, isCheckTestPermission: Boolean, isCheckUserInGroup: Boolean): Promise<Boolean> {
        try {
            // Check user group name
            if (isCheckUGName) {
                if (await this._txtUGName.getText() != userGroup.getName()) {
                    return false;
                }
            }

            // Check system permissions
            if (isCheckSystemPermission) {
                if (!await this.checkSysPermissionInfo(userGroup.getlistSystemPermissions())) {
                    return false;
                }
                let radioBtnIsAdmin = new ElementWrapper(element(by.xpath("//input[@id=\"isAdmin_Yes_readonly\"]")));
                let radioBtnIsAbleToViewReport = new ElementWrapper(element(by.xpath("//input[@id=\"view_report_Yes_readonly\"]")));
                if (userGroup.getIsAmin() != await radioBtnIsAdmin.isSelected()) {
                    return false;
                }
                if (userGroup.getIsAbleToViewReport() != await radioBtnIsAbleToViewReport.isSelected()) {
                    return false;
                }
            }

            // Check Test permissions
            if (isCheckTestPermission) {
                let cbFullTestPermission = new ElementWrapper(element(by.xpath("//input[@id=\"full_permissions_test_readonly\"]")));
                let cbCreateTestPermission = new ElementWrapper(element(by.xpath("//input[@id=\"create_test_readonly\"]")));

                if (userGroup.getIsFullPermissionForTests() != (await cbFullTestPermission.isSelected())) {
                    return false;
                }
                if (userGroup.getIsAbleToCreateTest() != (await cbCreateTestPermission.isSelected())) {
                    return false;
                }
                if (!await this.checkSingleTestPermission(userGroup.getlistSingleTestPermissions())) {
                    return false;
                }
            }

            // Check user in group
            if (isCheckUserInGroup && !await this.checkUserInGroup(userGroup.getlistUsers())) {
                return false;
            }
            return true;
        } catch (ex) {
            console.log("Checking User Group Information thrown error: " + ex);
        }
    }

    public async checkUserInGroup(listUser: UserAccount[]): Promise<Boolean> {
        let cardTitles = await (new ElementWrapper(element(by.xpath("//div[@class=\"card-body\"]/h5"))).findElements());
        listUser.forEach(async (user) => {
            let flagExist = false;
            for (let i = 0; i < cardTitles.length; i++) {
                if (user.getUsername() == await cardTitles[i].getText()) {
                    flagExist = true;
                    continue;
                }
            }
            if (!flagExist) {
                return false;
            }
        });
        return true;
    }

    public async checkSingleTestPermission(listTestPermissiom: TestPermission[]): Promise<Boolean> {
        listTestPermissiom.forEach(async (testPermission) => {
            let cbRunPermission = new ElementWrapper(element(by.xpath("//div[span[text()=\"" + testPermission.getTestName() + "\"]]/..//input[@name=\"test_specific_perm_run\"]")));
            let cbViewPermission = new ElementWrapper(element(by.xpath("//div[span[text()=\"" + testPermission.getTestName() + "\"]]/..//input[@name=\"test_specific_perm_view\"]")));
            let cbEditPermission = new ElementWrapper(element(by.xpath("//div[span[text()=\"" + testPermission.getTestName() + "\"]]/..//input[@name=\"test_specific_perm_edit\"]")));
            let cbDeletePermission = new ElementWrapper(element(by.xpath("//div[span[text()=\"" + testPermission.getTestName() + "\"]]/..//input[@name=\"test_specific_perm_delete\"]")));
            if (testPermission.getIsAbleToRun() != await cbRunPermission.isSelected()) {
                return false;
            }
            if (testPermission.getIsAbleToView() != await cbViewPermission.isSelected()) {
                return false;
            }
            if (testPermission.getIsAbleToEdit() != await cbEditPermission.isSelected()) {
                return false;
            }
            if (testPermission.getIsAbleToDelete() != await cbDeletePermission.isSelected()) {
                return false;
            }
        });
        return true;
    }

    public async checkSysPermissionInfo(listSysPermission: SystemPermission[]): Promise<Boolean> {
        listSysPermission.forEach(async (sysPermission) => {
            let cbViewPermission = new ElementWrapper(element(by.xpath("//div[span[contains(., \"" + sysPermission.getGroupName() + ":\")]]/../..//div[label[contains(.,\"View\")]]//input[@type=\"checkbox\"]")));
            let cbCreatePermission = new ElementWrapper(element(by.xpath("//div[span[contains(., \"" + sysPermission.getGroupName() + ":\")]]/../..//div[label[contains(.,\"Create\")]]//input[@type=\"checkbox\"]")));
            let cbEditPermission = new ElementWrapper(element(by.xpath("//div[span[contains(., \"" + sysPermission.getGroupName() + ":\")]]/../..//div[label[contains(.,\"Edit\")]]//input[@type=\"checkbox\"]")));
            let cbDeletePermission = new ElementWrapper(element(by.xpath("//div[span[contains(., \"" + sysPermission.getGroupName() + ":\")]]/../..//div[label[contains(.,\"Delete\")]]//input[@type=\"checkbox\"]")));

            if (sysPermission.getIsAbleToView() != await cbViewPermission.isSelected()) {
                return false;
            }

            if (sysPermission.getIsAbleToCreate() != await cbCreatePermission.isSelected()) {
                return false;
            }

            if (sysPermission.getIsAbleToEdit() != await cbEditPermission.isSelected()) {
                return false;
            }

            if (sysPermission.getIsAbleToDelete() != await cbDeletePermission.isSelected()) {
                return false;
            }
        });
        return true;
    }
}