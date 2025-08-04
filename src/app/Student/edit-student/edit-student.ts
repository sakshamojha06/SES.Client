import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../shared/services/student.service';
import { Student } from '../../shared/models/student';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-student',
  imports: [FormsModule, MatDatepickerModule, MatHint],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css',
})
export class EditStudent {
  mode: string = 'New';
  studentId: number = 0;
  student: Student = {
    id: 0,
    name: '',
    email: '',
    dob: new Date(),
    gpa: 0,
  };

  constructor(
    private apiStudentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.studentId = +idParam;
        this.mode = 'Edit';
        this.loadStudent();
      }
    });
  }

  loadStudent() {
    this.apiStudentService
      .getStudentById(this.studentId)
      .subscribe((student) => {
        this.student = student;
      });
  }

  Save() {
    if (this.student.id === 0) {
      this.apiStudentService.addStudent(this.student).subscribe((s) => {
        alert(`Student ${s.name} added successfully!`);
      });
    } else {
      this.apiStudentService
        .updateStudent(this.student.id, this.student)
        .subscribe((msg) => {
          alert(msg);
          this.router.navigate(['/students']);
        });
    }
  }
}
