import { Users } from '../users';
import { Account } from '../account';
export class Payment {
    paymentID? : number;
    acctID? : number;
    postDate? : Date;
    remitDate? : Date;
    payerName? : string;
    postingCode? : string;
    amount? : number;
    fee? : number;
    note? : string;
    userID? : number;
    source? : number;
    paymentType? : string;
    
    user? : Users = new Users;
    account? : Account = new Account;
}
