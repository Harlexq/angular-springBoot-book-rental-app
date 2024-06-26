import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

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
    PaginatorModule,
    ButtonModule,
    CardModule,
  ],
})
export class BlogsModule {}
