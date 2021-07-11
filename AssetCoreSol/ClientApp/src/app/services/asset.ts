import { Category } from "../models/category";

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

  statusName: string;
  categoryName: string;

  categoryList: Category[];
}
