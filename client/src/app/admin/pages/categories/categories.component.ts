import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Category[] = [];
  pagedCategories: Category[] = [];
  rows: number = 10;
  first: number = 0;
  rowSize: number[] = [10, 20, 30];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(`categoryReadAll`, (res) => {
      this.categories = res;
      this.paginateCategories();
    });
  }

  paginateCategories() {
    this.pagedCategories = this.categories.slice(
      this.first,
      this.first + this.rows
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateCategories();
  }

  deleteCategory(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Kategoriyi Silmek İstediğinize Emin Misiniz?',
      header: 'Kategori Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Kategori Silme İşlemi Başarılı',
        });

        this.http.delete<Category[]>(`categoryDelete`, id, (res) => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kategoriyi Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  sidebarVisible: boolean = false;
  selectedCategoryId: number | null = null;

  toggleSidebar(id?: number) {
    this.selectedCategoryId = id || null;
    this.sidebarVisible = !this.sidebarVisible;
  }
}
