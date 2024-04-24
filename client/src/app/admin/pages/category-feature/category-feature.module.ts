import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFeatureComponent } from './category-feature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryFeatureComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [CategoryFeatureComponent],
})
export class CategoryFeatureModule {}
