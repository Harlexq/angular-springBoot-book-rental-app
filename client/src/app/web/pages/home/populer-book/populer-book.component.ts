import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-populer-book',
  templateUrl: './populer-book.component.html',
  styleUrls: ['./populer-book.component.scss'],
})
export class PopulerBookComponent {
  books: Books[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.http.get<Books[]>(`bookReadAll`, (res) => {
      this.books = res.slice(0, 1);
    });
  }
}
