import { Component } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  blogs: Blogs[] = [];
  pagedBlogs: Blogs[] = [];
  rows: number = 8;
  first: number = 0;
  rowSize: number[] = [8, 16, 24];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.http.get<Blogs[]>('blogReadAll', (res) => {
      this.blogs = res;
      this.paginateBlogs();
    });
  }

  paginateBlogs() {
    this.pagedBlogs = this.blogs.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateBlogs();
  }
}
