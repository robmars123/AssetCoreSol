export class CheckInOutQueue {
    id!: string;
    assetCategoryName!: string;
    assetId!: string;
    entryDate!: string;
    statusId!: string;
    checkedInBy: string = "";
    operationPerformedBy!: string;
    comments!: string;


    //Additional info
    //Additional info
    currentlyAssignedTo!: string;
}