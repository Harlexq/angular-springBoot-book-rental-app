import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books: Books[] = [];
  categories: Category[] = [];
  users: WebUsers[] = [];
  pagedBooks: Books[] = [];
  rows: number = 10;
  first: number = 0;
  rowSize: number[] = [10, 20, 30];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBooks();
    this.getCategories();
    this.getUsers();
  }

  getBooks() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = res;
      this.paginateBooks();
    });
  }

  paginateBooks() {
    this.pagedBooks = this.books.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateBooks();
  }

  getCategories() {
    this.http.get<Category[]>(`categoryReadAll`, (res) => {
      this.categories = res;
    });
  }

  getUsers() {
    this.http.get<WebUsers[]>(`webUserReadAll`, (res) => {
      this.users = res;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.title : '';
  }

  getUserName(userId: number): string {
    const user = this.users.find((b) => b.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  deleteBook(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Kitabı Silmek İstediğinize Emin Misiniz?',
      header: 'Kitabı Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Kitap Silme İşlemi Başarılı',
        });

        this.http.delete<Books>(`bookDelete`, id, (res) => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kitap Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  sidebarVisible: boolean = false;
  selectedBookId: number | null = null;

  toggleSidebar(id?: number) {
    this.selectedBookId = id || null;
    this.sidebarVisible = !this.sidebarVisible;
  }
}
