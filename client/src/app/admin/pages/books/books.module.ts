import { NgModule } from '@angular/core';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { BookFeatureModule } from '../book-feature/book-feature.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksComponent,
      },
    ]),
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    SidebarModule,
    BookFeatureModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
  ],
})
export class BooksModule {}
