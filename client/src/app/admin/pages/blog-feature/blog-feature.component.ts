import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlogsComponent } from '../blogs/blogs.component';
import { Blogs } from 'src/app/models/Blogs';
import { HttpClientService } from 'src/app/services/http-client.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-blog-feature',
  templateUrl: './blog-feature.component.html',
  styleUrls: ['./blog-feature.component.scss'],
})
export class BlogFeatureComponent {
  @Input() selectedBlogId: number | null;
  form!: FormGroup;
  selectedFile: File | null = null;
  image: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private blogsComponent: BlogsComponent,
    private http: HttpClientService
  ) {}

  ngOnChanges() {
    this.addBlogForm();
    if (this.selectedBlogId !== null && this.selectedBlogId !== undefined) {
      this.getDetailBlog();
    }
  }

  getDetailBlog() {
    if (this.selectedBlogId !== undefined) {
      this.http.getById<Blogs>(`blogRead`, this.selectedBlogId, (res) => {
        this.image = res.image;
        this.form.patchValue({
          title: res.title,
          description: res.description,
          publishDate: formatDate(res.publishDate, 'yyyy-MM-dd', 'en-US'),
        });
      });
    }
  }

  addBlogForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      publishDate: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0] as File;
  }

  addBlog(id?: number) {
    if (id !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Bloğu Güncellemek İstediğinize Emin Misiniz?',
        header: 'Blog Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Blog Güncelleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('title', this.form.get('title').value);
          formData.append('description', this.form.get('description').value);
          formData.append(
            'publishDate',
            formatDate(
              this.form.get('publishDate').value,
              'yyyy-MM-dd',
              'en-US'
            )
          );

          this.http.put<any>(`blogUpdate`, id, formData, () => {
            this.router.navigateByUrl('/admin/blogs');
            this.blogsComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Blog Eklemek İstediğinize Emin Misiniz?',
        header: 'Blog Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Blog Ekleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('title', this.form.get('title').value);
          formData.append('description', this.form.get('description').value);
          formData.append(
            'publishDate',
            formatDate(
              this.form.get('publishDate').value,
              'yyyy-MM-dd',
              'en-US'
            )
          );

          this.http.post<any>(`blogCreate`, formData, (res) => {
            this.router.navigateByUrl('/admin/blogs');
            this.blogsComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }
}
