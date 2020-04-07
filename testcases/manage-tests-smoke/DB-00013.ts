import Constant from "../../common/constant";
import TestAgent from "../../dataObjects/test-agent";
import UserAccount from "../../dataObjects/user-account";
import LoginPage from "../../pageObjects/login-page";
import ManageTestAgentPage from "../../pageObjects/manage-test-agent-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00013", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageTestAgentPage: ManageTestAgentPage;
    let testAgent: TestAgent;
    let newTestAgent: TestAgent;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        manageTestAgentPage = new ManageTestAgentPage();
        testAgent = new TestAgent("NewTestAgent_DB00013", "Windows");
        newTestAgent = new TestAgent("Edited_NewTestAgent_DB00013", "Linux");
        // Init 
        manageTestPage = await loginPage.login(account);
        manageTestAgentPage = await manageTestPage.goToManageTestAgentPage();
        await manageTestAgentPage.createNewTestAgent(testAgent);
        loginPage = await manageTestAgentPage.logout();
    });

    it("DB-00013 - Verify that an User can edit test agent", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Test Agents" list item
        manageTestAgentPage = await manageTestPage.goToManageTestAgentPage();

        // 4. Click "Edit Test Agent" button
        // 5. Submit "Edit Test Agent" dialog with valid input
        await manageTestAgentPage.editTestAgent(testAgent, newTestAgent);

        // VP: updated  information of test agent could be searched and displayed correctly
        expect(await manageTestAgentPage.checkTestAgentExist(newTestAgent)).toBe(true);
    });

    afterEach(async () => {
        await manageTestAgentPage.deleteTestAgent(newTestAgent);
        await manageTestAgentPage.logout();
    });
});