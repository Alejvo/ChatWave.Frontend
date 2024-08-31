import { friend } from "./friend";

export interface User{
    id:string;
    fullName:string;
    username:string;
    age:number;
    groups:string[];
    friends:friend[];
}