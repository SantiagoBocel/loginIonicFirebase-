import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc:AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(email,password){
    // console.log("Email",email.value);
    // console.log("Password",password);
    try{
      const user = await this.authSvc.register(email.value,password.value);
      if(user)
      {
        console.log('User->',user);
        const isverified = this.authSvc.isEmailVerified(user);
        this.redirecUser(isverified);
      }
    }catch(error){
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
