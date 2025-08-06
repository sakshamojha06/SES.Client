export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
  dob: Date = new Date();
  gpa: number = 0;
}

export class StudentDto {
  id!: number;
  name!: string;
  email!: string;
  dob!: string;
  gpa!: number;
}
