export class UserDTO {
    id: number = -1;
    email: string = "";

    constructor(id: number, email: string) {
        this.id = id;
        this.email = email;
    }
}