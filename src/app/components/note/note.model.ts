import { Users } from '../users';
import { Account } from '../account';
export class Note {
    noteID? : number;
    acctID? : number;
    noteText? : string;
    noteDate? : Date;
    userName? : string;
    upload? : boolean;
    
    user? : Users = new Users;
    account? : Account = new Account;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
      public constructor(itemNote?: Partial<Note>) {
        Object.assign(this, itemNote);
      }
}
