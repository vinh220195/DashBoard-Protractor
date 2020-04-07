import Constant from "../../common/constant";
import TestAgent from "../../dataObjects/test-agent";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestAgentPage from "../../pageObjects/manage-test-agent-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00014", function () {
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
        testAgent = new TestAgent("NewTestAgent_DB00014", "Windows");
        // Init 
        manageTestPage = await loginPage.login(account);
        manageTestAgentPage = await manageTestPage.goToManageTestAgentPage();
        await manageTestAgentPage.createNewTestAgent(testAgent);
        loginPage = await manageTestAgentPage.logout();
    });

    it("DB-00014 - Verify that an User can edit test agent", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Test Agents" list item
        manageTestAgentPage = await manageTestPage.goToManageTestAgentPage();

        // 4. Click "Delete Test Agent" button of specified Test Agent
        // 5. Click "Yes" on confirmation dialog
        await manageTestAgentPage.deleteTestAgent(testAgent);

        // VP: Test agent cannot be found on table
        expect(await manageTestAgentPage.checkTestAgentExist(testAgent)).toBe(false);
    });
    afterEach(async () => {
        await manageTestAgentPage.logout();
    });
});