
import { ViewEncapsulation, ViewChild } from '@angular/core';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { Asset } from '../services/asset'; //import Asset class

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AssetsComponent implements OnInit {
  title: string = "Assets Page";
  isLoading = new BehaviorSubject(false);
  isAddedSuccessfulMessage = false;
  isDeletedSuccessfulMessage = false;
  public assetList: Asset[] = [];
  public successfulMessage: any;
  assetForm: FormGroup;
  listData: any;
  totalAssets: number = 0;
  successfullyAddedMessageKey: string = "successfullyAddedMessage";
  successfullyDeletedMessageKey: string = "successfullyDeletedMessage"
  constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder) {
    this.listData = [];

    this.assetForm = this.fb.group({
      computerName: ['', Validators.required],
      description: ['', Validators.required],
      make: ['', Validators.required],
      modelNumber: ['', Validators.required]
    })
  }

  //add record
  addItem() {

    if (this.assetForm.valid) {
      this.listData.push(this.assetForm.value); //100% got the data here.
      this.assetForm.reset(); //use this after the form is added to db

      this.AddAsset();
    }
  }

  reset() {
    this.assetForm.reset();
  }

  //removeItem(element) {
  //  this.listData.forEach((value, index) => {
  //    if (value == element)
  //      this.listData.splice(index, 1);
  //  });


  //page loads
  ngOnInit() {
    this.GetAssets();
    this.isLoading.next(true);

    var successfullyAdded =localStorage.getItem(this.successfullyAddedMessageKey);
    var successfullyDeleted =localStorage.getItem(this.successfullyDeletedMessageKey);

    if(successfullyAdded !== null){
      this.isAddedSuccessfulMessage = true;
      this.successfulMessage = successfullyAdded;
      localStorage.removeItem(this.successfullyAddedMessageKey);
    }
    else if(successfullyDeleted !== null){
      this.isDeletedSuccessfulMessage = true;
      this.successfulMessage = successfullyDeleted;
      localStorage.removeItem(this.successfullyDeletedMessageKey);
    }

    this.setTitle(this.title);

  }

  pageRefresh$ = new BehaviorSubject<boolean>(true);

  //get list
  GetAssets() {
    this.assetService.getAssets().subscribe((data) => {
     this.assetList = data;
     this.totalAssets = this.assetList.length;
    });
  }

  //finally, call this method to subscribe to Controller.
  AddAsset() {
     var returnedMessage = this.assetService.addAsset(this.listData).toString();
     localStorage.removeItem(this.successfullyAddedMessageKey);
     localStorage.setItem(this.successfullyAddedMessageKey, returnedMessage);
    window.location.reload();
  }

  //page title
  public setTitle(newTitle: string) {
    this.pageTitle.setTitle(newTitle);
  }
}

