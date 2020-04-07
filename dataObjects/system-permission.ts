export default class SystemPermission {
    private groupName: string;
    private isFullPermission: Boolean;
    private isAbleToView: Boolean;
    private isAbleToCreate: Boolean;
    private isAbleToEdit: Boolean;
    private isAbleToDelete: Boolean;

    constructor(groupName: string, isFullPermission: Boolean, isAbleToView: Boolean, isAbleToCreate: Boolean, isAbleToEdit: Boolean, isAbleToDelete: Boolean) {
        this.groupName = groupName;
        this.isFullPermission = isFullPermission;
        this.isAbleToView = isAbleToView;
        this.isAbleToCreate = isAbleToCreate;
        this.isAbleToEdit = isAbleToEdit;
        this.isAbleToDelete = isAbleToDelete;
    }

    public getGroupName(): string {
        return this.groupName;
    }

    public getIsFullPermission(): Boolean {
        return this.isFullPermission;
    }
    public getIsAbleToView(): Boolean {
        return this.isAbleToView;
    }
    public getIsAbleToCreate(): Boolean {
        return this.isAbleToCreate;
    }
    public getIsAbleToEdit(): Boolean {
        return this.isAbleToEdit;
    }
    public getIsAbleToDelete(): Boolean {
        return this.isAbleToDelete;
    }
}