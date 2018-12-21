import { Subscription } from 'rxjs';
import { Student } from './../../_shared/_models/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../_shared/_services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from './../../_shared/_services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {

  public errorMessage = '';
  public ownerForm: FormGroup;
  public student: Student;
  studentSubscription: Subscription;

  constructor(
    private studentService: RepositoryService,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.getStudentById();
  }

  initForm() {

    this.ownerForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  getStudentById() {
    const id = this.activatedRoute.snapshot.params['id'];
    const apiUrl = `students/${id}`;
    this.studentSubscription = this.studentService.getData(apiUrl).subscribe(
      (student: Student) => {
        this.student = student;
        this.ownerForm.patchValue(this.student);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

  updateOwner(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate(ownerFormValue) {
    this.student.lastName = ownerFormValue.lastName;
    this.student.firstName = ownerFormValue.firstName;
    this.student.email = ownerFormValue.email;
    this.student.dateOfBirth = ownerFormValue.dateOfBirth;

    const apiUrl = `students/${this.student.id}`;
    this.studentSubscription = this.studentService.update(apiUrl, this.student).subscribe(
      () => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }
  public validateControl(controlName: string) {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.ownerForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  public executeDatePicker(event) {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }
  public redirectToOwnerList() {
    this.router.navigate(['/students/list']);
  }
}
