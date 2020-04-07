import Constant from "../../common/constant";
import SystemPermission from "../../dataObjects/system-permission";
import TestPermission from "../../dataObjects/test-permission";
import UserAccount from "../../dataObjects/user-account";
import UserGroup from "../../dataObjects/user-group";
import LoginPage from "../../pageObjects/login-page";
import ManageTestPage from "../../pageObjects/manage-test-page";
import ManageUserGroupPage from "../../pageObjects/manage-user-group-page";
import TestBase from "../test-base";

describe("SMOKE test - DB-00016", function () {
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageUserGroupPage: ManageUserGroupPage;
    let userGroup: UserGroup;
    let userGroupUpdated: UserGroup;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();

        let sysPermissions: Array<SystemPermission> = [];
        sysPermissions.push(new SystemPermission("User", true, true, true, true, true));
        sysPermissions.push(new SystemPermission("Cluster", true, true, true, true, true));
        sysPermissions.push(new SystemPermission("Test Agent", true, true, true, true, true));

        let singleTestPermissions: Array<TestPermission> = [];
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Smokes", false, false, true, true, true));
        singleTestPermissions.push(new TestPermission("__Central_Pre_Deploy_Smoke_Test_Studios", false, false, true, true, true));
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Smoke_Studio_Test", false, true, false, true, true));
        singleTestPermissions.push(new TestPermission("Central_Post_Deploy_Regression_AAA", false, true, true, false, true));
        singleTestPermissions.push(new TestPermission("MAX - Cypress", false, true, true, true, false));
        singleTestPermissions.push(new TestPermission("CXone Sanity - E32 - Chrome", true, true, true, true, true));

        let userAccounts: Array<UserAccount> = [];

        userGroup = new UserGroup("SMOKEtest_DB00016", true, true, false, true, sysPermissions, singleTestPermissions, userAccounts);

        manageTestPage = await loginPage.login(account);
        manageUserGroupPage = await manageTestPage.goToManageUserGroupPage();
        await manageUserGroupPage.createUserGroup(userGroup);
        await manageUserGroupPage.logout();

        sysPermissions[0] = new SystemPermission("User", false, false, false, false, false);
        sysPermissions[1] = new SystemPermission("Cluster", false, false, false, false, false);
        sysPermissions[2] = new SystemPermission("Test Agent", false, false, false, false, false);

        singleTestPermissions.pop();
        singleTestPermissions.pop();
        singleTestPermissions.pop();
        singleTestPermissions.pop();

        userAccounts.push(account);

        userGroupUpdated = new UserGroup("SMOKEtest_DB00016Updated", false, false, false, false, sysPermissions, singleTestPermissions, userAccounts);

    });

    it("DB-00016 - Verify that an User can edit user group", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "User Groups" list item
        manageUserGroupPage = await manageTestPage.goToManageUserGroupPage();

        // 4. Search existing user group
        // 5. Click pen icon to open "Edit User Group" dialog
        // 6. Change group value and submit "Edit User Group" dialog
        await manageUserGroupPage.editUserGroup(userGroup, userGroupUpdated);

        // VP: Edited user group displayed correctly with new value
        await manageUserGroupPage.searchUserGroup(userGroupUpdated);
        expect(await manageUserGroupPage.checkUserGroupInfo(userGroupUpdated, true, true, true, true)).toBe(true);
    });

    afterEach(async () => {
        await manageUserGroupPage.deleteUserGroup(userGroupUpdated);
        await manageUserGroupPage.logout();
    })
});