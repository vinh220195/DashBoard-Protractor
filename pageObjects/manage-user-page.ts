import { by, element, Locator } from "protractor";
import CommonAction from "../common/common-action";
import TableRecordCriteria from "../dataObjects/searching-criteria";
import UserAccount from "../dataObjects/user-account";
import AddUserDialog from "../dialogObjects/add-user-dialog";
import AssignUserGroupDialog from "../dialogObjects/assign-user-group-dialog";
import ChangePasswordDialog from "../dialogObjects/change-password-dialog";
import ConfirmationDialog from "../dialogObjects/confirmation-dialog";
import BrowserWrapper from "../wrappers/browser-wrapper";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class ManageUser extends GeneralPage {
    // Elements
    private _btnAddNewUser: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAddTestModal\"]")));
    private _txtSearchBox: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@id=\"tableUsers_filter\"]//input")));

    // Methods

    /**
     * To create new user
     * @param userAccount the object which contains all information of an user
     */
    public async createNewUser(userAccount: UserAccount): Promise<void> {
        try {
            let addNewUserDialog = new AddUserDialog();
            let assignUserGroupDialog = new AssignUserGroupDialog();
            await this._btnAddNewUser.click();
            await addNewUserDialog.submitInfo(userAccount.getUsername(), userAccount.getPassword(), userAccount.getPassword(), userAccount.getEmail());
            await assignUserGroupDialog.submitInfo();

            await BrowserWrapper.refresh();
            await this.waitForPageLoaderDisappreared();
        } catch (ex) {
            console.log("Creating new user thrown error: " + ex);
        }
    }

    /**
     * To search user
     * @param userAccount the object which contains all information of an user
     */
    public async searchUser(userAccount: UserAccount): Promise<void> {
        await this._txtSearchBox.sendKeys(userAccount.getUsername() + " " + userAccount.getEmail());
    }

    /**
     * To check whether user exist on table or not
     * @param userAccount the object which contains all information of an user
     */
    public async checkUserExist(userAccount: UserAccount): Promise<Boolean> {
        try {
            await this.searchUser(userAccount);
            let byTdRecord: Locator = by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("User", userAccount.getUsername()), new TableRecordCriteria("Email", userAccount.getEmail())));
            let tdRecord: ElementWrapper = new ElementWrapper(byTdRecord);
            let arrSize = (await tdRecord.findElements()).length;
            if (arrSize > 0) {
                return true;
            }
            return false;
        } catch (ex) {
            console.log("Checking user exist thrown error: " + ex);
        }
    }

    /**
     * To delete User
     * @param userAccount the object which contains all information of an user
     */
    public async deleteUser(userAccount: UserAccount): Promise<void> {
        try {
            let btnDelete: ElementWrapper = new ElementWrapper(by.xpath(CommonAction.generateTooltipXpath("Delete User")));
            let cDialog = new ConfirmationDialog();
            await this.searchUser(userAccount);
            await btnDelete.click();
            await cDialog.Submit(SubmitTypeEnum.YES);
        } catch (ex) {
            console.log("Deleting user thrown error: " + ex);
        }
    }

    /**
     * To change user's password
     * @param userAccount the object which contains all information of an user
     * @param newPassword the new value of user's password
     * @param confirmPassword the confirmation of new password
     */
    public async changeUserPassword(userAccount: UserAccount, newPassword: string, confirmPassword: string = newPassword): Promise<void> {
        try{
            let btnChangePwd: ElementWrapper = new ElementWrapper(by.xpath(CommonAction.generateTooltipXpath("Change Password")));
            let changePwdDialog = new ChangePasswordDialog();
            await this.searchUser(userAccount);
            await btnChangePwd.click();
            await changePwdDialog.submitInfo(newPassword, confirmPassword);
            await this.waitForPageLoaderDisappreared();
            await BrowserWrapper.refresh();
        }catch(ex){
            console.log("Changing User password thrown error: " + ex);
        }
    }
}