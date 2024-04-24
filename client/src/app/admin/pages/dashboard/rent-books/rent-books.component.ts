import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rent-books',
  templateUrl: './rent-books.component.html',
  styleUrls: ['./rent-books.component.scss'],
})
export class RentBooksComponent {
  books: Books[] = [];
  pagedBooks: Books[] = [];
  rows: number = 3;
  first: number = 0;
  rowSize: number[] = [3];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = res.filter((b) => b.isRented === true);
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
}
