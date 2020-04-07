import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import ElementWrapper from "../wrappers/element-wrapper";

export default class AddTabDialog {
    // Elements
    private _txtTabName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtTabName\"]")));
    private _cbxTestName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtJobList\"]")));
    private _btnCancel: ElementWrapper = new ElementWrapper(element(by.xpath("//button[.=\"Cancel\"]")));
    private _btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[.=\"Save\"]")));

    // Methods

    /**
     * To fill information into Add New Tab dialog
     * @param tabName the name of tab 
     * @param testName the name of test
     * @returns {Promise<void>} the result which will be resolved when function finished.
     */
    public async submitInfo(tabName: string, testName: string): Promise<void> {
        await this._txtTabName.sendKeys(tabName);
        await CommonAction.selectOptionByValue(this._cbxTestName, testName);
        await this._btnSave.click();
    }
};