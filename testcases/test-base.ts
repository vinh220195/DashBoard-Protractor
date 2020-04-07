import Constant from "../common/constant";
import BrowserWrapper from "../wrappers/browser-wrapper";

export default class TestBase {
    public static async init(): Promise<void> {
        BrowserWrapper.getCurrentBrowser().waitForAngularEnabled(false);
        await BrowserWrapper.getCurrentBrowser().driver.get(Constant.base_URL);
        await BrowserWrapper.getCurrentBrowser().manage().window().maximize();
    }
    public static async deInit(): Promise<void> {
    }
}