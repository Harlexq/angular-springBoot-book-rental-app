import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [WebSignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebSignupComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class SignupModule {}
