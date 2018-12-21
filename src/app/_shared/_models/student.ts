import { Account } from './account';
export class Student {
  private _id: number;
  private _lastName: string;
  private _firstName: string;
  private _email: string;
  private _dateOfBirth: Date;
  private _accounts: Account[];


   constructor(
    lastName: string,
    firstName: string,
    email: string,
    dateOfBirth: Date,
    id?: number,
    accounts?: Account[]
  ) {
    this._id = id;
    this._lastName = lastName;
    this._firstName = firstName;
    this._email = email;
    this._dateOfBirth = dateOfBirth;
    this._accounts = accounts;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
  }

  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }
  public set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  public get accounts(): Account[] {
    return this._accounts;
  }
  public set accounts(value: Account[]) {
    this._accounts = value;
  }
}
