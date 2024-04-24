import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class SignupModule {}
