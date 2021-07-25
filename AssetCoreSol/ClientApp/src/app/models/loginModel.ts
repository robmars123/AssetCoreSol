import { AppUser } from "./appUser";

 export class LoginModel {
    username: string;
    password: string;
    validationMessage: string;

    users: AppUser[];
}
