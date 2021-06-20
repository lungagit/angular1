import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  adverts: Advert[] = [];
  advertSub: Subscription;

  constructor(private advertsServive: AdvertsService) { }

  ngOnInit(): void {
    this.advertSub = this.advertsServive.getAdverts().subscribe({
      next: adverts => {
        this.adverts = adverts;
      },
      error: err => this.errorMessage = err
    });

  }
  ngOnDestroy(): void{
    if(this.advertSub) {
      this.advertSub.unsubscribe();
    }
  }
}
