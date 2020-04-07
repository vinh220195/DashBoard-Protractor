import { by, element, browser } from "protractor";
import ManageTestPage from "./manage-test-page";
import GeneralPage from "./general-page";
import ElementWrapper from "../wrappers/element-wrapper";
import Account from "../dataObjects/user-account";

export default class LoginPage extends GeneralPage{
    // Elements
    private _txtUsername: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"Username\"]")));
    private _txtPassword: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"Password\"]")));
    private _btnLogin: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"logIn\"]")));
    
    // Methods

    /**
     * To Login into Dashboard to relatively manage things towards test builds.
     * @param username the value which used to login. 
     * @param password the value which used to login.
     * @returns {Promise<ManageTestPage>} the result which will be resolved when function finished.
     */
    public async login(account: Account): Promise<ManageTestPage> {
        try{
            let manageTestPage:ManageTestPage = new ManageTestPage();
            
            await this._txtUsername.sendKeys(account.getUsername());
            await this._txtPassword.sendKeys(account.getPassword());
            await this._btnLogin.click();
            await this.waitForPageLoaderDisappreared();
    
            return manageTestPage;
        }catch(ex){
            console.log("login failed by: " + ex);
        }
    }
};