export default class SingleTest{
    private name: string;
    private cluster: string;
    private date: string;

    constructor(name: string, cluster: string, date: string){
        this.name = name;
        this.cluster = cluster;
        this.date = date;
    }

    public getName(): string {
        return this.name;
    }

    public getCluster(): string {
        return this.cluster;
    }

    public getDate(): string{
        return this.date;
    }
}