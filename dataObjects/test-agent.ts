export default class TestAgent {
    private name: string;
    private operatingSystem: string;

    constructor(name: string, operatingSystem: string) {
        this.name = name;
        this.operatingSystem = operatingSystem;
    }

    public getName(): string {
        return this.name;
    }
    public getOperatingSystem(): string {
        return this.operatingSystem;
    }

    public setName(name: string): void {
        this.name = name;
    }
    public setOperatingSystem(operatingSystem: string): void {
        this.operatingSystem = operatingSystem;
    }
}