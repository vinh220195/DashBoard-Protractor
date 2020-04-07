import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageClusterPage from "../../pageObjects/manage-cluster-page";
import Cluster from "../../dataObjects/cluster";

describe("SMOKE test - DB-00011", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageClusterPage: ManageClusterPage;
    let cluster: Cluster;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        cluster = new Cluster("NewCluster_DB00011");

        manageTestPage = await loginPage.login(account);
        manageClusterPage = await manageTestPage.goToManageClusterPage();
        await manageClusterPage.addNewCluster(cluster);
        loginPage = await manageClusterPage.logout();
    });
    
    it("DB-00011 - Verify that an User can delete cluster", async () => {
        // 1. Log into Dashboard
        loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Clusters" list item
        manageClusterPage = await manageTestPage.goToManageClusterPage();

        // 4. Click "Delete Cluster" button of specified Cluster
        // 5. Click "Yes" on confirmation dialog
        await manageClusterPage.deleteCluster(cluster);

        // VP : Cluster cannot be found on table
        expect(await manageClusterPage.checkClusterExist(cluster)).toBe(false);
    });
    afterEach(async() =>{
        await manageClusterPage.logout();
    });
});