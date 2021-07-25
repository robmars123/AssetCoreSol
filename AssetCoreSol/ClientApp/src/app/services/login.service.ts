import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { UserModel } from '../models/userModel';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedInTokenKey: string = "CurrentLoggedUser";
  toJsonString: string = "";
  private data: any;
  apiResponse:LoginModel = new LoginModel();
  public baseUrl: string = 'https://localhost:5001/api/account/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http: HttpClient, private router:Router, injector:Injector) { }

  login(loginModel: LoginModel): Observable<UserModel> {
    let endPoints = "login"
   this.apiResponse; new Observable<UserModel>();
    this.toJsonString = JSON.stringify(loginModel);
    let newStr = this.toJsonString.substring(1, this.toJsonString.length - 1);

 return    this.http.post<UserModel>(this.baseUrl + endPoints, newStr, this.options);

  }

  setData(data: any){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

  getCurrentUserLoggedIn(){
    return localStorage.getItem(this.userLoggedInTokenKey);
  }

  logoutUser(){
    localStorage.removeItem(this.userLoggedInTokenKey);
    return ((localStorage.getItem(this.userLoggedInTokenKey)== null) ? true : false);
  }
}
