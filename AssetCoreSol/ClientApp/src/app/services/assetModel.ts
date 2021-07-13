import { Category } from "../models/category";
import { Department } from "../models/department";
import { Status } from "../models/status";
import { Asset } from "./asset";

 export class AssetModel {

  asset: Asset = new Asset; //need to instantiate here
  assetList: Asset[];
  categoryList: Category[];
  statusList: Status[];
  departmentList: Department[];
}
