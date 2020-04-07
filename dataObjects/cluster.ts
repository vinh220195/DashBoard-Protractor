export default class Cluster {
    // Variables
    private name: string;

    // Constructors
    constructor(name: string){
        this.name = name;
    }

    // Methods
    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }
}