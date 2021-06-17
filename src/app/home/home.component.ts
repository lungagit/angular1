import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticateService) { }

  ngOnInit(): void {
  }
  onLogout(): void{
    this.auth.logout();
  }
}
