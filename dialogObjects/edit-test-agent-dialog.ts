import { by, element } from "protractor";
import ElementWrapper from "../wrappers/element-wrapper";

export default class EditTestAgentDialog {
    // Elements
    private _txtTestAgentName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtAgentName\"]")));
    private _txtOperatingSystemName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@name=\"agentSystem\"]")));
    private _btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnUpdate\"]")));

    // Methods

    /**
     * To submit information of cluster to be edited
     * @param clusterName the name of cluster
     */
    public async submitInfo(testAgentName: string, operatingSystem: string): Promise<void> {
        await this._txtTestAgentName.sendKeys(testAgentName);
        await this._txtOperatingSystemName.sendKeys(operatingSystem);
        await this._btnSave.click();
    }
}