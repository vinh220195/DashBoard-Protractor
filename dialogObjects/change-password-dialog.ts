import ElementWrapper from "../wrappers/element-wrapper";
import { element, by } from "protractor";

export default class ChangePasswordDialog {
    // Elements
    private _txtNewPassword: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"newPassword\"]")));
    private _txtConfirmPass: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"confirmPass\"]")));
    private _btnSaveUser: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnEditUser\"]")));
    
    // Methods

    /**
     * To change password of user
     * @param newPassword the new value of password
     * @param confirmPass the value of password confirmation
     */
    public async submitInfo(newPassword: string, confirmPass: string): Promise<void> {
        await this._txtNewPassword.sendKeys(newPassword);
        await this._txtConfirmPass.sendKeys(confirmPass);
        await this._btnSaveUser.click();
    }

}