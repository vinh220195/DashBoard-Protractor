import Constant from "../../common/constant";
import SystemPermission from "../../dataObjects/system-permission";
import TestPermission from "../../dataObjects/test-permission";
import UserAccount from "../../dataObjects/user-account";
import UserGroup from "../../dataObjects/user-group";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import ManageUserGroupPage from "../../pageObjects/manage-user-group-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00015", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageUserGroupPage: ManageUserGroupPage;
    let userGroup: UserGroup;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();

        let sysPermissions: Array<SystemPermission> = [];
        sysPermissions.push(new SystemPermission("User", false, false, true, true, true));
        sysPermissions.push(new SystemPermission("Cluster", false, true, false, true, true));
        sysPermissions.push(new SystemPermission("Test Agent", false, true, true, false, true));

        let singleTestPermissions: Array<TestPermission> = [];
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Smokes", false, false, true, true, true));
        singleTestPermissions.push(new TestPermission("__Central_Pre_Deploy_Smoke_Test_Studios", false, false, true, true, true));
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Smoke_Studio_Test", false, true, false, true, true));
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Regression_AAA", false, true, true, false, true));
        singleTestPermissions.push(new TestPermission("MAX - Cypress", false, true, true, true, false));
        singleTestPermissions.push(new TestPermission("CXone Sanity - E32 - Chrome", true, true, true, true, true));

        let userAccounts: Array<UserAccount> = [];
        userAccounts.push(account);

        userGroup = new UserGroup("SMOKEtest_DB00015", true, true, false, true, sysPermissions, singleTestPermissions, userAccounts);
    });

    it("DB-00015 - Verify that an User can create new user group", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "User Groups" list item
        manageUserGroupPage = await manageTestPage.goToManageUserGroupPage();

        // 4. Click "+ Group" button
        // 5. Submit "Add new user group" dialog with valid information
        await manageUserGroupPage.createUserGroup(userGroup);

        // VP: User group could be searched out as result
        expect(await manageUserGroupPage.checkUserGroupExist(userGroup)).toBe(true);
    });

    afterEach(async () => {
        await manageUserGroupPage.deleteUserGroup(userGroup);
        await manageUserGroupPage.logout();
    })
});