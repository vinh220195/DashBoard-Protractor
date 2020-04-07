import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ReportingPage from "../../pageObjects/reporting-page";
import SingleTest from "../../dataObjects/single-test";

describe("SMOKE test - DB-00005", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let reportingPage: ReportingPage;
    let arrTest: SingleTest[];

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();

        arrTest = [];
        arrTest.push(new SingleTest("Brand Embassy TC3", "DO74", "#14 - Oct-21-2019 09:11 AM"));
        arrTest.push(new SingleTest("Brand Embassy TC4", "DO74", "#23 - Oct-21-2019 09:12 AM"));
        arrTest.push(new SingleTest("Central_NiceIntegrations_19.3_HF2_Automated", "HC22", "Oct-07-2019 07:00 AM"));
    });
    
    it("DB-00005 - Verify that User can make report of test successfully", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Navigate to "Reporting" page
        reportingPage = await manageTestPage.goToReportingPage();

        // 3. Select at least two test result to make report
        // 4. Click "Make Report" button
        await reportingPage.makeReport(arrTest);

        // VP: Report displayed correctly
        // Execution results match with search criteria
        // - Test name
        // - cluster

        expect(await reportingPage.checkReportInformation(arrTest)).toBe(true);
    });
    afterEach(async() =>{
        await reportingPage.logout();
    });
});