import Constant from "../../common/constant";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestResultPage from "../../pageObjects/test-result-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00003", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let testResultPage: TestResultPage;
    let testName: string;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        testName = "NOC_Smoke_UserHub_C32";
    });

    it("DB-00003 - Verify that User could open latest result of test from \"Manage Tests\" page", async () => {

        // 1. Log into Dashboard
        // 2. Navigate to "Manage Test" page
        manageTestPage = await loginPage.login(account);

        // 3. Search specified test
        await manageTestPage.searchTest(testName);

        // 4. Click "Open latest result" button on Action column
        testResultPage = await manageTestPage.openLatestResult(testName);

        // VP: User is navigated to "Test results" page with selected test suit
        expect(await testResultPage.getLblTestResultHeader()).toBe(testName);
    });

    afterEach(async () => {
        await testResultPage.logout();
    });
});