import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-banner-books',
  templateUrl: './banner-books.component.html',
  styleUrls: ['./banner-books.component.scss'],
})
export class BannerBooksComponent {
  books: Books[] = [];
  categories: Category[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBooks();
    this.getCategories();
  }

  getBooks() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = this.shuffle(res).slice(0, 2);
    });
  }

  shuffle(array: Books[]): Books[] {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  getCategories() {
    this.http.get<Category[]>(`categoryReadAll`, (res) => {
      this.categories = res;
    });
  }

  categoryName(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.title : '';
  }
}
