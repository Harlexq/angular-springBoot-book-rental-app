import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUsers } from 'src/app/models/AdminUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AdminLoginComponent {
  form!: FormGroup;
  passType = 'password';
  userError = '';
  userData: AdminUsers[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm();
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  passwordShow() {
    if (this.passType == 'password') {
      this.passType = 'text';
    } else if (this.passType == 'text') {
      this.passType = 'password';
    }
  }

  login() {
    this.http.get<AdminUsers[]>(`adminUserReadAll`, (res) => {
      this.userData = res;
      const resFind = res.find(
        (user) =>
          user.email === this.form.value.email &&
          user.password === this.form.value.password
      );
      if (resFind) {
        localStorage.setItem('adminUserToken', resFind.token);
        this.router.navigateByUrl('/admin');
      } else {
        this.userError = 'E-Mail Adresi veya Şifre Yanlış';
      }
    });
  }

  get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
