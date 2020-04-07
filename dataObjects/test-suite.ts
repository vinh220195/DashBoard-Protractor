export default class TestSuite{
    // Variables
    private name: string;
    private cluster: string;
    private browser: string;
    private executedDateRange: string;
    private executedStartDate: Date;
    private executedEndDate: Date;

    constructor(name: string, cluster: string, browser: string, executedDateRange: string, executedStartDate: Date, executedEndDate: Date){
        this. name = name;
        this.cluster = cluster;
        this.browser = browser;
        this.executedDateRange = executedDateRange;
        this. executedStartDate = executedStartDate;
        this. executedEndDate = executedEndDate;
    }

    // Methods

    public getName(): string{
        return this.name;
    }
    
    public getCluster(): string{
        return this.cluster;
    }
    
    public getBrowser(): string{
        return this.browser;
    }
    
    public getExecutedDateRange(): string{
        return this.executedDateRange;
    }
    
    public getExecutedStartDate(): Date{
        return this.executedStartDate;
    }
    
    public getExecutedEndDate(): Date{
        return this.executedEndDate;
    }
    
}