import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { RentBooksComponent } from './rent-books/rent-books.component';
import { UserCountComponent } from './user-count/user-count.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DashboardComponent, RentBooksComponent, UserCountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    ChartModule,
    PaginatorModule,
    TableModule,
  ],
})
export class DashboardModule {}
