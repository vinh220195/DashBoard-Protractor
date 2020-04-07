import { browser, by, element } from "protractor";
import CommonAction from "../common/common-action";
import SingleTest from "../dataObjects/single-test";
import AddTabDialog from "../dialogObjects/add-tab-dialog";
import ConfirmationDialog from "../dialogObjects/confirmation-dialog";
import BrowserWrapper from "../wrappers/browser-wrapper";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";
import TestResultPage from "./test-result-page";

export default class ManageTestPage extends GeneralPage {
    // Elements
    private _btnAddNewTab: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@class=\"new-test-tab\"]")));
    private _txtSearchBox: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@type=\"search\"]")));

    // Methods

    /**
     * To open latest result of one test in test list
     * @param testName the test name which open latest result
     * @returns {Promise<TestResultPage>} a promise that will be resolved when function finished.
     */
    public async openLatestResult(testName: string): Promise<TestResultPage> {
        try {
            let btnOpenLatestResult: ElementWrapper = new ElementWrapper(element(by.xpath("//ancestor::tr[contains(.,\"" + testName + "\")]//button[@data-original-title=\"Open Latest Result\"]")));
            await btnOpenLatestResult.click();
            await this.waitForPageLoaderDisappreared();

            BrowserWrapper.switchBrowserByTitle("Single Test Result");

            return new TestResultPage();
        } catch (ex) {
            console.log("Opening latest result thrown error: " + ex);
        }
    }

    /**
     * To search test in test list, manage test page.
     * @param testName the test name which to be searched.
     * @returns {Promise<void>} a promise that will be resolved when function finished.
     */
    public async searchTest(testName: string): Promise<void> {
        try {
            await this._txtSearchBox.sendKeys(testName);
        } catch (ex) {
            console.log("Searching test thrown error: " + ex);
        }
    }

    /**
     * To delete tab if it exists.
     * @param tabName this value is tab name which to be removed from tab list.
     * @returns {Promise<ManageTestPage>} a promise that will be resolved when function finished.
     */
    public async deleteTab(tabName: string): Promise<ManageTestPage> {
        try {
            // Click tabElement to activate
            let tabElement: ElementWrapper = new ElementWrapper(element(by.xpath("//div[contains(@class,\"tabs-container\")]//div[@id=\"" + tabName + "\"]")));
            await tabElement.click();

            // Click 'x' icon to delete tab
            let deleteTabElement: ElementWrapper = new ElementWrapper(element(by.xpath("//div[contains(@class,\"tabs-container\")]//div[@id=\"" + tabName + "\"]/i[@data-original-title=\"Delete Tab\"]")));
            await deleteTabElement.click();

            // Submit confirmation dialog
            let confirmationDialog = new ConfirmationDialog();
            await confirmationDialog.Submit(SubmitTypeEnum.YES);

            // Wait for page loader disappeared
            await this.waitForPageLoaderDisappreared();

            return new ManageTestPage();
        } catch (ex) {
            console.log("Deleting tab thrown error: " + ex);
        }
    }

    /**
     * To create new tab 
     * @param tabName this tab name is must to create new tab 
     * @param testName this optional, test name to be added to tabname as a tag
     * @returns {Promise<ManageTestPage>} a promise that will be resolved when function finished.
     */
    public async createNewTab(tabName: string, testName: string): Promise<ManageTestPage> {
        try {
            // Init variables
            let addTabDialog = new AddTabDialog();

            // Click add new tab and fill information to dialog
            await this._btnAddNewTab.click();
            await addTabDialog.submitInfo(tabName, testName);

            return new ManageTestPage();
        } catch (ex) {
            console.log("Creating new tab thrown error: " + ex);
        }
    }

    /**
     * To check tab exist on tab list 
     * @param tabName the tab name input to be checked from tab list 
     * @param timeout the amount of time, in seconds, to check. 
     * @returns {Promise<Boolean>} a promise that will be resolved when function finished.
     */
    public async checkTabExist(tabName: string, timeout: TimeWaitEnum): Promise<Boolean> {
        try {
            let tabElement: ElementWrapper = new ElementWrapper(element(by.xpath("//div[contains(@class,\"tabs-container\")]//div[@id=\"" + tabName + "\"]")));
            if (tabElement.waitForElementPresent(true, timeout)) {
                return true;
            }
        } catch (ex) {
            console.log(ex);
            return false;
        } finally {
            return false;
        }
    }

    /**
     * To check Test exist in table
     * @param testIn the object that contains all information of a Single Test
     */
    public async checkTestExist(testIn: SingleTest): Promise<Boolean> {
        try {
            await this.searchTest(testIn.getName());
            let tdTestName = new ElementWrapper(element(by.xpath("//td[contains(@id, \"jobName\")]/span")));

            return await CommonAction.doesElementExist(tdTestName);
        } catch (ex) {
            console.log("Checking error: " + ex);
        }
    }
}