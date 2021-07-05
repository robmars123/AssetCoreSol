
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
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AssetsComponent implements OnInit {
  title: string = "Assets Page";
  public assetList: Asset[] = [];

  assetForm: FormGroup;
  listData: any;
  e: any;

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


    this.setTitle(this.title);
  }

  pageRefresh$ = new BehaviorSubject<boolean>(true);

  //get list
  GetAssets() {
    this.assetService.getAssets().subscribe((data) => {
      this.assetList = data;
    })
  }

  //finally, call this method to subscribe to Controller.
  AddAsset() {
    this.assetService.addAsset(this.listData);
    window.location.reload();
  }

  //page title
  public setTitle(newTitle: string) {
    this.pageTitle.setTitle(newTitle);
  }
}

