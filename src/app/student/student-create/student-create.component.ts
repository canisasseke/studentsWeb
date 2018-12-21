import { Student } from 'src/app/_shared/_models/student';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../_shared/_services/error-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RepositoryService } from 'src/app/_shared/_services/repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit, OnDestroy {

  public errorMessage = '';

  public ownerForm: FormGroup;

  StudentSubscription: Subscription;
  constructor(
    private repository: RepositoryService,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.ownerForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnDestroy(): void {
    this.StudentSubscription.unsubscribe();
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

  public createOwner(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation(ownerFormValue) {

    const student = new Student(
       ownerFormValue['lastName'],
       ownerFormValue['firstName'],
      ownerFormValue['email'],
      ownerFormValue['dateOfBirth']
    );
    const apiUrl = 'students';
    this.StudentSubscription = this.repository.create(apiUrl, student)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
        $('#errorModal').modal();
      })
    );
  }

 public redirectToOwnerList() {
    this.router.navigate(['/students/list']);
  }

}


