import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private autSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }
  async onlogin(email, password){
    try{
      const user = await this.autSvc.login(email.value,password.value);
      if(user)
      { 
        const isverified = this.autSvc.isEmailVerified(user);
        this.redirecUser(isverified);
      }
    }
    catch(error){
      console.log('Error->',error);
    }
  }

  private redirecUser(isverified:boolean): void{
    //redirect -> admin
    //else verificationPage
    if(isverified){
      this.router.navigate(['admin']);
    }
    else{
      this.router.navigate(['verify-email'])
    }
  }

}
