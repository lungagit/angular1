import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  invalid: boolean = false;
  constructor(private auth: AuthenticateService) {}

  ngOnInit(): void {
    
    this.auth.logout();
  }

  onLogin(email: string, password: string): void{
    if(this.email === '' || this.password === ''){
      this.invalid = true;
      return;
    }
    const authData = window.JSON.parse(localStorage.getItem('authData'))

    if((email !== authData?.authEmail) || (password !== authData?.authPass)) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.auth.login(email, password);
  }
}
