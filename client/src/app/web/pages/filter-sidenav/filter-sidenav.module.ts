import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidenavComponent } from './filter-sidenav.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FilterSidenavComponent],
  imports: [
    CommonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [FilterSidenavComponent],
})
export class FilterSidenavModule {}
