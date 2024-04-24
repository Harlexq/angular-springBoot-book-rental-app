import { Component } from '@angular/core';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.scss'],
})
export class UserCountComponent {
  users: WebUsers[] = [];
  bannedUserCount: number = 0;
  totalUserCount: number = 0;
  data: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<WebUsers[]>(`webUserReadAll`, (res) => {
      this.users = res;
      this.countUsers();
      this.chartUsers();
    });
  }

  countUsers() {
    this.totalUserCount = this.users.length;
    this.bannedUserCount = this.users.filter(
      (user) => user.banned === true
    ).length;
  }

  chartUsers() {
    this.data = {
      labels: ['Toplam Kullanıcılar', 'Banlı Kullanıcılar'],
      datasets: [
        {
          label: 'Kullanıcı Sayısı',
          data: [this.totalUserCount, this.bannedUserCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
          borderWidth: 1,
        },
      ],
    };
  }
}
