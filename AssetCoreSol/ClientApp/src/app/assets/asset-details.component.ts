import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'
import { ActivatedRoute } from '@angular/router';


import { FormBuilder, FormGroup, Validators, NgForm, NgControl } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { Asset } from '../services/asset'; //import Asset class
import { Category } from '../models/category'; // import Category class
import { AssetModel } from '../services/assetModel';

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

    selectedItem: string = ""; //selected item for Status/Condition dropdownlist
    selectedCategoryItem: string = ""; //selected item for Category
    constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder, private router: ActivatedRoute) {

      this.assetForm = this.fb.group({
        computerName: ['', Validators.required],
        description: ['', Validators.required],
        make: ['', Validators.required],
        modelNumber: ['', Validators.required],
        statusId: ['', Validators.required],
        assetCategoryId: ['', Validators.required]
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
        //loop for Category dropdownlist
        this.categoryList.forEach((cat: { assetCategoryId: string; assetCategoryName: string; }) => {
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
