import { Users } from '../users';
import { Account } from '../account';

export class Payer  {
    payerID? : number;
    acctID? : number;
    sequence? : number;
    payerName? : string;
    payerAddress1? : string;
    payerAddress2? : string;
    payerCity? : string;
    payerState? : string;
    payerZip? : string;
    payerContact? : string;
    payerPhone? : string;
    iDNo? : string;
    groupNo? : string;
    billDate? : Date;
    billType? : string;
    planNumber? : string;
    groupName? : string;
    planType? : string;
    subscriberName? : string;
    subscriberDOB? : Date;
    dateOfInjury? : Date;
    effectiveDate? : Date;
    referenceNumber? : string;
    authorizationNumber? : string;
    authorizationDate? : Date;    
    user? : Users = new Users;
    account? : Account = new Account;
}
