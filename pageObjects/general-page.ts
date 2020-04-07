import { by, element } from "protractor";
import ElementWrapper from "../wrappers/element-wrapper";

export default class GeneralPage {
    // Elements
    private _loaderHidden: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@id=\"loading-screen-container\"][@hidden=\"hidden\"]")));
    private _navLinkManageTests: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"manageTest\"]/a")));
    private _navLinkTestResults: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"testResults\"]/a")));
    private _navLinkReporting: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"reporting\"]/a")));
    private _navLinkAdministration: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"administration\"]/a")));
    private _navbarPesonalDrop: ElementWrapper = new ElementWrapper(element(by.xpath("//a[@id=\"navbardrop\"][contains(.,\"Hi\")]")));
    private _liLogOff: ElementWrapper = new ElementWrapper(element(by.xpath("//a[@id=\"navbardrop\"][contains(.,\"Hi\")]/..//a[normalize-space(text())=\"Log off\"]")));
    private _lblPageHeader: ElementWrapper = new ElementWrapper(element(by.xpath("//div[contains(@class,\"page-header\")]//span")));

    // Methods

    /**
     * To wait for page loader disappeared 
     * @returns {Promise<Boolean>} the result which will be resolved when function finished.
     */
    public async waitForPageLoaderDisappreared(timeout: TimeWaitEnum = TimeWaitEnum.SHORT_TIME_SEC): Promise<Boolean> {
        await this._loaderHidden.waitForElementPresent(true, timeout);
        return false;
    }

    /**
     * To go to manage tests page of Dashboard
     * @returns {Promise<any>} the result which will be resolved when function finished.
     */
    public async goToManageTestPage(): Promise<any> {
        let ManageTestPage = require("../pageObjects/manage-test-page").default;
        await this._navLinkManageTests.click();
        await this.waitForPageLoaderDisappreared(TimeWaitEnum.MEDIUM_TIME_SEC);

        return new ManageTestPage();
    }

    /**
     * To go to test result page of Dashboard
     * @returns {Promise<any>} the result which will be resolved when function finished.
     */
    public async goToTestResultsPage(): Promise<any> {
        try {
            let TestResultPage = require("../pageObjects/test-result-page").default;
            await this._navLinkTestResults.click();
            await this.waitForPageLoaderDisappreared(TimeWaitEnum.MEDIUM_TIME_SEC);

            return new TestResultPage();

        } catch (ex) {
            console.log("Going to Test Result Page thrown error: " + ex);
        }
    }

    /**
     * To go to reporting page
     */
    public async goToReportingPage(): Promise<any> {
        try {
            let ReportingPage = require("../pageObjects/reporting-page").default;
            await this._navLinkReporting.click();
            await this.waitForPageLoaderDisappreared(TimeWaitEnum.MEDIUM_TIME_SEC);

            return new ReportingPage();

        } catch (ex) {
            console.log("Going to Reporting Page thrown error: " + ex);
        }
    }

    /**
     * To go to manage user page
     */
    public async goToManageUserPage(): Promise<any> {
        try {
            let ManageUserPage = require("../pageObjects/manage-user").default;
            let userLink: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"administration\"]//a[.=\"Users\"]")));
            await this._navLinkAdministration.click();
            await userLink.click();

            return new ManageUserPage();
        } catch (ex) {
            console.log("Going to Manage User Page thrown error: " + ex);
        }
    }

    /**
     * To log user out from dashboard
     */
    public async logout(): Promise<any> {
        try {
            let LoginPage = require("../pageObjects/login-page").default;
            await this._navbarPesonalDrop.click();
            await this._liLogOff.click();
            await this.waitForPageLoaderDisappreared();

            return new LoginPage();
        } catch (ex) {
            console.log("Logout failed by: " + ex);
        }
    }

    /**
     * To get Page header of each page
     */
    public async getPageHeader(): Promise<string> {
        try {
            return await this._lblPageHeader.getText();
        } catch (ex) {
            console.log("Getting page header thrown error: " + ex);
        }
    }

    /**
     * To go to manage cluster page
     */
    public async goToManageClusterPage(): Promise<any> {
        try {
            let ManageClusterPage = require("../pageObjects/manage-cluster-page").default;
            let clusterLink: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"administration\"]//a[.=\"Clusters\"]")));
            await this._navLinkAdministration.click();
            await clusterLink.click();

            return new ManageClusterPage();
        } catch (ex) {
            console.log("Going to Manage Cluster Page thrown error: " + ex);
        }
    }

    /**
     * To go to manage cluster page
     */
    public async goToManageTestAgentPage(): Promise<any> {
        try {
            let ManageTestAgentPage = require("../pageObjects/manage-test-agent-page").default;
            let testAgentLink: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"administration\"]//a[.=\"Test Agents\"]")));
            await this._navLinkAdministration.click();
            await testAgentLink.click();

            return new ManageTestAgentPage();
        } catch (ex) {
            console.log("Going to Manage Test Agent Page thrown error: " + ex);
        }
    }

    /**
     * To go to manage user group page
     */
    public async goToManageUserGroupPage(): Promise<any> {
        try {
            let ManageUserGroupPage = require("../pageObjects/manage-user-group-page").default;
            let userGroupLink: ElementWrapper = new ElementWrapper(element(by.xpath("//li[@id=\"administration\"]//a[.=\"User Groups\"]")));
            await this._navLinkAdministration.click();
            await userGroupLink.click();

            return new ManageUserGroupPage();
        } catch (ex) {
            console.log("Going to Manage User Group Page thrown error: " + ex);
        }
    }
};