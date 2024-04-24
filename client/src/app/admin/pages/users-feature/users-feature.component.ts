import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientService } from 'src/app/services/http-client.service';
import { UsersComponent } from '../users/users.component';
import { WebUsers } from 'src/app/models/WebUsers';

@Component({
  selector: 'app-users-feature',
  templateUrl: './users-feature.component.html',
  styleUrls: ['./users-feature.component.scss'],
})
export class UsersFeatureComponent {
  @Input() selectedUserId: number;
  form!: FormGroup;
  user: WebUsers;

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usersComponent: UsersComponent
  ) {}

  ngOnChanges() {
    this.editUserForm();
    this.getDetailUser();
  }

  getDetailUser() {
    this.http.getById<WebUsers>('webUserRead', this.selectedUserId, (res) => {
      this.user = res;
      this.form.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: res.password,
        banned: res.banned,
      });
    });
  }

  editUserForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      banned: [false],
    });
  }

  updateUser() {
    this.confirmationService.confirm({
      message: 'Bu Kullanıcıyı Güncellemek İstediğinize Emin Misiniz?',
      header: 'Kullanıcı Güncelleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Kullanıcı Güncelleme İşlemi Başarılı',
        });

        const updatedUser: WebUsers = {
          ...this.user,
          ...this.form.value,
        };

        this.http.put<WebUsers>(
          `webUserUpdate`,
          this.selectedUserId,
          updatedUser,
          (res) => {
            this.usersComponent.sidebarVisible = false;
            window.location.reload();
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kullanıcı Güncelleme İşlemi İptal Edildi',
        });
        this.usersComponent.sidebarVisible = false;
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

  get newBanned(): FormControl {
    return this.form.get('banned') as FormControl;
  }
}
