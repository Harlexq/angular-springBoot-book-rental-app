import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books: Books[] = [];
  pagedBooks: Books[] = [];
  rows: number = 9;
  first: number = 0;
  rowSize: number[] = [9, 18, 27, 36];

  constructor(
    private http: HttpClientService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBooks();

    this.activatedRoute.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.getBooksByCategory(categoryId);
      } else {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = res;
      this.paginateBooks();
    });
  }

  getBooksByCategory(categoryId: string) {
    this.http.get<Books[]>(`bookReadAll?categoryId=${categoryId}`, (res) => {
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

  rent(bookId: number) {
    if (localStorage.getItem('webUserToken')) {
      this.confirmationService.confirm({
        message: 'Bu Kitabı Kiralamak İstediğinize Emin Misiniz?',
        header: 'Kitabı Kirala',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Kiralama Yönlendirme',
            detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
          });
          this.router.navigateByUrl(`/book-detail/${bookId}`);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Kiralama İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message:
          'Bir Kitap Kiralamak İçin Öncelikle Giriş Yapmalısınız Giriş Yapmak İstediğinize Emin Misiniz?',
        header: 'Giriş Yap',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'İptal E',
            detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
          });
          this.router.navigateByUrl('/login');
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Giriş Yapma İşlemi İptal Edildi',
          });
        },
      });
    }
  }
}
