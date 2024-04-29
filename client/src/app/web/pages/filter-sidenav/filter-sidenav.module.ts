import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidenavComponent } from './filter-sidenav.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FilterSidenavComponent],
  imports: [
    CommonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ButtonModule,
  ],
  exports: [FilterSidenavComponent],
})
export class FilterSidenavModule {}
