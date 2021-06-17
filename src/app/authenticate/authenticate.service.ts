import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private router: Router) { }
    login(email: string, password: string): void{
        let user = {
            email,
            password
        }
        if(user){
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/home']);
        }
        
    }
    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
