import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  rows: number = 10;
  first: number = 0;
  rowSize: number[] = [10, 20, 30];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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

  deleteBlog(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Bloğu Silmek İstediğinize Emin Misiniz?',
      header: 'Bloğu Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Blog Silme İşlemi Başarılı',
        });

        this.http.delete<Blogs>('blogDelete', id, (res) => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Blog Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  sidebarVisible: boolean = false;
  selectedBlogId: number | null = null;

  toggleSidebar(id?: number) {
    this.selectedBlogId = id || null;
    this.sidebarVisible = !this.sidebarVisible;
  }
}
