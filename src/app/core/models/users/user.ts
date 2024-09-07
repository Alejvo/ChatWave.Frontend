import { friend } from "./friend";
import { group } from "./group";

export interface User{
    id:string;
    fullName:string;
    userName:string;
    age:number;
    groups:group[];
    friends:friend[];
}