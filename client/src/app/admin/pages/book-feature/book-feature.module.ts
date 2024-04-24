import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFeatureComponent } from './book-feature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [BookFeatureComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [BookFeatureComponent],
})
export class BookFeatureModule {}
