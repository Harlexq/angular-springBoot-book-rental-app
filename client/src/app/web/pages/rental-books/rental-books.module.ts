import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalBooksComponent } from './rental-books.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [RentalBooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RentalBooksComponent,
      },
    ]),
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class RentalBooksModule {}
