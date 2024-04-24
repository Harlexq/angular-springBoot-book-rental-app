import { Component } from '@angular/core';
import { AdminNavItems } from 'src/app/models/AdminNavItems';
import { AdminUsers } from 'src/app/models/AdminUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  users: AdminUsers[] = [];
  username: string = '';
  mobileMenu: boolean = false;

  constructor(private http: HttpClientService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  menuShow() {
    this.mobileMenu = !this.mobileMenu;
  }

  menuClose() {
    this.mobileMenu = false;
  }

  getUsers() {
    this.http.get<AdminUsers[]>('adminUserReadAll', (res) => {
      this.users = res;
      const token = localStorage.getItem('adminUserToken');
      if (token) {
        const user = res.find((u) => u.token === token);
        if (user) {
          this.username = `${user.firstName} ${user.lastName}`;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('adminUserToken');
    window.location.reload();
  }

  navItems: AdminNavItems[] = [
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
