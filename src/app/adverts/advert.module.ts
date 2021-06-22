import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdvertEditComponent } from './advert-edit/advert-edit.component';
import { AppData } from '../shared/app-data';

import { AuthGuard } from '../authenticate/auth.guard';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';

@NgModule({
  declarations: [AdvertsComponent, 
                 LoginComponent,
                 RegisterComponent, 
                 AdvertEditComponent, 
                 AdvertDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(AppData),
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'adverts', component: AdvertsComponent 
      },
      {
        path: 'adverts/:id',
        canActivate: [AuthGuard],
        component: AdvertDetailComponent
      },
      {
        path: 'adverts/:id/edit',
        canActivate: [AuthGuard],
        component: AdvertEditComponent
      }
    ])
  ],
})
export class AdvertModule { }
