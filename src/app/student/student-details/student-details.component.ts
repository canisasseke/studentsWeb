import { ErrorHandlerService } from './../../_shared/_services/error-handler.service';
import { RepositoryService } from 'src/app/_shared/_services/repository.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/_shared/_models/student';
import { Account } from 'src/app/_shared/_models/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  student: Student;
  errorMessage = '';
  StudentSubscription: Subscription;
  constructor(private studentService: RepositoryService,
    private activatedRoute: ActivatedRoute, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    const studentid = this.activatedRoute.snapshot.params['id'];
    this.getStudentWithAccounts(studentid);
  }
  ngOnDestroy(): void {
    this.StudentSubscription.unsubscribe();
  }
  getStudentWithAccounts(studentid) {
    const apiUrl = `students/${studentid}`;
    this.StudentSubscription = this.studentService.getData(apiUrl).subscribe(
      (student: Student) => {
        this.student = student;
        this.getAllAccountsOfStudent(studentid);
      },
      (error) => {
        this.errorHandlerService.handleError(error);
        this.errorMessage = this.errorHandlerService.errorMessage;
      }
    );
  }
 private  getAllAccountsOfStudent(studentid) {
    const apiUrl = `students/${studentid}/accounts`;
    this.StudentSubscription = this.studentService.getData(apiUrl).subscribe(
      (accounts: Account[]) => {
        this.student.accounts = accounts;
      },
      (error) => {
        this.errorHandlerService.handleError(error);
        this.errorMessage = this.errorHandlerService.errorMessage;
      }
    );

  }
}
