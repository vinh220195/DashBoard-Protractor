import Constant from "../../common/constant";
import SingleTest from "../../dataObjects/single-test";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00001", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let test: SingleTest;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        test = new SingleTest("CreateTest - SC3 - Chrome", "", "");
    });

    it("DB-00001 - Verify that User can view test(s) list when navigate to \"Manage Tests\" page", async () => {
        // 1. Log into Dashboard
        // 2. Navigate to "Manage Test" page
        manageTestPage = await loginPage.login(account);

        // VP: User's assigned tests displayed
        expect(await manageTestPage.checkTestExist(test)).toBe(true);
    });

    afterEach(async () => {
        await manageTestPage.logout();
    });
});