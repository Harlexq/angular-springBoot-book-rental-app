import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { BooksComponent } from '../books/books.component';
import { HttpClientService } from 'src/app/services/http-client.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-feature',
  templateUrl: './book-feature.component.html',
  styleUrls: ['./book-feature.component.scss'],
})
export class BookFeatureComponent {
  @Input() selectedBookId: number | null;
  form!: FormGroup;
  categories: Category[] = [];
  image: string = '';
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private booksComponent: BooksComponent,
    private http: HttpClientService
  ) {}

  ngOnChanges() {
    this.addBookForm();
    this.getCategories();
    if (this.selectedBookId !== null && this.selectedBookId !== undefined) {
      this.getDetailBook();
    }
  }

  getCategories() {
    this.http.get<Category[]>('categoryReadAll', (res) => {
      this.categories = res;
    });
  }

  getDetailBook() {
    if (this.selectedBookId !== undefined) {
      this.http.getById<Books>(`bookRead`, this.selectedBookId, (res) => {
        this.image = res.image;
        this.form.patchValue({
          title: res.title,
          description: res.description,
          publisher: res.publisher,
          author: res.author,
          price: res.price,
          categoryId: res.categoryId,
          publishDate: formatDate(res.publishDate, 'yyyy-MM-dd', 'en-US'),
          pageNumber: res.pageNumber,
        });
      });
    }
  }

  addBookForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      publisher: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      publishDate: ['', Validators.required],
      pageNumber: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0] as File;
  }

  addBook(id?: number) {
    if (id !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Kitabı Güncellemek İstediğinize Emin Misiniz?',
        header: 'Kitap Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Kitap Güncelleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('title', this.form.get('title').value);
          formData.append('description', this.form.get('description').value);
          formData.append('image', this.selectedFile);
          formData.append('publisher', this.form.get('publisher').value);
          formData.append('author', this.form.get('author').value);
          formData.append('categoryId', this.form.get('categoryId').value);
          formData.append('price', this.form.get('price').value);
          formData.append(
            'publishDate',
            formatDate(
              this.form.get('publishDate').value,
              'yyyy-MM-dd',
              'en-US'
            )
          );
          formData.append('pageNumber', this.form.get('pageNumber').value);

          this.http.put<any>(`bookUpdate`, id, formData, (res) => {
            this.router.navigateByUrl('/admin/books');
            this.booksComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Kitap Eklemek İstediğinize Emin Misiniz?',
        header: 'Kitap Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Kitap Ekleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('title', this.form.get('title').value);
          formData.append('description', this.form.get('description').value);
          formData.append('image', this.selectedFile);
          formData.append('publisher', this.form.get('publisher').value);
          formData.append('author', this.form.get('author').value);
          formData.append('categoryId', this.form.get('categoryId').value);
          formData.append('price', this.form.get('price').value);
          formData.append(
            'publishDate',
            formatDate(
              this.form.get('publishDate').value,
              'yyyy-MM-dd',
              'en-US'
            )
          );
          formData.append('pageNumber', this.form.get('pageNumber').value);

          this.http.post<any>(`bookCreate`, formData, (res) => {
            this.router.navigateByUrl('/admin/books');
            this.booksComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }
}
