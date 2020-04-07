import SystemPermission from "./system-permission";
import TestPermission from "./test-permission";
import UserAccount from "./user-account";

export default class UserGroup {
    private name: string;
    private isAbleToViewReport: Boolean;
    private isAmin: Boolean;
    private isFullPermissionForTests: Boolean;
    private isAbleToCreateTest: Boolean;
    private listSystemPermissions: SystemPermission[];
    private listSingleTestPermissions: TestPermission[];
    private listUsers: UserAccount[];

    constructor(name: string, isAbleToViewReport: Boolean, isAmin: Boolean, isFullPermissionForTests: Boolean, isAbleToCreateTest: Boolean, listSystemPermissions: SystemPermission[], listSingleTestPermissions: TestPermission[], listUsers: UserAccount[]) {
        this.name = name;
        this.isAbleToViewReport = isAbleToViewReport;
        this.isAmin = isAmin;
        this.isFullPermissionForTests = isFullPermissionForTests;
        this.isAbleToCreateTest = isAbleToCreateTest;
        this.listSystemPermissions = listSystemPermissions;
        this.listSingleTestPermissions = listSingleTestPermissions;
        this.listUsers = listUsers;
    }

    public getName(): string {
        return this.name;
    }
    public getIsAbleToViewReport(): Boolean {
        return this.isAbleToViewReport;
    }
    public getIsAmin(): Boolean {
        return this.isAmin;
    }
    public getIsFullPermissionForTests(): Boolean {
        return this.isFullPermissionForTests;
    }
    public getIsAbleToCreateTest(): Boolean {
        return this.isAbleToCreateTest;
    }
    public getlistSystemPermissions(): SystemPermission[] {
        return this.listSystemPermissions;
    }
    public getlistSingleTestPermissions(): TestPermission[] {
        return this.listSingleTestPermissions;
    }
    public getlistUsers(): UserAccount[] {
        return this.listUsers;
    }
}