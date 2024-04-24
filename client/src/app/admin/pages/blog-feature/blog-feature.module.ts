import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeatureComponent } from './blog-feature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
  ],
  exports: [BlogFeatureComponent],
})
export class BlogFeatureModule {}
