import { by, element } from "protractor";
import ElementWrapper from "../wrappers/element-wrapper";

export default class ConfirmationDialog {
    // Elements
    private _btnNo: ElementWrapper = new ElementWrapper(element(by.xpath("//button[.=\"No\"]")));
    private _btnYes: ElementWrapper = new ElementWrapper(element(by.xpath("//button[.=\"Yes\"]")));

    // Methods

    /**
     * To submit choice for confirmation dialog
     * @param submitType the SubmitTypeEnum, yes/no
     * @returns {Promise<void>} the result which will be resolved when function finished.
     */
    public async Submit(submitType: SubmitTypeEnum): Promise<void> {
        if(submitType == SubmitTypeEnum.YES) {
            await this._btnYes.click();
        }else if(submitType == SubmitTypeEnum.NO) {
            await this._btnNo.click();
        }
    }
};