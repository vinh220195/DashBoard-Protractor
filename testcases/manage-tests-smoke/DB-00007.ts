import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageUserPage from "../../pageObjects/manage-user-page";

describe("SMOKE test - DB-00007", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageUserPage: ManageUserPage;
    let newPassword: string;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        newPassword = "Test123!@#!@#";
    });
    
    it("DB-00007 - Verify that an User can change password of other user", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Users" list item
        manageUserPage = await manageTestPage.goToManageUserPage();

        // 4. Click "Change password" button of specified user
        // 5. Submit "Change Password" dialog with valid input
        await manageUserPage.changeUserPassword(account, newPassword);
        account.setPassword(newPassword);

        // VP: Verify that User could login with new password
        loginPage = await manageUserPage.logout();
        manageTestPage = await loginPage.login(account);
        expect(await manageTestPage.getPageHeader()).toBe("Manage Tests");
    });

    afterEach(async () => {
        // change password to original.
        manageUserPage = await manageTestPage.goToManageUserPage();
        await manageUserPage.changeUserPassword(account, Constant.DEFAULT_PWD);
        await manageUserPage.logout();
    });
});