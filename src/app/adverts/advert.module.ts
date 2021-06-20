import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../authenticate/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdvertEditComponent } from './advert-edit/advert-edit.component';
import { AppData } from '../shared/app-data';

@NgModule({
  declarations: [AdvertsComponent, 
                 LoginComponent,
                 RegisterComponent, 
                 AdvertEditComponent ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(AppData),
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'adverts',
        canActivate: [AuthGuard],
        component: AdvertsComponent 
      },
      {
        path: 'adverts/:id/edit',
        canActivate: [AuthGuard],
        component: AdvertEditComponent,
      }
    ])
  ],
})
export class AdvertModule { }
