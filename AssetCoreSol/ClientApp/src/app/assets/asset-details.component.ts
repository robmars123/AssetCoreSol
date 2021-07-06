import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'
import { ActivatedRoute } from '@angular/router'

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { Asset } from '../services/asset'; //import Asset class

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
    assetForm: FormGroup;
    listData: any;

    constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder, private router: ActivatedRoute) {

      this.listData = [];

      this.assetForm = this.fb.group({
        computerName: ['', Validators.required],
        description: ['', Validators.required],
        make: ['', Validators.required],
        modelNumber: ['', Validators.required]
      })
    }
    ngOnInit(): void {
      this.setTitle(this.title);
      this.GetAssetDetail();
    }
    editItem() {
      this.assetDetails.computerName = (this.assetForm.value.computerName) ? this.assetForm.value.computerName : this.assetDetails.computerName;
      this.assetDetails.description = (this.assetForm.value.description) ? this.assetForm.value.description : this.assetDetails.description;
      this.assetDetails.make = (this.assetForm.value.make) ? this.assetForm.value.make : this.assetDetails.make;
      this.assetDetails.modelNumber = (this.assetForm.value.modelNumber) ? this.assetForm.value.modelNumber : this.assetDetails.modelNumber;
      //add more fields. For now, keep those 4 above.
  
      this.EditAsset();
      
    }
    GetAssetDetail() {
      let pagePassedValue: any = this.router.snapshot.params;
      this.assetService.getAssetDetail(pagePassedValue.id).subscribe((data) => {
        this.assetDetails = data;
      })
    }

    isEdit(){
      if(this.isChecked)
      this.isReadOnly = false;
      else
      this.isReadOnly = true;
    }

    EditAsset() {
      let pagePassedValue: any = this.router.snapshot.params;
      this.assetService.editAsset(pagePassedValue.id, this.assetDetails);
      window.location.reload();
    }

    //page title 
    public setTitle(newTitle: string) {
      this.pageTitle.setTitle(newTitle);
    }
}