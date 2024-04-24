import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss'],
})
export class FilterSidenavComponent {
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  constructor(private router: Router, private http: HttpClientService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(`categoryReadAll`, (res) => {
      this.categories = res;
    });
  }

  filterBooksByCategory() {
    if (this.selectedCategories.length > 0) {
      const selectedCategoryIds = this.selectedCategories.map(
        (category) => category.id
      );
      this.router.navigate(['/books'], {
        queryParams: { categoryId: selectedCategoryIds },
      });
    } else {
      this.router.navigate(['/books']);
    }
  }
}
