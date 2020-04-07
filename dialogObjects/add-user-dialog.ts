import ElementWrapper from "../wrappers/element-wrapper";
import { element, by } from "protractor";

export default class AddUserDialog {
    // Elements
    private _txtUsername: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"Username\"]")));
    private _txtNewPassword: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"newPassword\"]")));
    private _txtConfirmPass: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"confirmPass\"]")));
    private _txtEmail: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"Email\"]")));
    private _btnSaveUser: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnSaveUser\"]")));
    
    // Methods

    /**
     * To submit information of user which is going to be added
     * @param username the name of user used for loging in
     * @param newPassword the password of user used for login in
     * @param confirmPass the comfirmation of password
     * @param email the email of user
     */
    public async submitInfo(username: string, newPassword: string, confirmPass: string, email: string): Promise<void> {
        await this._txtUsername.sendKeys(username);
        await this._txtNewPassword.sendKeys(newPassword);
        await this._txtConfirmPass.sendKeys(confirmPass);
        await this._txtEmail.sendKeys(email);
        await this._btnSaveUser.click();
    }

}