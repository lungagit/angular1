import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private auth: AuthenticateService) {
     
   }

  ngOnInit(): void {
    this.auth.isAuthenticated = false;

  }
  public get authenticated(): boolean {
    return this.auth.isAuthenticated;
  }
  onLogout(): void{
    this.auth.logout();
  }

}
