import Constant from "../../common/constant";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00002", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let tabName: string;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        tabName = "TestTab";
    });

    it("DB-00002 - Verify that User can create new tab on \"Manage Tests\" page", async () => {

        // 1. Log into Dashboard
        // 2. Navigate to "Manage Test" page
        manageTestPage = await loginPage.login(account);

        // 3. Click add new tab button
        // 4. Submit "Create New Tab" dialog
        manageTestPage = await manageTestPage.createNewTab(tabName, "");

        // VP: New tab created on tab menu bar
        expect(await manageTestPage.checkTabExist(tabName, TimeWaitEnum.SHORT_TIME_SEC)).toBe(true);
    });

    afterEach(async () => {
        // Clean up
        await manageTestPage.deleteTab(tabName);
        await manageTestPage.logout();
    });
});