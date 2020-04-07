import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestResultPage from "../../pageObjects/test-result-page";
import TestSuite from "../../dataObjects/test-suite";
import UserAccount from "../../dataObjects/user-account";

describe("SMOKE test - DB-00004", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let testResultPage: TestResultPage;
    let testSuite: TestSuite;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        let fromDate: Date = null;
        let toDate: Date = null;
        testSuite = new TestSuite("MAX", "SC11", "Chrome", "Latest", fromDate, toDate);
    });
    
    it("DB-00004 - Verify that User can get the execution result on Test Results page", async () => {
        
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Navigate to "Test Results" page
        testResultPage = await manageTestPage.goToTestResultsPage();

        // 3. Enter valid test information
        // 4. Click search button
        await testResultPage.searchTestSuite(testSuite);

        // VP: Test result displayed correctly:
        //    - Execution results match with search criteria(Test name, cluster, browser)
        expect(await testResultPage.getLblTestResultHeader()).toBe(testSuite.getName() + " - " + testSuite.getCluster() + " - " + testSuite.getBrowser());
        expect(await testResultPage.checkTestSuiteInfo("Cluster", testSuite.getCluster())).toBe(true);
        expect(await testResultPage.checkTestSuiteInfo("Browser", testSuite.getBrowser())).toBe(true);
    });
    afterEach(async () => {
        await testResultPage.logout();
    });
});