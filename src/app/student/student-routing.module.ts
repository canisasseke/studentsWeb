import { StudentUpdateComponent } from './student-update/student-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentCreateComponent } from './student-create/student-create.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  { path: ':id/accounts',
    component: StudentDetailsComponent
  },
  { path: 'create',
  component: StudentCreateComponent
  },
  {
    path: 'update/:id',
    component: StudentUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
