import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class WebLoginComponent {
  form!: FormGroup;
  passType = 'password';
  userError = '';

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
    this.http.get<WebUsers[]>(`webUserReadAll`, (res) => {
      const resFind = res.find(
        (user) =>
          user.email === this.form.value.email &&
          user.password === this.form.value.password
      );
      if (resFind) {
        if (resFind.banned) {
          this.userError = 'Kullanıcı Banlandı Giriş Yapamazsınız';
        } else {
          localStorage.setItem('webUserToken', resFind.token);
          this.router.navigateByUrl('/');
        }
      } else {
        this.userError = 'E-Mail Adresi veya Şifre Yanlış';
      }
    });
  }
}
