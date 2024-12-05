export class UserDTO {
    id: number = -1;
    email: string = "";

    constructor(id: number, email: string) {
        this.id = id;
        this.email = email;
    }
}

export class UserInsertDTO {
    email: string = "";
    password: string = "";
    
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}