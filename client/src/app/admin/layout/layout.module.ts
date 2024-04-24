import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLayoutComponent } from './layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AdminLayoutComponent],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class LayoutModule {}
