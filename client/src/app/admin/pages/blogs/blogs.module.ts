import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { BlogFeatureModule } from '../blog-feature/blog-feature.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogsComponent,
      },
    ]),
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    SidebarModule,
    BlogFeatureModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
  ],
})
export class BlogsModule {}
