import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BookDetailModule } from './book-detail/book-detail.module';
import { BooksModule } from './books/books.module';
import { FilterSidenavModule } from './filter-sidenav/filter-sidenav.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { ProfileModule } from './profile/profile.module';
import { RentalBooksModule } from './rental-books/rental-books.module';
import { BlogsModule } from './blogs/blogs.module';
import { BlogDetailModule } from './blog-detail/blog-detail.module';

registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookDetailModule,
    BooksModule,
    FilterSidenavModule,
    HomeModule,
    LoginModule,
    ProfileModule,
    SignupModule,
    RentalBooksModule,
    BlogsModule,
    BlogDetailModule,
  ],
})
export class PagesModule {}
