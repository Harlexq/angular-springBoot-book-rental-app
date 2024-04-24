import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  basicData: any;
  books: Books[] = [];
  categories: Category[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBooks();
    this.getCategories();
  }

  getBooks() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = res;
      this.updateChartData();
    });
  }

  getCategories() {
    this.http.get<Category[]>(`categoryReadAll`, (res) => {
      this.categories = res;
      this.updateChartData();
    });
  }

  updateChartData() {
    const bookCounts = this.calculateBookCounts();
    const labels = this.categories.map((category) => category.title);
    const data = labels.map((label) => bookCounts[label] || 0);

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Kitap Kategori İstatistiği',
          data: data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  calculateBookCounts() {
    const bookCounts = {};

    this.categories.forEach((category) => {
      const count = this.books.filter(
        (book) => book.categoryId === category.id
      ).length;
      bookCounts[category.title] = count;
    });

    return bookCounts;
  }
}
