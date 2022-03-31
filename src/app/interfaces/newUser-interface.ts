import { Observable } from "rxjs";

export interface NewUser {
    id?: number;
    userName: string;
    email: string;
    password: string;
}

export interface IsNameTaken {
    isNameTaken: (userName: string) => Observable<boolean>;
}