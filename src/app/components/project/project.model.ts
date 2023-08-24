import { Client } from '../client/';

export class Project {
    projectCode? : string;
    clientCode? : string;
    name? : string;
    rate? : number;
    rateType? : number;
    projectType? : number;
    feeCap? : number;
    client? : Client = new Client;
}
