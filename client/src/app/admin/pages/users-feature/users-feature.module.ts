import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFeatureComponent } from './users-feature.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [UsersFeatureComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [UsersFeatureComponent]
})
export class UsersFeatureModule {}
