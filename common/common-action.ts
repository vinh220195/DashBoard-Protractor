import { by, element } from "protractor";
import TableRecordCriteria from "../dataObjects/searching-criteria";
import ElementWrapper from "../wrappers/element-wrapper";

export default class CommonAction {
    // Methods

    /**
     * To select option of combobox of mat-option element
     * @param valueToFind the value to find in combobox
     * @returns {Promise<void>} the result which will be resolved when function finished.
     */
    public static async selectOptionByValue(inputTextElement: ElementWrapper, valueToFind: string): Promise<void> {
        try{
            // Return if value is empty
            if (valueToFind == "") {
                return;
            }
            
            await inputTextElement.click();
            // await inputTextElement.sendKeys(valueToFind);
            await new ElementWrapper(element(by.xpath("//mat-option[normalize-space(.)=\"" + valueToFind + "\"]"))).click();
        }catch(ex){
            console.log("Selecting Option by value thrown error: " + ex);
        }
    }

    /**
     * To select range of date on daterangepicker
     * @param dateRangeElement the txtbox element of daterangepicker 
     * @param range the value  is a range which to be picked : Latest, Today, Last 24h, Last 7 Days,...
     * @param fromDate  the start date value to be particularly picked in period of time
     * @param toDate the end date value to be particularly picked in period of time
     * @returns {Promise<void>} the result which will be resolved when function finished.
     */
    public static async selectDateRange(dateRangeElement: ElementWrapper, range: string = "", fromDate: Date = null, toDate: Date = null): Promise<void> {
        await dateRangeElement.click();
        if (fromDate != null && toDate != null) {
            await this.selectDate(fromDate);
            await this.selectDate(toDate);
            await new ElementWrapper(element(by.xpath("//button[text()=\"Apply\"]"))).click();
        } else if (range != "") {
            let rangesElement: ElementWrapper = new ElementWrapper(element(by.xpath("//div[@class=\"ranges\"]//li//button[.=\"" + range + "\"]")));
            await rangesElement.click();
        }
    }

    /**
     * To select Date on DateRangePicker
     * @param date the date value to be picked
     */
    public static async selectDate(date: Date): Promise<void> {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let thMonthYearElement = new ElementWrapper(element(by.xpath("//div[contains(@class, \"calendar left\")]//th[contains(@class, \"month\")]")));
        let tdDayToElement = new ElementWrapper(element(by.xpath("//div[contains(@class, \"calendar left\")]//td[contains(@class,\"available\") and not(contains(@class, \"off\")) and normalize-space()=\""+day+"\"]")));
        let btnPrev = new ElementWrapper(element(by.xpath("//div[contains(@class, \"calendar left\")]//th[contains(@class, \"prev\")]")));
        let btnNext = new ElementWrapper(element(by.xpath("//div[contains(@class, \"calendar left\")]//th[contains(@class, \"next\")]")));
        let arrMonthYearVal;
        let selectingMonth;
        let selectingYear;

        do {
            let thMonthYearValue = await thMonthYearElement.getText();
            arrMonthYearVal = thMonthYearValue.split(" ", 2);
            selectingMonth = this.convertMonthToNumber(arrMonthYearVal[0]);
            selectingYear = +arrMonthYearVal[1];

            if (selectingMonth > month || selectingYear > year) {
                await btnPrev.click();
            } else if (selectingMonth < month || selectingYear < year) {
                await btnNext.click();
            }
        } while (selectingMonth != month || selectingYear != year);

        await tdDayToElement.click();

    }

    /**
     * To convert month from "word" to "number". ex: Apr->4
     * @param month the month value in word
     */
    public static convertMonthToNumber(month: string): number {
        switch (month) {
            case "Jan":
                return 1;
                break;
            case "Feb":
                return 2;
                break;
            case "Mar":
                return 3;
                break;
            case "Apr":
                return 4;
                break;
            case "May":
                return 5;
                break;
            case "Jun":
                return 6;
                break;
            case "Jul":
                return 7;
                break;
            case "Aug":
                return 8;
                break;
            case "Sep":
                return 9;
                break;
            case "Oct":
                return 10;
                break;
            case "Nov":
                return 11;
                break;
            case "Dec":
                return 12;
                break;

        }
        return -1;
    }
    /**
     * To generate tooltip xpath based on tooltip title
     * @param tootltipTitle the title of tooltip 
     */
    public static generateTooltipXpath(tootltipTitle: string): string {
        return "//button[@data-toggle=\"tooltip\"][@title=\"" + tootltipTitle + "\" or @data-original-title=\"" + tootltipTitle + "\"]/i";
    }

    /**
     * To generate xpath of table report based on criteria, (field,value) pairs
     * @param criteria 
     */
    public static generateTableRecordXpath(...criteria: TableRecordCriteria[]): string {
        let result: string = "//table//tr";
        criteria.forEach(c => {
            result += "[td[count(//th[normalize-space(text())=\"" + c.getColField() + "\"]/preceding-sibling::th)+1][normalize-space(text())=\"" + c.getDataValue() + "\"]]";
        });
        console.log(result);
        return result;
    }

    /**
     * To check whether element exist or not
     * @param e the element which is going to be checked
     */
    public static async doesElementExist(e: ElementWrapper): Promise<Boolean> {
        let countElement: number = (await e.findElements()).length;
        if (countElement > 0) {
            return true;
        }
        return false;
    }
}