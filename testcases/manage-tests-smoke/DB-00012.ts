import Constant from "../../common/constant";
import TestAgent from "../../dataObjects/test-agent";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestBase from "../test-base";
import ManageTestAgentPage from "../../pageObjects/manage-test-agent-page";

describe("SMOKE test - DB-00012", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageTestAgentPage: ManageTestAgentPage;
    let testAgent: TestAgent;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        manageTestAgentPage = new ManageTestAgentPage();
        testAgent = new TestAgent("NewTestAgent_DB00012", "Windows");
    });

    it("DB-00012 - Verify that an User can create new test agent", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Test Agents" list item
        manageTestAgentPage = await manageTestPage.goToManageTestAgentPage();

        // 4. Click "+ Test Agent" button
        // 5. Submit "Add New Test Agent" dialog with valid input
        await manageTestAgentPage.createNewTestAgent(testAgent);

        // VP: New test agent exist on table
        expect(await manageTestAgentPage.checkTestAgentExist(testAgent)).toBe(true);

    });

    afterEach(async () => {
        await manageTestAgentPage.deleteTestAgent(testAgent);
        await manageTestAgentPage.logout();
    });
});