import ElementWrapper from "../wrappers/element-wrapper";
import { element, by } from "protractor";

export default class AddClusterDialog {
    // Elements
    private _txtClusterName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtCluster\"]")));
    private _btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAdd\"]")));
    
    // Methods

    /**
     * To submit information of cluster which is going to be added
     * @param clusterName the name value of cluster to add
     */
    public async submitInfo(clusterName: string): Promise<void> {
        await this._txtClusterName.sendKeys(clusterName);
        await this._btnSave.click();
    }
}