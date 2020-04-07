import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageUserPage from "../../pageObjects/manage-user-page";

describe("SMOKE test - DB-00008", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageUserPage: ManageUserPage;
    let newUser: UserAccount;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        newUser = new UserAccount("Smoke Test DB08", Constant.DEFAULT_PWD, Constant.DEFAULT_EMAIL);

        // Init Pre-condition
        manageTestPage = await loginPage.login(account);
        manageUserPage = await manageTestPage.goToManageUserPage();
        await manageUserPage.createNewUser(newUser);
        await manageUserPage.logout();
    });
    
    it("DB-00008 - Verify that an User can delete other user", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Users" list item
        manageUserPage = await manageTestPage.goToManageUserPage();

        // 4. Search specified user to delete
        // 5. Click "Delete User" button
        // 6. Click "Yes" on confirmation dialog
        await manageUserPage.deleteUser(newUser);

        // VP: User cannot be found on table
        expect(await manageUserPage.checkUserExist(newUser)).toBe(false);
    });
    afterEach(async () => {
        await manageUserPage.logout();
    });
});