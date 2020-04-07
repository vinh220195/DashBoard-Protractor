import ElementWrapper from "../wrappers/element-wrapper";
import { element, by } from "protractor";

export default class EditClusterDialog{
    // Elements
    private _txtClusterName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtCluster\"]")));
    private _btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnUpdate\"]")));

    // Methods

    /**
     * To submit information of cluster to be edited
     * @param clusterName the name of cluster
     */
    public async submitInfo(clusterName: string): Promise<void> {
        await this._txtClusterName.sendKeys(clusterName);
        await this._btnSave.click();
    }
}