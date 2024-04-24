import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Banner } from 'src/app/models/Banner';
import { Settings } from 'src/app/models/Settings';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  bannerForm!: FormGroup;
  settingForm!: FormGroup;
  banners: Banner[] = [];
  settings: Settings[] = [];
  selectedFile: File | null = null;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.bannersForm();
    this.getBanners();
    this.settingsForm();
    this.getSettings();
  }

  getBanners() {
    this.http.get<Banner[]>('bannerReadAll', (res) => {
      this.banners = res;
    });
  }

  getSettings() {
    this.http.get<Settings[]>('settingsReadAll', (res) => {
      this.settings = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  addBanner() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>('bannerCreate', formData, (res) => {
      window.location.reload();
    });
  }

  bannersForm() {
    this.bannerForm = this.formBuilder.group({
      image: [''],
    });
  }

  settingsForm() {
    this.settingForm = this.formBuilder.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  deleteBanner(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Banneri İstediğinize Emin Misiniz?',
      header: 'Banner Silme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.http.delete('bannerDelete', id, (res) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Silindi',
            detail: 'Banner Silme İşlemi Başarılı',
          });
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Banner Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  updateSettings() {
    this.confirmationService.confirm({
      message: 'Bu Banneri İstediğinize Emin Misiniz?',
      header: 'Banner Silme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Banner Silme İşlemi Başarılı',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Banner Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  get newBanner(): FormControl {
    return this.bannerForm.get('image') as FormControl;
  }

  get newPhone(): FormControl {
    return this.settingForm.get('phone') as FormControl;
  }

  get newEmail(): FormControl {
    return this.settingForm.get('email') as FormControl;
  }

  get newAddress(): FormControl {
    return this.settingForm.get('address') as FormControl;
  }
}
