import { Category } from "./category";

 export class Asset {

  id: string;
  description: string;
  employeeId: string;
  assetCategoryId: string;
  statusId: string;
  departmentID: string;
  make: string;
  modelNumber: string;
  computerName: string;
  dateAcquired: string;

  //mapped names
  statusName: string;
  categoryName: string;
  departmentName: string;
  employeeName: string;
}
