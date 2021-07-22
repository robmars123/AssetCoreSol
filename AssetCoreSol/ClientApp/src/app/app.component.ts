import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'Asset Management Portal';
  isLoggedIn = true;
  //assets: any;

  ngOnInit() {
   
  }

  //constructor(private http: HttpClient) { }



  //getAssets() {
  //  this.http.get('https://localhost:5001/api/values').subscribe(response => {
  //    this.assets = response;
  //  },
  //    error => {
  //      console.log(error);
  //    });
  //}
}
