import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  romans: Books[] = [];
  historys: Books[] = [];
  classics: Books[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getRomans();
    this.getHistorys();
    this.getClassic();
  }

  getRomans() {
    this.http.get<Books[]>(`bookReadAll?categoryId=1`, (res) => {
      this.romans = res.slice(0, 10);
    });
  }

  getHistorys() {
    this.http.get<Books[]>(`bookReadAll?categoryId=5`, (res) => {
      this.historys = res.slice(0, 10);
    });
  }

  getClassic() {
    this.http.get<Books[]>(`bookReadAll?categoryId=12`, (res) => {
      this.classics = res.slice(0, 10);
    });
  }
}
