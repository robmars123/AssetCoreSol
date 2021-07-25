import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { AssetService } from '../services/asset.service';
import { AssetModel } from '../models/assetModel';
import * as pluginDataLabels from 'chart.js';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  title: string = "Home";
  public getAssetsResponse: AssetModel = new AssetModel;
  totalAssets: any;
  data = this.loginService.getData();
  assetAuditList: any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private assetService: AssetService, private loginService: LoginService, private pageTitle: Title) {
    if(this.data){
      //this.isLoggedIn = this.data;
     }
     else{
     //  this.router.navigateByUrl('/login');
     }

  }

  ngOnInit() {
    this.GetAssets();
    this.setTitle(this.title);
  }

  GetAssets() {
    this.assetService.getAssets().subscribe((data) => {
      this.getAssetsResponse = data;
      this.totalAssets = this.getAssetsResponse.assetList.length;
      let assetAuditList = this.getAssetsResponse.assetAuditLogList;  

      this.assetAuditList = assetAuditList;
    });


  }

    //Calculate how long agovar startTime, endTime;


  timeSince(startDate: string) {
  let newStartDate = new Date(startDate);
  let endTime = new Date();
  var timeDiff = Math.abs(endTime.getTime() - newStartDate.getTime());
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);

  var days = Math.floor(seconds / (3600*24));

  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var result = "";
  //((days > 0)? days + " day(s) ago": (h == 0) ?"": h + " hour(s) "  +  m  +  "min(s) ago "+ s + " secs ago");
    if (days > 0)
      result = result + days +  " day(s) ago";
    else if (h > 0)
      result = result + h + " hour(s) ago";
    else if (m > 0)
      result = result + m + " min(s) ago";
    else  
      result = result + s + " secs ago"

  return result;
  }

    time: any; // global variable for string interpolation on html
    getCurrentDate(dateParam: string) {
        setInterval(() => {
        this.time = dateParam; //set time variable with current date 
      }, 1000); // set it every one second
    }

    public setTitle(newTitle: string) {
      this.pageTitle.setTitle(newTitle);
    }
}
