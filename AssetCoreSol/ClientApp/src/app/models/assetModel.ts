import { Category } from "./category";
import { Department } from "./department";
import { Status } from "./status";
import { Asset } from "./asset";
import { Employee } from "./employee";
import { AssetAuditLog } from "./assetAuditLog";
import { CheckInOutQueue } from "./checkInOutQueue";

 export class AssetModel {

  asset: Asset = new Asset; //need to instantiate here
  assetList: Asset[];
  categoryList: Category[];
  statusList: Status[];
  departmentList: Department[];
  employeeList: Employee[];
  assetAuditLogList: AssetAuditLog[];
  checkInOutQueueList: CheckInOutQueue[];
}
