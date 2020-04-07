
export default class UserAccount {
    // Variables
    private username: string;
    private password: string;
    private email: string;

    // Constructors
    constructor(username: string, password?: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Methods
    public getUsername(): string {
        return this.username;
    }
    public getPassword(): string {
        return this.password;
    }
    public getEmail(): string {
        return this.email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}