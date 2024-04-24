import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rental-books',
  templateUrl: './rental-books.component.html',
  styleUrls: ['./rental-books.component.scss'],
})
export class RentalBooksComponent {
  currentUser: WebUsers;
  user: WebUsers;
  rentedBooks: Books[] = [];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('webUserToken');
    if (token) {
      this.http.get<WebUsers[]>(`webUserReadAll`, (res) => {
        this.currentUser = res.find((user) => user.token === token);
        if (this.currentUser) {
          this.getUserDetail();
        }
      });
    }
  }

  getUserDetail() {
    this.http.getById<WebUsers>(`webUserRead`, this.currentUser.id, (res) => {
      this.user = res;
      if (this.user.rentalBooks && this.user.rentalBooks.length > 0) {
        const bookIds = this.user.rentalBooks.map((rb) => rb.bookId);
        this.getBooks(bookIds);
      }
    });
  }

  getBooks(bookIds: number[]) {
    bookIds.forEach((bookId) => {
      this.http.getById<Books>(`bookRead`, bookId, (res) => {
        this.rentedBooks.push(res);
      });
    });
  }

  calculatePayment(id: number): number {
    const book = this.rentedBooks.find((book) => book.id === id);
    const rentedBook = this.user.rentalBooks.find((rb) => rb.bookId === id);
    if (!rentedBook) return 0;
    const rentDate = new Date(rentedBook.rentDate);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - rentDate.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const price = book.price;
    return days * price;
  }

  returnBook(id: number) {
    this.confirmationService.confirm({
      message: `Bu Kitabı İade Etmek İstediğinize Emin Misiniz?`,
      header: 'Kitabı İade Et',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: `${this.calculatePayment(id)} Öde`,
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        const bookIndex = this.rentedBooks.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
          this.rentedBooks[bookIndex].isRented = false;
          this.rentedBooks[bookIndex].rentedFrom = -1;

          const rentedBookIndex = this.user.rentalBooks.findIndex(
            (rb) => rb.bookId === id
          );

          if (rentedBookIndex !== -1) {
            this.user.rentalBooks.splice(rentedBookIndex, 1);
          }

          this.http.putFind<Books>(
            `bookUpdate/rent`,
            this.rentedBooks[bookIndex],
            (res) => {}
          );

          this.http.put<WebUsers>(
            `webUserUpdate`,
            this.currentUser.id,
            this.user,
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'İade İşlemi Başarılı',
                detail: 'Kitap başarıyla iade edildi.',
              });
              window.location.reload();
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kitap İade İşlemi İptal Edildi',
        });
      },
    });
  }
}
