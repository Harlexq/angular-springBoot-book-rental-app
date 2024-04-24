import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { WebNavItems } from 'src/app/models/WebNavItems';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  categories: Category[] = [];
  books: Books[] = [];

  constructor(
    private http: HttpClientService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getBooks();
  }

  getCategories() {
    this.http.get<Category[]>('categoryReadAll', (res) => {
      this.categories = res.slice(0, 6);
    });
  }

  getBooks() {
    this.http.get<Books[]>('bookReadAll', (res) => {
      this.books = res.slice(0, 6);
    });
  }

  navItems: WebNavItems[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/',
    },
    {
      id: 2,
      title: 'Kitaplar',
      path: '/books',
    },
    {
      id: 3,
      title: 'Bloglar',
      path: '/blogs',
    },
    {
      id: 4,
      title: 'İletişim',
      path: '/contact',
    },
  ];
}
