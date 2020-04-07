import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import TableRecordCriteria from "../dataObjects/searching-criteria";
import TestAgent from "../dataObjects/test-agent";
import AddTestAgentDialog from "../dialogObjects/add-test-agent-dialog";
import ConfirmationDialog from "../dialogObjects/confirmation-dialog";
import EditTestAgentDialog from "../dialogObjects/edit-test-agent-dialog";
import BrowserWrapper from "../wrappers/browser-wrapper";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class ManageTestAgentPage extends GeneralPage {
    // Elements
    private _btnAddNewTestAgent: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAddClusterModal\"]")));
    private _txtSearchBox: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@id=\"tableTestAgents_filter\"]//input")));

    // Methods

    /**
     * To search Test Agent
     * @param testAgent the object that contains all information of an Test Agent
     */
    public async searchTestAgent(testAgent: TestAgent): Promise<void> {
        await this._txtSearchBox.sendKeys(testAgent.getName());
    }

    /**
     * To create new Test Agent
     * @param testAgent the object that contains all information of an Test Agent
     */
    public async createNewTestAgent(testAgent: TestAgent): Promise<void> {
        try{
            let addTestAgentDialog = new AddTestAgentDialog();
            await this._btnAddNewTestAgent.click();
            await addTestAgentDialog.submitInfo(testAgent.getName(), testAgent.getOperatingSystem());
    
            await BrowserWrapper.refresh();
            await this.waitForPageLoaderDisappreared();
        }catch(ex){
            console.log("Creating New Test Agent thrown error: "+ ex);
        }
    }

    /**
     * To delete a Test Agent
     * @param testAgent the object that contains all information of an Test Agent
     */
    public async deleteTestAgent(testAgent: TestAgent): Promise<void> {
        try{
            await this.searchTestAgent(testAgent);
            let btnDelete: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Test Agent", testAgent.getName())) + "/.." + CommonAction.generateTooltipXpath("Delete TestAgent"))));
            let confirmationDialog = new ConfirmationDialog();
            await btnDelete.click();
            await confirmationDialog.Submit(SubmitTypeEnum.YES);
        }catch(ex){
            console.log("Delete Test Agent thrown error: " + ex);
        }
    }

    /**
     * To check Test agent exist or not
     * @param testAgent the object that contains all information of an Test Agent
     */
    public async checkTestAgentExist(testAgent: TestAgent): Promise<Boolean> {
        try{
            await this.searchTestAgent(testAgent);
            let taRecord: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Test Agent", testAgent.getName())))));
            return await CommonAction.doesElementExist(taRecord);
        }catch(ex){
            console.log("Checking Test Agent Exist thrown error: " + ex);
        }
    }

    /**
     * To edit a Test Agent
     * @param testAgent the object that contains all information of an Test Agent to be updated
     * @param newTestAgent the object that contains all information of an new Test Agent for updating
     */
    public async editTestAgent(testAgent: TestAgent, newTestAgent: TestAgent): Promise<void> {
        try{
            await this.searchTestAgent(testAgent);
            let editTestAgentDialog = new EditTestAgentDialog();
            let btnEdit: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Test Agent", testAgent.getName())) + "/.." + CommonAction.generateTooltipXpath("Edit TestAgent"))));
            await btnEdit.click();
            await editTestAgentDialog.submitInfo(newTestAgent.getName(), newTestAgent.getOperatingSystem());
        }catch(ex){
            console.log("Editing Test Agent thrown error: "+ ex);
        }
    }
}