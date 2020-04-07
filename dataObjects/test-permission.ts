export default class TestPermission {
    private testName: string;
    private isFullPermission: Boolean;
    private isAbleToRun: Boolean;
    private isAbleToView: Boolean;
    private isAbleToEdit: Boolean;
    private isAbleToDelete: Boolean;

    constructor(testName: string, isFullPermission: Boolean, isAbleToRun: Boolean, isAbleToView: Boolean, isAbleToEdit: Boolean, isAbleToDelete: Boolean) {
        this.testName = testName;
        this.isFullPermission = isFullPermission;
        this.isAbleToRun = isAbleToRun;
        this.isAbleToView = isAbleToView;
        this.isAbleToEdit = isAbleToEdit;
        this.isAbleToDelete = isAbleToDelete;
    }

    public getTestName(): string {
        return this.testName;
    }

    public getIisFullPermission(): Boolean {
        return this.isFullPermission;
    }

    public getIsAbleToRun(): Boolean {
        return this.isAbleToRun;
    }

    public getIsAbleToView(): Boolean {
        return this.isAbleToView;
    }

    public getIsAbleToEdit(): Boolean {
        return this.isAbleToEdit;
    }

    public getIsAbleToDelete(): Boolean {
        return this.isAbleToDelete;
    }
}