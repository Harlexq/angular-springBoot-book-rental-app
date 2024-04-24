import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  bookId: string = '';
  book: Books;
  categories: Category[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDetailBook();
    this.getCategories();
  }

  getDetailBook() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getById<Books>('bookRead', Number(this.bookId), (res) => {
      this.book = res;
    });
  }

  getCategories() {
    this.http.get<Category[]>('categoryReadAll', (res) => {
      this.categories = res;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.title : '';
  }

  rent() {
    const token = localStorage.getItem('webUserToken');

    if (token) {
      this.confirmationService.confirm({
        message: 'Bu Kitabı Kiralamak İstediğinize Emin Misiniz?',
        header: 'Kitabı Kirala',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.http.get<WebUsers[]>('webUserReadAll', (res) => {
            const currentUser = res.find((user) => user.token === token);

            if (this.book.isRented === true) {
              this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'Bu kitap zaten kiralanmış.',
              });
              return;
            }

            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${(
              today.getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}-${today
              .getDate()
              .toString()
              .padStart(2, '0')}`;

            const rentedBook = {
              bookId: this.book.id,
              rentDate: formattedDate,
            };

            currentUser.rentalBooks.push(rentedBook);

            this.book.isRented = true;
            this.book.rentedFrom = currentUser.id;

            this.http.put<WebUsers>(
              'webUserUpdate',
              currentUser.id,
              currentUser,
              () => {}
            );

            this.http.putFind<Books>('bookUpdate/rent', this.book, (res) => {});

            this.messageService.add({
              severity: 'info',
              summary: 'Kiralama İşlemi Başarılı',
              detail: 'Kiralama İşlemi Başarılı Bir Şekilde Yapıldı',
            });
          });
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
            summary: 'İptal Edildi',
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
