import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { Advert } from '../advert';
import { AdvertsService } from '../adverts.service';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit, AfterViewInit, OnDestroy  {
@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Advert Edit';
  errorMessage: string;
  advertForm: FormGroup;

  advert: Advert;
  private AdvertSub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private advertsService: AdvertsService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      header: {
        required: 'Advert name is required.',
        minlength: 'Advert name must be at least three characters.',
        maxlength: 'Advert name cannot exceed 50 characters.',
        pattern: 'Invalid advert header'
      },
      description: {
        required: 'Advert decription is required.',
        minlength: 'Decription must be at least three characters.',
        maxlength: 'Decription cannot exceed 250 characters.',
        pattern: 'Invalid description'
      },
      price: {
        required: 'Price is required',
      },
      date: {
        required: 'Date is required',
        pattern: 'Invalid date'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.advertForm = this.fb.group({
      header: ['', [Validators.required, 
                    Validators.minLength(3), 
                    Validators.maxLength(50), 
                    Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],

      description: ['', [Validators.required,
                        Validators.minLength(3), 
                        Validators.maxLength(250), 
                        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
    });

    // Read the product Id from the route parameter
    this.AdvertSub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAdvert(id);
      }
    );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.advertForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.advertForm);
    });
  }

  getAdvert(id: number): void {
    this.advertsService.getAdvert(id)
      .subscribe({
        next: (advert: Advert) => this.displayAdvert(advert),
        error: err => this.errorMessage = err
      });
  }

  displayAdvert(advert: Advert): void {
    if (this.advertForm) {
      this.advertForm.reset();
    }
    this.advert = advert;

    if (this.advert.id === 0) {
      this.pageTitle = 'Add Advert';
    } else {
      this.pageTitle = `Edit Advert: ${this.advert.header}`;
    }
    // Update the data on the form
    this.advertForm.patchValue({
      header: this.advert.header,
      description: this.advert.description,
      price: this.advert.price,
      date: this.advert.date
    });
  }

  deleteAdvert(): void {
    if (this.advert.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the advert: ${this.advert.header}?`)) {
        this.advertsService.deleteAdvert(this.advert.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveAdvert(): void {
    if (this.advertForm.valid) {
      if (this.advertForm.dirty) {
        const p = { ...this.advert, ...this.advertForm.value };

        if (p.id === 0) {
          this.advertsService.createAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.advertsService.updateAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.advertForm.reset();
    this.router.navigate(['/adverts']);
  }

  ngOnDestroy(): void {
    if(this.AdvertSub){
       this.AdvertSub.unsubscribe();
    }  
  }
}

