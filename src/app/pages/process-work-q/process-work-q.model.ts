export class ProcessWorkQ {    
}
export class ProcessWorkQRequest {    
    clientCode: string = "";
    masterCode: string = "";
    cLientOrMaster: string = "";
    nextReview?: Date;
    finClassCode: string = "";
    statusCode: string[] = [];
    projectCode: string[] = [];
    placementDate?: Date;
    balanceDue: number = 0;
}
