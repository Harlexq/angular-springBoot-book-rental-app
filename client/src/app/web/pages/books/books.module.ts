import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FilterSidenavModule } from '../filter-sidenav/filter-sidenav.module';

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
    PaginatorModule,
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
    FilterSidenavModule,
  ],
})
export class BooksModule {}
