import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'
import { ActivatedRoute } from '@angular/router';


import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { Asset } from '../services/asset'; //import Asset class
import { StatusEnum } from '../models/statusEnum'; //import enum file

@Component({
    selector: 'app-assets',
    templateUrl: './asset-details.component.html',
    styleUrls: ['./asset-details.component.css']
  })
  
  
  export class AssetDetailsComponent implements OnInit {

    isLoading = new BehaviorSubject(false);
    title: string = "Asset Details";
    assetDetails = new Asset;
    isReadOnly = true;
    public isChecked = false;

    returnedMessage: string = "";
    isEditChecked = false;
    assetForm: FormGroup;
    listData: any;
    public deletedSuccessfulMessage: any;
    successfullyDeletedMessageKey: string = "successfullyDeletedMessage"
    isDeletedSuccessfully = false;

    public statusEnum: any;
    selectedItem: string = "";
    constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder, private router: ActivatedRoute) {

      this.listData = [];

      this.assetForm = this.fb.group({
        computerName: ['', Validators.required],
        description: ['', Validators.required],
        make: ['', Validators.required],
        modelNumber: ['', Validators.required],
        statusId: ['', Validators.required]
      })
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

      this.statusEnum = Object.values(StatusEnum).filter(value => typeof value === 'string'); //load all the values from the enum

      //this.selectedItem  = enumToString(this.assetDetails.statusId);
    }

    //html button function
    editItem() {
      //data will be updated when Submit button from edit/details page is clicked.
      this.assetDetails.computerName = (this.assetForm.value.computerName) ? this.assetForm.value.computerName : this.assetDetails.computerName;
      this.assetDetails.description = (this.assetForm.value.description) ? this.assetForm.value.description : this.assetDetails.description;
      this.assetDetails.make = (this.assetForm.value.make) ? this.assetForm.value.make : this.assetDetails.make;
      this.assetDetails.modelNumber = (this.assetForm.value.modelNumber) ? this.assetForm.value.modelNumber : this.assetDetails.modelNumber;
      this.assetDetails.statusId = (this.assetForm.value.statusId) ? enumToString(this.assetForm.value.statusId) : enumToString(this.assetDetails.statusId);
      //add more fields. For now, keep those 4 above.
  
      this.EditAsset(); //call this to subscribe to service that calls AssetController
      
    }
    GetAssetDetail() {
      let assetId: any = this.router.snapshot.params;
      this.assetService.getAssetDetail(assetId.id).subscribe((data) => {
        this.assetDetails = data;
        this.selectedItem = enumToString(this.assetDetails.statusId); //sets the default value saved on the model asset details.
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
      this.assetService.editAsset(pagePassedValue.id, this.assetDetails);
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


function enumToString(value: any): string {
  return StatusEnum[value];
}