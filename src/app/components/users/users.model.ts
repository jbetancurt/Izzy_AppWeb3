
import { Rol } from '../rol/rol.model';
export class Users {
    userID? : number;
    loginID? : string;
    password? : string;
    firstName? : string;
    lastName? : string;
    middleName? : string;
    initials? : string;
    pwdChange? : Date;
    pwdExpire? : Date;
    accessLevel? : number;
    userType? : number;
    extension? : number;
    isActive? : boolean;
    domainUserName? : string;
    rolId? : number;
    rol : Rol = new Rol;
}
