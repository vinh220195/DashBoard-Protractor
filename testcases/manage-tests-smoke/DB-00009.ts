import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageClusterPage from "../../pageObjects/manage-cluster-page";
import Cluster from "../../dataObjects/cluster";

describe("SMOKE test - DB-00009", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageClusterPage: ManageClusterPage;
    let cluster: Cluster;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        cluster = new Cluster("NewCluster_DB00009");
    });
    
    it("DB-00009 - Verify that User can create new user", async () => {
        // 1. Log into Dashboard
        manageTestPage = await loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Clusters" list item
        manageClusterPage = await manageTestPage.goToManageClusterPage();

        // 4. Click "+ Cluster" button
        // 5. Submit "Add New Cluster" dialog
        await manageClusterPage.addNewCluster(cluster);

        // VP : New cluster could be searched on table
        expect(await manageClusterPage.checkClusterExist(cluster)).toBe(true);
    });

    afterEach(async() =>{
        await manageClusterPage.deleteCluster(cluster);
        await manageClusterPage.logout();
    });
});