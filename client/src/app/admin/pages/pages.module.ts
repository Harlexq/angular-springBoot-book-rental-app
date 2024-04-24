import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BlogsModule } from './blogs/blogs.module';
import { SettingsModule } from './settings/settings.module';

registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    LoginModule,
    SignupModule,
    UsersModule,
    CategoriesModule,
    BooksModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BlogsModule,
    SettingsModule,
  ],
})
export class PagesModule {}
