import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import SingleTest from "../dataObjects/single-test";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class ReportingPage extends GeneralPage {
    // Elements
    private _btnMakeReport: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnMakeReport\"]")));
    private _btnSendEmail: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAddTestModal\"]")));

    // Methods

    /**
     * To make report on reporting page
     * @param arrTests the array contains all of single tests to be added to make report
     * @returns {Promise<void>} a promise that will be resolved when function finished.
     */
    public async makeReport(arrTests: SingleTest[]): Promise<void> {
        try {
            let arrSize: number = arrTests.length;

            for (let i: number = 0; i < arrSize; i++) {
                if (i > 1) {
                    let btnAddNewRowElement = new ElementWrapper(element(by.xpath("(//button[@name=\"btnAdd\"])[" + i + "]")));
                    await btnAddNewRowElement.click();
                }
                let txtTestNameElement: ElementWrapper = new ElementWrapper(element(by.xpath("(//input[@id=\"txtTestName\"])[" + (i + 1) + "]")));
                let txtClusterNameElement: ElementWrapper = new ElementWrapper(element(by.xpath("(//input[@id=\"txtCluster\"])[" + (i + 1) + "]")));
                let matSelectElement: ElementWrapper = new ElementWrapper(element(by.xpath("(//mat-select[@id=\"ddlDate\"])[" + (i + 1) + "]")));

                await CommonAction.selectOptionByValue(txtTestNameElement, arrTests[i].getName());
                await CommonAction.selectOptionByValue(txtClusterNameElement, arrTests[i].getCluster());
                await CommonAction.selectOptionByValue(matSelectElement, arrTests[i].getDate());
            }
            await this._btnMakeReport.click();
            await this.waitForPageLoaderDisappreared();
        } catch (ex) {
            console.log("Making report of single test thrown error: " + ex);
        }
    }

    /**
     * To check report information
     * @param arrTests the array contains all tests to be checked
     * @returns {Promise<Boolean>} a promise that will be resolved when function finished.
     */
    public async checkReportInformation(arrTests: SingleTest[]): Promise<Boolean> {
        try {
            for (let i: number = 0; i < arrTests.length; i++) {
                let clusterValElement: ElementWrapper = new ElementWrapper(element(by.xpath("//td[contains(.,\"Cluster\")]//following-sibling::td[count(//table//th[normalize-space(text())=\"" + arrTests[i].getName() + "\"]/preceding-sibling::th)]")));
                if (await clusterValElement.getText() != arrTests[i].getCluster()) {
                    return false;
                }
            }
            return true;
        } catch (ex) {
            console.log("Checking report information thrown error: " + ex);
        }
    }
};