import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  register() {
    const user: TokenPayload = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };
    this.authService.register(user).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(err);
    });
  }

}
