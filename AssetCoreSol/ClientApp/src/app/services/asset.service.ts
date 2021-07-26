import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { AssetModel } from '../models/assetModel';
import { CheckInOutQueue } from '../models/checkInOutQueue';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  public baseUrl: string = 'https://localhost:5001/api/assets/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  toJsonString: any;

  constructor(private http: HttpClient) { }

  addToQueue(postData: CheckInOutQueue){
    let endPoints = "addtoqueue"
    this.toJsonString = JSON.stringify(postData);
    //let newStr = this.toJsonString.substring(1, this.toJsonString.length - 1);
    this.http.post(this.baseUrl + endPoints, this.toJsonString, this.options)
    .subscribe(data => {
  console.log(data);
    });
    return "Record added to check-in queue.";
  }
  getAssets(): Observable<AssetModel> {
    return this.http.get<AssetModel>(this.baseUrl + "index");
  }
  public getAssetDetail(id: number): Observable<AssetModel> {
    return this.http.get<AssetModel>(this.baseUrl + id);
  }

  //Add more methods here to call the API methods from controller
  public addAsset(postData: Asset){
    let endPoints = ""
    this.toJsonString = JSON.stringify(postData);
    let newStr = this.toJsonString.substring(1, this.toJsonString.length - 1);
     this.http.post(this.baseUrl + endPoints, newStr, this.options)
     .subscribe(data => {
   console.log(data);
     });
    //   returnResponse = data as string;
    return "Record added successfully.";
  }

  public editAsset(id: number, postData: Asset) {
    let endPoints = id;
    this.toJsonString = JSON.stringify(postData);
   // let newStr = this.toJsonString.substring(1, this.toJsonString.length - 1);

    //http.put for EDIT
    this.http.put(this.baseUrl + endPoints, this.toJsonString, this.options).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

  public deleteAsset(id: number){
   this.http.delete<string>(this.baseUrl + id).subscribe(data => {
      console.log(data);
        });
        return "Record deleted successfully.";
  }
}
