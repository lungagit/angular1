import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from '../advert';
import { AdvertsService } from '../adverts.service';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css']
})
export class AdvertDetailComponent implements OnInit {
  pageTitle = 'Checkout';
  errorMessage = '';
  advert: Advert | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertsService: AdvertsService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAdvert(id);
    }
  }

  getAdvert(id: number) {
    this.advertsService.getAdvert(id).subscribe({
      next: advert => this.advert = advert,
      error: err => this.errorMessage = err
    });
  }
}