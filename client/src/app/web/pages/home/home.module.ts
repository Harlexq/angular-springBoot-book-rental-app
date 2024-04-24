import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CarouselComponent } from './carousel/carousel.component';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { TabComponent } from './tab/tab.component';
import { BannerBooksComponent } from './banner-books/banner-books.component';
import { PopulerBookComponent } from './populer-book/populer-book.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    TabComponent,
    BannerBooksComponent,
    PopulerBookComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    CardModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    GalleriaModule,
    TabViewModule,
  ],
})
export class HomeModule {}
