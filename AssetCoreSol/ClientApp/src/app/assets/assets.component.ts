import { ViewEncapsulation } from '@angular/core';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AssetsComponent implements OnInit {
  title: string = "Assets Page";
  public assetList: Asset[] = [];
  public baseUrl: string = 'https://localhost:5001/api/assets/';

  constructor(private http: HttpClient, private pageTitle: Title) { }
  ngOnInit() {
    this.GetAssets();
    this.setTitle(this.title);
  }

  pageRefresh$ = new BehaviorSubject<boolean>(true);

  GetAssets() {
    this.pageRefresh$.next(false);
     this.http.get<Asset[]>(this.baseUrl +"index").subscribe(response => {
     this.assetList = response;
   },
     error => {
       console.log(error);
   });
  }

  //page title
  public setTitle(newTitle: string) {
    this.pageTitle.setTitle(newTitle);
  }
}

interface Asset {
  description: string;
  computerName: string;
}

