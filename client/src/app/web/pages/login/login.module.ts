import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [WebLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebLoginComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class LoginModule {}
