import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../_shared/_services/error-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/_shared/_models/student';
import { RepositoryService } from 'src/app/_shared/_services/repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Student[];
  StudentSubscription: Subscription;
  errorMessage = '';
  constructor(
    private studentService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getAllStudents();
  }
  ngOnDestroy(): void {
    this.StudentSubscription.unsubscribe();
  }
  getAllStudents() {
    const apiUrl = 'students';
    this.StudentSubscription = this.studentService.getData(apiUrl).subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      (error) => {
        this.errorService.handleError(error);
        this.errorMessage = this.errorService.errorMessage;
      }
    );
  }

  redirectToDetailsPage(student: Student) {
    const detailsUrl = `students/${student.id}/accounts`;
    this.router.navigate([detailsUrl]);
  }

public redirectToUpdatePage(student: Student) {
    const updateUrl = `/students/update/${student.id}`;
    this.router.navigate([updateUrl]);
}

  deleteStudent(student) {
    // $('#confirmModal').modal();
    const confirm = window.confirm('Êtes vous sûre de vouloir suprimer ce etudiant');
    if (confirm) {
    const apiUrl = `students/${student.id}`;
    this.StudentSubscription = this.studentService.delete(apiUrl).subscribe(
      () => {
        this.getAllStudents();
      },
      (error) => {
        this.errorService.handleError(error);
        this.errorMessage = this.errorService.errorMessage;
      }
    );
    }
  }
}
