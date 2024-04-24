import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { WebNavItems } from 'src/app/models/WebNavItems';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedInUsername: string | null = null;
  categories: Category[] = [];
  mobileMenu: boolean = false;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
    this.getCategories();
  }

  menuShow() {
    this.mobileMenu = !this.mobileMenu;
  }

  menuClose() {
    this.mobileMenu = false;
  }

  getUsers() {
    this.http.get<WebUsers[]>('webUserReadAll', (res) => {
      const token = localStorage.getItem('webUserToken');
      if (token) {
        const loggedInUser = res.find((user) => user.token === token);
        if (loggedInUser) {
          this.loggedInUsername = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('webUserToken');
    window.location.reload();
  }

  getCategories() {
    this.http.get<Category[]>('categoryReadAll', (res) => {
      this.categories = res;
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
  ];
}
