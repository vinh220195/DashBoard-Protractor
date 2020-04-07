import { by, element } from "protractor";
import CommonAction from "../common/common-action";
import Cluster from "../dataObjects/cluster";
import TableRecordCriteria from "../dataObjects/searching-criteria";
import AddClusterDialog from "../dialogObjects/add-cluster-dialog";
import ConfirmationDialog from "../dialogObjects/confirmation-dialog";
import EditClusterDialog from "../dialogObjects/edit-cluster-dialog";
import BrowserWrapper from "../wrappers/browser-wrapper";
import ElementWrapper from "../wrappers/element-wrapper";
import GeneralPage from "./general-page";

export default class ManageClusterPage extends GeneralPage {
    // Elements
    private _btnAddNewCluster: ElementWrapper = new ElementWrapper(element(by.xpath("//button[@id=\"btnAddClusterModal\"]")));
    private _txtSearchBox: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@id=\"tableClusters_filter\"]//input")));

    // Methods

    /**
     * To add new cluster
     * @param cluster the object which contains all information of an cluster
     */
    public async addNewCluster(cluster: Cluster): Promise<void> {
        try {
            let addClusterDialog = new AddClusterDialog();
            await this._btnAddNewCluster.click();
            await addClusterDialog.submitInfo(cluster.getName());

            await BrowserWrapper.refresh();
            await this.waitForPageLoaderDisappreared();
        } catch (ex) {
            console.log("Adding new Cluster thrown error: " + ex);
        }
    }

    /**
     * To search cluser in cluster table
     * @param cluster the object which contains all information of an cluster
     */
    public async searchCluster(cluster: Cluster): Promise<void> {
        await this._txtSearchBox.sendKeys(cluster.getName());
    }

    /**
     * To check whether cluster exists on table or not
     * @param cluster the object which contains all information of an cluster
     */
    public async checkClusterExist(cluster: Cluster): Promise<Boolean> {
        try {
            await this.searchCluster(cluster);
            let cRecord: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Cluster", cluster.getName())))));
            let arrSize: number = (await cRecord.findElements()).length;
            if (arrSize > 0) {
                return true;
            }
            return false;

        } catch (ex) {
            console.log("Checking Cluster exist thrown error: " + ex);
        }
    }

    /**
     * To delete a cluster
     * @param cluster the object which contains all information of an cluster
     */
    public async deleteCluster(cluster: Cluster): Promise<void> {
        try {
            await this.searchCluster(cluster);
            let confirmationDialog = new ConfirmationDialog();
            let btnDelete: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Cluster", cluster.getName())) + "/.." + CommonAction.generateTooltipXpath("Delete Cluster"))));
            await btnDelete.click();
            await confirmationDialog.Submit(SubmitTypeEnum.YES);

        } catch (ex) {
            console.log("Deleting Cluster thrown error: " + ex);
        }
    }

    /**
     * To edit a existing cluster 
     * @param cluster the object which contains all information of an cluster
     * @param newClusterName the new value of cluster's name to be changed to
     */
    public async editCluster(cluster: Cluster, newClusterName: string): Promise<void> {
        try {
            await this.searchCluster(cluster);
            let btnEdit: ElementWrapper = new ElementWrapper(element(by.xpath(CommonAction.generateTableRecordXpath(new TableRecordCriteria("Cluster", cluster.getName())) + "/.." + CommonAction.generateTooltipXpath("Edit Cluster"))));
            let editClusterDialog = new EditClusterDialog();
            await btnEdit.click();
            await editClusterDialog.submitInfo(newClusterName);
        } catch (ex) {
            console.log("Editing Cluster thrown error: " + ex);
        }
    }
}