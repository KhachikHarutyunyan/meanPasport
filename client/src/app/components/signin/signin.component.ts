import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signinForm();
  }

  ngOnInit() {
  }

  signinForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    const user: TokenPayload = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };
    this.authService.login(user).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(err);
    });
  }

}
