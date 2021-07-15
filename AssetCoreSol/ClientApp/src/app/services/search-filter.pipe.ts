import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from './asset';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
loweredCaseSearchValue: string = "";
  transform(Assets: Asset[], searchValue: string): any {
   this.loweredCaseSearchValue = searchValue.toLowerCase();
    if(!Assets || !searchValue){
      return Assets;
    }

    return Assets.filter(asset=> asset.departmentName.toLocaleLowerCase().includes(this.loweredCaseSearchValue) 
                          || asset.departmentID.toString().includes(this.loweredCaseSearchValue) 
                          || asset.computerName.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.id.toString().includes(this.loweredCaseSearchValue)
                          || asset.make.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.modelNumber.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.employeeName.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.categoryName.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.description.toLowerCase().includes(this.loweredCaseSearchValue)
                          || asset.statusName.toLowerCase().includes(this.loweredCaseSearchValue)
                          );

    return null;
  }

}
