import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CategoryFeatureModule } from '../category-feature/category-feature.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesComponent,
      },
    ]),
    SharedModule,
    ConfirmDialogModule,
    HttpClientModule,
    ToastModule,
    SidebarModule,
    CategoryFeatureModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class CategoriesModule {}
