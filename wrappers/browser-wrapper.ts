import { ProtractorBrowser, promise } from "protractor";
let protractor = require("protractor");

export default class BrowserWrapper {
    // Constructor
    private static _currBrowser: ProtractorBrowser;
    private static _arrBrowser: ProtractorBrowser[] = new Array();

    // Methods

    /**
     * To get current instance of browser
     * @returns {ProtractorBrowser} a promise that will be resolved when function finished.
     */
    public static getCurrentBrowser(): ProtractorBrowser {
        if (BrowserWrapper._arrBrowser.length == 0) {
            BrowserWrapper._currBrowser = protractor.browser;
            BrowserWrapper._arrBrowser.push(this._currBrowser);
        }
        return BrowserWrapper._currBrowser;
    }

    /**
     * To quit all current browser
     */
    public static async quit(): Promise<void> {
        await BrowserWrapper.getCurrentBrowser().quit();
    }

    /**
     * To restart all browser
     */
    public static async restart(): Promise<void> {
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getCurrentBrowser();
            await currentBrowser.restart();
            BrowserWrapper._arrBrowser.length = 0;
            currentBrowser = BrowserWrapper.getCurrentBrowser();
            await currentBrowser.waitForAngularEnabled(false);
    }

    /**
     * To switch browser by it's tittle
     * @param title the title value of browser handle
     */
    public static async switchBrowserByTitle(title: string): Promise<void> {
        await BrowserWrapper._currBrowser.getAllWindowHandles().then(function (allWindowHandles) {
            allWindowHandles.forEach(windowHandle => {
                BrowserWrapper._currBrowser.switchTo().window(windowHandle);
                BrowserWrapper._arrBrowser.push(BrowserWrapper._currBrowser);
                BrowserWrapper._currBrowser.getTitle().then(function (browserTitle) {
                    if (title == browserTitle) {
                        return;
                    }
                });
            });
        });
    }

    /**
     * To refresh browser
     */
    public static async refresh(): Promise<void> {
        await BrowserWrapper._currBrowser.navigate().refresh();
    }
}