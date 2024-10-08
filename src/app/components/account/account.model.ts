import { Rol } from '../rol/rol.model';
import { Client } from '../client/client.model';
import { Project } from '../project/project.model';
import { Users } from '../users/users.model';
export class Account {
    acctID? : number;
    masterCode? : string = "";
    clientCode? : string = "";
    projectCode? : string = "";
    postDate? : Date;
    placementDate? : Date;
    clientRef1? : string = "";
    lastName? : string = "";
    firstName? : string = "";
    middleName? : string = "";
    address1? : string = "";
    address2? : string = "";
    city? : string = "";
    state? : string = "";
    zip? : string = "";
    country? : string = "";
    phone1? : string = "";
    phone2? : string = "";
    gender? : string = "";
    socialSec? : string = "";
    socialSecMask? : string = "";
    dateOfBirth? : Date;
    idNumber? : string = "";
    rpUseOnLtr? : boolean;
    rpLastName? : string = "";
    rpFirstName? : string = "";
    rpMiddleName? : string = "";
    rpAddress1? : string = "";
    rpAddress2? : string = "";
    rpCity? : string = "";
    rpState? : string = "";
    rpZip? : string = "";
    rpCountry? : string = "";
    rpPhone1? : string = "";
    rpSocialSec? : string = "";
    rpDateOfBirth? : Date;
    relationship? : string = "";
    employerName? : string = "";
    empAddress1? : string = "";
    empAddress2? : string = "";
    empCity? : string = "";
    empState? : string = "";
    empZip? : string = "";
    empPhone? : string = "";
    fromDate? : Date;
    toDate? : Date;
    finalDate? : Date;
    serviceCode? : string = "";
    totalCharges? : number;
    priorPayments? : number;
    priorAdjustments? : number;
    assignedAmount? : number;
    payments? : number;
    adjustments? : number;
    balanceDue? : number;
    nextReview? : Date;
    statusCode? : string = "";
    statusDate? : Date;
    finClassCode? : string = "";
    language? : string = "";
    autoClose? : Date;
    closedDate? : Date;
    archive : boolean=false;
    lastPayAmt? : number;
    lastPayDate? : Date;
    lastLtrCode? : string = "";
    lastLtrDate? : Date;
    lastBillType? : string = "";
    lastBillDate? : Date;
    promiseAmount? : number;

    promiseDate? : Date;
    rep? : string = "";
    userID? : number;
    miscText1? : number;
    miscText2? : number;
    miscText3? : number;
    miscDate1? : Date;
    miscDate2? : Date;
    miscDate3? : Date;
    miscNum1? : boolean;
    miscNum2? : boolean;
    miscNum3? : boolean;
    interest? : boolean;
    screenDate? : Date;
    applicationDate? : Date;
    applicationType? : string = "";
    dispositionText? : string = "";
    dispositionDate? : Date;
    denialType? : string = "";
    commentText? : string = "";
    submitDate? : Date;
    resubmitDate? : Date;
    returnedMail : boolean=false;
    actionCode? : string = "";
    actionDate? : Date;
    accountFlagType? : string = "";
    accountFlagDate? : Date;
    mRN? : string = "";
    fullName? : string = "";
    rpFullName? : string = "";


    user? : Users = new Users;


    client? : Client = new Client;


    project? : Project = new Project;
}
export class AccountTied{
    acctid: number = 0;
    acctName: string = "";
    proximity: string = "";
    acctAddress: string = "";
    acctCity: string = "";
    dateOfBirth?: Date;
    socialsec: string = "";
}

export class AccountWorkQRequest{
    clientCode?: string = "";
    masterCode?: string = "";
    cLientOrMaster?: string = "";
    nextReview?: Date;
    finClassCode?: string = "";
    statusCode?: string = "";
    placementDate?: Date;
    balanceDue?: number = 0;
}


