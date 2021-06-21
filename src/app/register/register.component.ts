import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControlName  } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { GenericValidator } from '../shared/generic-validator';
import { AuthenticateService } from '../authenticate/authenticate.service';

function passwordMatcher(c: AbstractControl): {[key: string]: | boolean}| null{
  let passwordControl = c.get('password');
  let confirmContol = c.get('confirmPassword');

  if(passwordControl.pristine || confirmContol.pristine){
    return null;
  } 
  
  if(passwordControl?.value === confirmContol?.value){
    return null;
  }
  
  return {'match': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  registerForm: FormGroup;
  user: User;
  invalid: boolean = false;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private auth: AuthenticateService) {

      this.validationMessages = {
        firstName: {
          required: 'First name is required.',
          minlength: 'First name must be at least three characters.',
          maxlength: 'First name cannot exceed 50 characters.',
          pattern: 'Invalid first name'
        },
        lastName: {
          required: 'Last name is required.',
          minlength: 'Last name must be at least three characters.',
          maxlength: 'Last name cannot exceed 50 characters.',
          pattern: 'Invalid last name'
        },
        email: {
          required: 'Email is required.',
          email: 'Email address is invalid'
        },
        password: {
          required: 'Password is required.',
          minlength: 'Password must be at least 8 characters.',
          pattern: 'Invalid password'
        },
        confirmPassword: {
          required: 'Please confirm the password.',
          minlength: 'Password must be at least 8 characters.',
          pattern: 'Invalid password'
        },
        
    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.auth.isAuthenticated = false;
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
      }, {validators: passwordMatcher})
    })

  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.registerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);

    });
  }

  onRegister(): void{
    if(this.registerForm.invalid){
      this.invalid = true;
      return;
    }
    let authEmail = this.registerForm.get('email')?.value;
    let authPass = this.registerForm.get('passwordGroup.password')?.value;

    let authData = {
      authEmail,
      authPass
    }

    this.user = {
                  id: null,
                  firstName: this.registerForm.get('firstName')?.value,
                  lastName: this.registerForm.get('lastName')?.value,
                  email: this.registerForm.get('email')?.value,
                  password: this.registerForm.get('passwordGroup.password')?.value,
                }

    this.userService.registerUser(this.user).subscribe(() =>{
      window.localStorage.setItem('authData', JSON.stringify(authData));
      this.registerForm.reset();
      this.auth.login(authEmail, authPass);
      this.auth.isAuthenticated = true;
      this.router.navigate(['/adverts']);
    });
  }
}
