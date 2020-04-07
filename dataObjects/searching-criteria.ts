export default class TableRecordCriteria {
    private colField: string;
    private dataValue: string;

    constructor(colField: string, dataValue: string) {
        this.colField = colField;
        this.dataValue = dataValue;
    }

    public getColField(): string {
        return this.colField;
    }

    public getDataValue(): string {
        return this.dataValue;
    }
}