import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-category-feature',
  templateUrl: './category-feature.component.html',
  styleUrls: ['./category-feature.component.scss'],
})
export class CategoryFeatureComponent {
  @Input() selectedCategoryId: number | null;
  form!: FormGroup;

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoriesComponent: CategoriesComponent
  ) {}

  ngOnChanges() {
    this.editCategoryForm();
    if (
      this.selectedCategoryId !== null &&
      this.selectedCategoryId !== undefined
    ) {
      this.getDetailCategory();
    }
  }

  getDetailCategory() {
    if (this.selectedCategoryId !== undefined) {
      this.http.getById<Category>(
        `categoryRead`,
        this.selectedCategoryId,
        (res) => {
          this.form.patchValue({
            title: res.title,
            description: res.description,
          });
        }
      );
    }
  }

  editCategoryForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCategory(id?: number) {
    if (id !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Kategoriyi Güncellemek İstediğinize Emin Misiniz?',
        header: 'Kategori Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Kategori Güncelleme İşlemi Başarılı',
          });

          this.http.put<Category>(
            `categoryUpdate`,
            this.selectedCategoryId,
            this.form.value,
            () => {
              this.router.navigateByUrl('/admin/categories');
              this.categoriesComponent.sidebarVisible = false;
              window.location.reload();
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kategori Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Kategori Eklemek İstediğinize Emin Misiniz?',
        header: 'Kategori Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Kategori Ekleme İşlemi Başarılı',
          });

          this.http.post<Category>(`categoryCreate`, this.form.value, () => {
            this.router.navigateByUrl('/admin/categories');
            this.categoriesComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kategori Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }

  get newTitle(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get newDescription(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
