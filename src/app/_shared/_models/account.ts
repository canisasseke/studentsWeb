import { Student } from 'src/app/_shared/_models/student';

export class Account {
  private _id: number;
  private _dateCreated: Date;
  private _accountType: string;
  private _student: Student;

constructor(
    accountType: string,
    dateCreated: Date,
    student: Student,
    id?: number
  ) {
    this._accountType = accountType;
    this._dateCreated = dateCreated;
    this._student = student;
    this._id = id;
    }
public get id(): number {
  return this._id;
}
public set id(value: number) {
  this._id = value;
}
public get dateCreated(): Date {
  return this._dateCreated;
}
public set dateCreated(value: Date) {
  this._dateCreated = value;
}

public get accountType(): string {
  return this._accountType;
}
public set accountType(value: string) {
  this._accountType = value;
}

public get student(): Student {
  return this._student;
}
public set student(value: Student) {
  this._student = value;
}

}
