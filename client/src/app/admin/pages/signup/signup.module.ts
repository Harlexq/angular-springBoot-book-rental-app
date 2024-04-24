import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminSignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminSignupComponent,
      },
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignupModule {}
