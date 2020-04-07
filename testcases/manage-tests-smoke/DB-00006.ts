import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageUserPage from "../../pageObjects/manage-user-page";

describe("SMOKE test - DB-00006", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageUserPage: ManageUserPage;
    let newUser: UserAccount;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        newUser = new UserAccount("Smoke Test DB06", Constant.DEFAULT_PWD, Constant.DEFAULT_EMAIL);
    });
    
    it("DB-00006 - Verify that User can create new user", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Users" list item
        manageUserPage = await manageTestPage.goToManageUserPage();

        // 4. Click "+ User" button
        // 5. Fill the form and submit "Add New User" dialog
        await manageUserPage.createNewUser(newUser);

        // VP: User could be searched in user table
        expect(await manageUserPage.checkUserExist(newUser)).toBe(true);
    });

    afterEach(async() =>{
        await manageUserPage.deleteUser(newUser);
        await manageUserPage.logout();
    });
});