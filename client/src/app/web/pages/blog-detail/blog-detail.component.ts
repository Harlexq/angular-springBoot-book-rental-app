import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/models/Blogs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  blogId: string = '';
  blog: Blogs;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClientService
  ) {}

  ngOnInit() {
    this.getDetailBook();
  }

  getDetailBook() {
    this.blogId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getById<Blogs>('blogRead', Number(this.blogId), (res) => {
      this.blog = res;
    });
  }
}
