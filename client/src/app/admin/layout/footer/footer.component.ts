import { Component } from '@angular/core';
import { AdminFooterNavItems } from 'src/app/models/AdminFooterNavItems';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  categories: Category[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>('categoryReadAll', (res) => {
      this.categories = res.slice(0, 6);
    });
  }

  navItems: AdminFooterNavItems[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/admin',
    },
    {
      id: 2,
      title: 'Kitaplar',
      path: '/admin/books',
    },
    {
      id: 3,
      title: 'Kategoriler',
      path: '/admin/categories',
    },
    {
      id: 4,
      title: 'Kullanıcılar',
      path: '/admin/users',
    },
    {
      id: 5,
      title: 'Bloglar',
      path: '/admin/blogs',
    },
    {
      id: 6,
      title: 'Site Ayarları',
      path: '/admin/settings',
    },
  ];
}
