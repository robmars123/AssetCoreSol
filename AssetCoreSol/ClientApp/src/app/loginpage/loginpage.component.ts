import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';
import { UserModel } from '../models/userModel';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  template:`
  {{ isLoggedIn }}
  `,
})
export class LoginpageComponent implements OnInit {
  title: string = "Login";
  @Output() updateDataEvent = new EventEmitter<string | null>();
  isLoggedIn = false;
  public responseModel: UserModel = new UserModel();
  model: any;
  validationMessage: string = "";
  loginForm: FormGroup;
  constructor(private loginService: LoginService,private router:Router,private fb: FormBuilder, private pageTitle: Title ) { 
    this.model = [];
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.setTitle(this.title);
    var userLoginToken = this.loginService.getCurrentUserLoggedIn();
    if(userLoginToken != null || undefined){
      this.updateDataEvent.emit(userLoginToken); //send back to App-Component as Parent component
      this.isLoggedIn = true;

    }
  }
  login(){
    if (this.loginForm.valid) {
      this.model = [];
      this.validationMessage = "";
      this.model.push(this.loginForm.value);
      
      this.authenticate(this.model);
    }
  }
  updateEmitter(){
        this.updateDataEvent.emit(this.responseModel.token);
  }
  authenticate(data: any){
     this.loginService.login(data).subscribe((response) => { 
      console.log(response);
      this.responseModel = response;

      if(this.responseModel.isLoginSuccessful){
        this.updateEmitter();
      }
    });
  }

  public setTitle(newTitle: string) {
    this.pageTitle.setTitle(newTitle);
  }
}
