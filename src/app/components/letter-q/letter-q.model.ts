import { Users } from '../users/users.model';
import { Account } from '../account/account.model';
export class LetterQ {
    requestID? : number;
    acctID? : number;
    letterCode? : string;
    letterDate? : Date;
    userName? : string;
    
    //user? : Users = new Users;
    //account? : Account = new Account;
}