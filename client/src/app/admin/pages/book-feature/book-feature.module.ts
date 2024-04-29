import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFeatureComponent } from './book-feature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

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
    ButtonModule,
    InputTextModule,
    CalendarModule,
    EditorModule,
    FileUploadModule,
  ],
  exports: [BookFeatureComponent],
})
export class BookFeatureModule {}
