import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'
import { ActivatedRoute } from '@angular/router';


import { FormBuilder, FormGroup, Validators, NgForm, NgControl } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { Asset } from '../models/asset'; //import Asset class
import { Category } from '../models/category'; // import Category class
import { AssetModel } from '../models/assetModel';

@Component({
    selector: 'app-assets',
    templateUrl: './asset-details.component.html',
    styleUrls: ['./asset-details.component.css']
  })
  
  
  export class AssetDetailsComponent implements OnInit {

    isLoading = new BehaviorSubject(false);
    title: string = "Asset Details";
    assetDetails: AssetModel = new AssetModel;
    public categoryList: any;
    isReadOnly = true;
    public isChecked = false;

    returnedMessage: string = "";
    isEditChecked = false;
    assetForm: FormGroup;
    listData: any;
    public deletedSuccessfulMessage: any;
    successfullyDeletedMessageKey: string = "successfullyDeletedMessage"
    isDeletedSuccessfully = false;
    computerName: string = "";

    public departmentList: any;
    public statusList: any;
    public employeeList: any;
    selectedItem: string = ""; //selected item for Status/Condition dropdownlist
    selectedCategoryItem: string = ""; //selected item for Category
    constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder, private router: ActivatedRoute) {

      this.assetForm = this.fb.group({
        computerName: ['', Validators.required],
        description: ['', Validators.required],
        make: ['', Validators.required],
        modelNumber: ['', Validators.required],
        statusId: ['', Validators.required],
        assetCategoryId: ['', Validators.required],
        departmentID: ['', Validators.required],
        employeeId: ['', Validators.required]
      });

      
    }
    ngOnInit(): void {
      var successfullyAdded =localStorage.getItem(this.successfullyDeletedMessageKey);
      if(successfullyAdded !== ""){
        this.isDeletedSuccessfully = true;
        this.deletedSuccessfulMessage = successfullyAdded;
        localStorage.removeItem(this.successfullyDeletedMessageKey);
      }
      this.setTitle(this.title);
      this.GetAssetDetail();

     // this.statusEnum = Object.values(StatusEnum).filter(value => typeof value === 'string'); //load all the values from the enum

      //this.selectedItem  = enumToString(this.assetDetails.statusId);
    }

    //html button function
    editItem() {
      //data will be updated when Submit button from edit/details page is clicked.
      this.assetDetails.asset.computerName = (this.assetForm.value.computerName) ? this.assetForm.value.computerName : this.assetDetails.asset.computerName;
      this.assetDetails.asset.description = (this.assetForm.value.description) ? this.assetForm.value.description : this.assetDetails.asset.description;
      this.assetDetails.asset.make = (this.assetForm.value.make) ? this.assetForm.value.make : this.assetDetails.asset.make;
      this.assetDetails.asset.modelNumber = (this.assetForm.value.modelNumber) ? this.assetForm.value.modelNumber : this.assetDetails.asset.modelNumber;
      this.assetDetails.asset.statusId =  (this.assetForm.value.statusId) ? this.assetForm.value.statusId : this.assetDetails.asset.statusId;
      this.assetDetails.asset.assetCategoryId = (this.assetForm.value.assetCategoryId) ? this.assetForm.value.assetCategoryId : this.assetDetails.asset.assetCategoryId;
      this.assetDetails.asset.departmentID = (this.assetForm.value.departmentID) ? this.assetForm.value.departmentID : this.assetDetails.asset.departmentID;
      this.assetDetails.asset.employeeId = (this.assetForm.value.employeeId) ? this.assetForm.value.employeeId : this.assetDetails.asset.employeeId;
      //add more fields. For now, keep those 4 above.
  
      this.EditAsset(); //call this to subscribe to service that calls AssetController
      
    }
    GetAssetDetail() {
      let assetId: any = this.router.snapshot.params;
      this.assetService.getAssetDetail(assetId.id).subscribe((data) => {
        this.assetDetails = data;
        this.categoryList = this.assetDetails.categoryList;
        this.statusList = this.assetDetails.statusList;
        this.departmentList = this.assetDetails.departmentList;
        this.employeeList = this.assetDetails.employeeList;

        //Default dropdown values
        //loop for Category dropdownlist
        this.categoryList.forEach((cat: any) => {
            if(cat.assetCategoryId === this.assetDetails.asset.assetCategoryId){
              this.assetForm.controls['assetCategoryId'].setValue(this.assetDetails.asset.assetCategoryId); //setting a value of the Category dropdownlist.
            }
        });
        //loop for Status dropdownlist
        this.statusList.forEach((status: any) => {
          if(status.statusId === this.assetDetails.asset.statusId){
            this.assetForm.controls['statusId'].setValue(this.assetDetails.asset.statusId); //setting a value of the Category dropdownlist.
          }
        });
        //loop for Department dropdownlist
        this.departmentList.forEach((dep: any) => {
          if(dep.id === this.assetDetails.asset.departmentID){
            this.assetForm.controls['departmentID'].setValue(this.assetDetails.asset.departmentID); //setting a value of the Category dropdownlist.
          }
        });

        //loop for employee list
        this.employeeList.forEach((emp: any)=> {
          if(emp.id === this.assetDetails.asset.employeeId){
            this.assetForm.controls['employeeId'].setValue(this.assetDetails.asset.employeeId); //setting selected value of employee dropdownlist
          }
        });
      });
    }

    //update asset details
    isEditCheckboxChecked(){
      if(this.isChecked){
        this.isEditChecked = true;
        this.isReadOnly = false;
      }
      else{
        this.isReadOnly = true;
        this.isEditChecked = false;
      }
    }

    //method to subscribe to Asset Service
    EditAsset() {
      let pagePassedValue: any = this.router.snapshot.params;
      this.assetService.editAsset(pagePassedValue.id, this.assetDetails.asset);
      window.location.reload();
    }

    //method delete or remove a record
    deleteItem(url: string) {
      let assetId: any = this.router.snapshot.params;

      var returnedMessage = this.assetService.deleteAsset(assetId.id).toString();
        localStorage.removeItem(this.successfullyDeletedMessageKey);
        localStorage.setItem(this.successfullyDeletedMessageKey, returnedMessage);
        window.open(url, "_self");     
    }

    //page title 
    public setTitle(newTitle: string) {
      this.pageTitle.setTitle(newTitle);
    }
}
