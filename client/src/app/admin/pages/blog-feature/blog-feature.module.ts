import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeatureComponent } from './blog-feature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
@NgModule({
  declarations: [BlogFeatureComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    InputTextModule,
    EditorModule,
  ],
  exports: [BlogFeatureComponent],
})
export class BlogFeatureModule {}
