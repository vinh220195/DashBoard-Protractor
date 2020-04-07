import TestBase from "../test-base";
import LoginPage from "../../pageObjects/login-page";
import Constant from "../../common/constant";
import ManageTestPage from "../../pageObjects/manage-test-page";
import UserAccount from "../../dataObjects/user-account";
import ManageClusterPage from "../../pageObjects/manage-cluster-page";
import Cluster from "../../dataObjects/cluster";

describe("SMOKE test - DB-00010", function(){
    let account: UserAccount;
    let loginPage: LoginPage;
    let manageTestPage: ManageTestPage;
    let manageClusterPage: ManageClusterPage;
    let cluster: Cluster;
    let newClusterName: string;

    beforeEach(async () => {
        await TestBase.init();
        account = new UserAccount(Constant.ADMIN_USERNAME, Constant.ADMIN_PWD, Constant.ADMIN_EMAIL);
        loginPage = new LoginPage();
        cluster = new Cluster("NewCluster_DB00010");
        newClusterName = "Edited_NewCluster_DB00010";

        manageTestPage = await loginPage.login(account);
        manageClusterPage = await manageTestPage.goToManageClusterPage();
        await manageClusterPage.addNewCluster(cluster);
        loginPage = await manageClusterPage.logout();
    });
    
    it("DB-00010 - Verify that an User can edit new cluster", async () => {
        // 1. Log into Dashboard
        loginPage.login(account);

        // 2. Click "Administration" menu
        // 3. Click "Clusters" list item
        manageClusterPage = await manageTestPage.goToManageClusterPage();

        // 4. Click "Edit Cluster" button of specified cluster
        // 5. Submit "Edit Cluster" dialog with valid input
        await manageClusterPage.editCluster(cluster, newClusterName);
        cluster.setName(newClusterName);

        // VP : New cluster could be searched on table
        expect(await manageClusterPage.checkClusterExist(cluster)).toBe(true);
    });

    afterEach(async() =>{
        await manageClusterPage.deleteCluster(cluster);
        await manageClusterPage.logout();
    });
});