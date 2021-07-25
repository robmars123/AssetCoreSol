import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './models/userModel';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `

  `,
})
export class AppComponent implements OnInit{
  model: any;
  isLoggedIn = false;

constructor(private loginService: LoginService,private router:Router){
}
  ngOnInit() {
    var userLoginToken = this.loginService.getCurrentUserLoggedIn();
    if(userLoginToken != null || undefined){
      this.isLoggedIn = true;
     // this.router.navigate(['/home']);
    }
  }

  updateData(authenticatedUserToken: string | null){
    var token = authenticatedUserToken as string;
    if(authenticatedUserToken != null || undefined){
      localStorage.setItem("CurrentLoggedUser", token);
      this.isLoggedIn = true;
    }
  }

  logout(){
    let logoutSuccessful = this.loginService.logoutUser();
    if(logoutSuccessful)
      this.isLoggedIn = false;
  }
}
