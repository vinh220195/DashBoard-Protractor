import { ElementFinder, browser, Locator, element, WebElement } from "protractor";
import { protractor } from "protractor/built/ptor";
import BrowserWrapper from "./browser-wrapper";

export default class ElementWrapper{
    // Variables
    private _element: ElementFinder;
    private _locator: Locator;

    // Constructor
    constructor(obj: ElementFinder | Locator){
        if(obj.constructor.name == "ElementFinder"){
            let eFinder = obj as ElementFinder;
            this._element = eFinder;
            this._locator = eFinder.locator();
        }else {
            let locator = obj as Locator;
            this._locator = locator;
            this._element = element(this._locator);
        }
    }

    // Methods
    
    public getElement(): ElementFinder{
        return this._element;
    }

    public setElement(elementFinder: ElementFinder): void{
        this._element = elementFinder;
    } 

    /**
     * To get inner text of element
     * @returns {Promise<string>} a promise that will be resolved when function finished.
     */
    public async getText(): Promise<string>{
        await this.waitForElementPresent();
        return await this._element.getText();
    }

    /**
     * The sequence of keys to type. 
     * @param value The value which contains all keys to be typed
     * @returns {Promise<Void>} a promise that will be resolved when function finished.
     */
    public async sendKeys(value: string): Promise<void>{
        await this.waitForElementPresent();
        await this._element.clear();
        await this._element.sendKeys(value);
    }

    /**
     * To click on the located element.
     * @returns {Promise<Void>} a promise that will be resolved when function finished.
     */
    public async click(): Promise<void>{
        await this.waitForElementPresent();
        await this._element.click();
    }
    
    /**
     * To make a waiting period of time to check whether element exist or not.
     * @param element  the element which to be found.
     * @param timeout the amount of time, in seconds, to sleep. 
     * @returns {Promise<Boolean>} a promise that will be resolved when function finished.
     */
    public async waitForElementPresent(isPresent: Boolean = true, timeout: TimeWaitEnum = TimeWaitEnum.MEDIUM_TIME_SEC): Promise<Boolean>{
        let count:number = 0;
        let condition: Boolean;
        do{
            if(count >= timeout){
                return false;
            }
            
            if(isPresent) {
                condition = !await this._element.isPresent();
            }else{
                condition = await this._element.isPresent();
            }
            
            count++;
            await browser.sleep(1000);
        }while(condition);
        return true;
    }

    /**
     * To find all elements of an locator
     */
    public async findElements(): Promise<WebElement[]>{
        return await browser.findElements(this._locator);
    }

    /**
     * To clear all text of and textbox | text-area element
     */
    public async clear(): Promise<void>{
        await this.waitForElementPresent();
        await this._element.clear();
    }
    
    /**
     * To check whether element is selected or not
     */
    public async isSelected(): Promise<boolean> {
        return await this._element.isSelected();
    }
}