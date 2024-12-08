import { BaseModel } from "../base";

export default interface INote extends BaseModel {
    title: string;
    date: string;    
    text: string;
}