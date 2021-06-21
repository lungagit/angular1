import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { Advert } from './advert';
import { AdvertsService } from './adverts.service';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.css']
})
export class AdvertsComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  pageTitle: string = 'Adverts'
  advertSub: Subscription;

  public get authenticated(): boolean {
    return this.auth.isAuthenticated;
  }

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this.listFilter ? this.performHeaderFilter(this.listFilter) : this.adverts;
    this.filteredAdverts = this.listFilter ? this.performDescripFilter(this.listFilter) : this.adverts;
  }

  filteredAdverts: Advert[] = [];
   adverts: Advert[] = [];

  constructor(private advertsServive: AdvertsService,
              private auth: AuthenticateService) {
              }

  ngOnInit(): void {
    
    this.advertSub = this.advertsServive.getAdverts().subscribe({
      next: adverts => {
        this.adverts = adverts;
        this.filteredAdverts = this.adverts;
      },
      error: err => this.errorMessage = err
    });

  }

  performHeaderFilter(filterBy: string): Advert[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.adverts.filter((advert: Advert) =>
      advert.header.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  performDescripFilter(filterBy: string): Advert[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.adverts.filter((advert: Advert) =>
      advert.description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnDestroy(): void{
    if(this.advertSub) {
      this.advertSub.unsubscribe();
    }
  }
}
