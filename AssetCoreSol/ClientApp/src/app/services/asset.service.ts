import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from './asset';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  public baseUrl: string = 'https://localhost:5001/api/assets/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  toJsonString: any;

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.baseUrl + "index");
  }
  public getAssetDetail(id: number): Observable<Asset> {
    return this.http.get<Asset>(this.baseUrl + id);
  }

  //Add more methods here to call the API methods from controller
  public addAsset(postData: Asset) {
    let endPoints = ""
    this.toJsonString = JSON.stringify(postData);
    let newStr = this.toJsonString.substring(1, this.toJsonString.length - 1);
    this.http.post(this.baseUrl + endPoints, newStr, this.options).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });
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
}
