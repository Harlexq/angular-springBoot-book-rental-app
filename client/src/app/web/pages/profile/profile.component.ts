import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  form!: FormGroup;
  currentUser: WebUsers;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.profileForms();
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('webUserToken');
    this.http.get<WebUsers[]>(`webUserReadAll`, (res) => {
      this.currentUser = res.find((user) => user.token === token);

      if (this.currentUser) {
        this.form.patchValue({
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          email: this.currentUser.email,
        });
      }
    });
  }

  profileForms() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    this.confirmationService.confirm({
      message: 'Profilinizi Güncellemek İstediğinize Emin Misiniz?',
      header: 'Profili Güncelle',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Profil Başarılı Bir Şekilde Güncellendi',
        });
        const updatedUser: WebUsers = {
          ...this.currentUser,
          ...this.form.value,
        };

        this.http.put<WebUsers>(
          `webUserUpdate`,
          this.currentUser.id,
          updatedUser,
          (res) => {
            window.location.reload();
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Profil Güncelleme İşlemi İptal Edildi',
        });
      },
    });
  }

  get newFirstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get newLastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
