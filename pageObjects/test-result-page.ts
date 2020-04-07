import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import TestSuite from "../dataObjects/test-suite";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class TestResultPage extends GeneralPage {
    // Elements
    private _lblTestResultHeader: ElementWrapper = new ElementWrapper(element(by.xpath("//h3")));
    private _txtTestSuiteName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"suiteName\"]")));
    private _txtClusterName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"clustersName\"]")));
    private _txtBrowserName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"browsersName\"]")));
    private _datePicker: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"dateRange\"]")));
    private _btnSearch: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnGo\"]")));

    // Methods

    /**
     * To check test suite information on single test result page
     * @param fieldName the information to check
     * @param value the value of info
     * @returns {Promise<Boolean>} a promise that will be resolved when function finished.
     */
    public async checkTestSuiteInfo(fieldName: string, value: string): Promise<Boolean> {
        try {
            let fieldValElement: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@id=\"singleTestInfo\"]//span[@class=\"test-info-row-unit\"][normalize-space(text())=\"" + fieldName + "\"]/../following-sibling::div")));
            if (await fieldValElement.getText() == value) {
                return true;
            }
            console.log(await fieldValElement.getText());
            return false;

        } catch (ex) {
            console.log("Checking Test Suite Information thrown error: " + ex);
        }
    }
    /**
     * To search test suite on test result page
     * @param testSuite the object that contains information of a test suite
     * @returns {Promise<void>} a promise that will be resolved when function finished.
     */
    public async searchTestSuite(testSuite: TestSuite): Promise<void> {
        try {
            await CommonAction.selectOptionByValue(this._txtTestSuiteName, testSuite.getName());
            await CommonAction.selectOptionByValue(this._txtClusterName, testSuite.getCluster());
            await CommonAction.selectOptionByValue(this._txtBrowserName, testSuite.getBrowser());
            await CommonAction.selectDateRange(this._datePicker, testSuite.getExecutedDateRange(), testSuite.getExecutedStartDate(), testSuite.getExecutedEndDate());

            await this._btnSearch.click();
            await this.waitForPageLoaderDisappreared();

        } catch (ex) {
            console.log("Searching Test Suite thrown error: " + ex);
        }
    }

    /**
     * To get test result header on test result page
     * @returns {Promise<string>} a promise that will be resolved when function finished.
     */
    public async getLblTestResultHeader(): Promise<string> {
        try {
            return await this._lblTestResultHeader.getText();
        } catch (ex) {
            console.log(ex);
        }
    }
}