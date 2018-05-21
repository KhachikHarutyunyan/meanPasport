import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.registerFormBuild();
  }

  ngOnInit() {
  }

  registerFormBuild() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(8),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(6),
      ])]
    });
  }

  register() {}

}
