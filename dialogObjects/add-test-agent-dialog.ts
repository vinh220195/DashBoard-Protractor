import ElementWrapper from "../wrappers/element-wrapper";
import { element, by } from "protractor";

export default class AddTestAgentDialog {
    // Elements
    private _txtTestAgentName: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@id=\"txtAgentName\"]")));
    private _txtOperatingSystem: ElementWrapper = new ElementWrapper(element(by.xpath("//input[@name=\"agentSystem\"]")));
    private _btnSave: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAdd\"]")));
    
    // Methods

    /**
     * To submit information of Test agent which is going to be added
     * @param testAgentName the name value of test agent
     * @param oporatingSystem the OS
     */
    public async submitInfo(testAgentName: string, oporatingSystem: string): Promise<void> {
        await this._txtTestAgentName.sendKeys(testAgentName);
        await this._txtOperatingSystem.sendKeys(oporatingSystem);
        await this._btnSave.click();
    }
}