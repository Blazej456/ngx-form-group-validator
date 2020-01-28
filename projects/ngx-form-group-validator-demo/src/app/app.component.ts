import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgxGroupValidators } from 'ngx-form-group-validator';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'fgv-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgxGroupValidator';
  form: FormGroup;
  matcher: ErrorStateMatcher = {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!(form.invalid && form.errors.comment && form.errors.comment.required === true);
    }
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkbox1: [true],
      checkbox2: [false],
      comment: ['']
    }, {
      validators: NgxGroupValidators.sync({
        comment: {
          condition: {
            paths: ['checkbox1', 'checkbox2'],
            check: (a, b) => a.value === true && b.value === true
          },
          validators: Validators.required
        }
      })
    });
  }
}
