import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isAuthenticated: boolean;
  constructor(private router: Router) {
      
   }
    login(email: string, password: string): void{
        let user = {
            email,
            password
        }
        if(user){
            this.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/adverts']);
        }
        
    }
    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
    }
}
