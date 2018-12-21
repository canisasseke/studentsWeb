import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { SharedModule } from '../shared/shared.module';
import { StudentCreateComponent } from './student-create/student-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentUpdateComponent } from './student-update/student-update.component';


@NgModule({
  declarations: [StudentListComponent,
     StudentDetailsComponent,
      StudentCreateComponent,
      StudentUpdateComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
