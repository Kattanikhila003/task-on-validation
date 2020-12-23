import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task1';
  constructor(private fb: FormBuilder, private _validation: ValidationService) {
  }
  
  signUpForm: FormGroup;

  validationMessages = {
    'firstname': {
      'required': 'firstname is required.',
    },
    'lastname': {
      'required': 'lastname is required.',
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Please provide valid Email ID'
    },
    'phone':{
      'required':'phone number is required',
    }
    
  };

  formErrors = {};


  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this._validation.regex.email)]],
      phone:['',[Validators.required]]
    },
     );

    this.signUpForm.valueChanges.subscribe(
      value => {
        this.logValidationErrors()
      }
    );
  }


  logValidationErrors() {
    this.formErrors = this._validation.getValidationErrors(this.signUpForm, this.validationMessages);
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

}


