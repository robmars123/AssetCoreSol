import { ViewEncapsulation, ViewChild } from '@angular/core';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from '../services/asset.service'

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'

import { BehaviorSubject } from 'rxjs';
import { AssetModel } from '../services/assetModel'; // Acts like a view model
import { Asset } from '../services/asset';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ThrowStmt } from '@angular/compiler';

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
  public getAssetsResponse: AssetModel = new AssetModel;
  public successfulMessage: any;
  assetForm: FormGroup;
  listData: any;
  totalAssets: number = 0;
  successfullyAddedMessageKey: string = "successfullyAddedMessage";
  successfullyDeletedMessageKey: string = "successfullyDeletedMessage";
  public statusEnum: any; //dropdownlist for Status
  selectedItem: string = "";
  public categoryList: any;
  public departmentList: any;
  public statusList: any;
  public employeeList: any;
  selectedCategoryItem: string = "";


  startIndex=  0;
  endIndex = 10;
  //Search value
  searchValue: string = "";
  constructor(private assetService: AssetService, private pageTitle: Title, private fb: FormBuilder) {
    this.listData = [];

    this.assetForm = this.fb.group({
      computerName: ['', Validators.required],
      description: ['', Validators.required],
      make: ['', Validators.required],
      modelNumber: ['', Validators.required],
      statusId: ['', Validators.required],
      assetCategoryId: ['', Validators.required],
      departmentId: ['', Validators.required],
      employeeId: ['', Validators.required]
    })
  }
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


  //add record
  addItem() {

    if (this.assetForm.valid) {
      //this.assetForm.value.statusId = StatusEnum[this.assetForm.value.statusId]; //get enum number value instead of string.
      this.listData.push(this.assetForm.value); //100% got the data here.
      this.assetForm.reset(); //use this after the form is added to db

      this.AddAsset();
    }
  }

  reset() {
    this.assetForm.reset();
  }

  getNumberOfArray(length: number){
    return new Array(Math.ceil(length/10));
  }

  updatePageIndex(pageIndex: number){
    this.startIndex = pageIndex * 10;
    this.endIndex = this.startIndex + 10;
  }
  //get list
  GetAssets() {
      this.assetService.getAssets().subscribe((data) => {
      this.getAssetsResponse = data;
      this.totalAssets = this.getAssetsResponse.assetList.length;

     // this.pageSizeOptions = this.totalAssets; //page size based on total assets
      let categories = this.getAssetsResponse.categoryList;
      let statusList = this.getAssetsResponse.statusList;
      let departmentList = this.getAssetsResponse.departmentList;
      let employeeList = this.getAssetsResponse.employeeList;

      var self = this;
      this.getAssetsResponse.assetList.forEach(function (asset) {
              asset.categoryName = self.getCategoryName(asset.assetCategoryId, categories);
              asset.statusName = self.getStatusName(asset.statusId, statusList);
              asset.departmentName = self.getDepartmentName(asset.departmentID,departmentList);
              asset.employeeName = self.getEmployeeName(asset.employeeId, employeeList);
          });   

      this.categoryList = categories;
      this.departmentList = departmentList;
      this.statusList = statusList;
      this.employeeList = employeeList;
    });
  }
 //get categories - this will be called once only after webapi returns the data. Looping through asset list happens only in the Angular client.
 getCategoryName(id: string, categories: any): string{
   let categoryName: string = "";
    categories.forEach(function (cat: { assetCategoryId: any; assetCategoryName: any; }) {
     if (cat.assetCategoryId === id)
     categoryName = cat.assetCategoryName;
   });
   return categoryName;
  }
  //get status for each asset
  getStatusName(id: string, statusList: any): string{
    let statusDescription: string = "";

    statusList.forEach(function (status: { statusId: string; description: string; }) {
      if(status.statusId === id)
      statusDescription = status.description;
    });
    return statusDescription;
  }
  //get department where the asset is assigned
  getDepartmentName(id: string, departmentList: any){
    let departmentName: string = "";

    departmentList.forEach(function(dep: { id: string, name: string}) {
      if(dep.id === id)
          departmentName = dep.name;
    });
    return departmentName;
  }

  getEmployeeName(id: string, employeeList: any){
    let employeeName: string = "";
    
    employeeList.forEach(function(employee: {id: string, firstName: string, lastName: string}){
      if(employee.id === id)
        employeeName = employee.firstName + " " + employee.lastName;
    });
    return employeeName;
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


