import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiStudentService, Student } from '../../Services/api.student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  imports: [FormsModule],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css'
})
export class EditStudent {
  mode: string = 'New';
  studentId: number = 0;
  student: Student = {
    id: 0, 
    name: '', 
    email: '',
    dob: new Date(),
    gpa: 0
  };

  constructor(
    private apiStudentService: ApiStudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if(idParam) {
        this.studentId = +idParam;
        this.mode = 'Edit';
        this.loadStudent();
      }
    });
  }

  loadStudent() {
    this.apiStudentService.getStudentById(this.studentId).subscribe(student => {
      this.student = student;
    })
  }

  Save() {
    if (this.student.id === 0) {
      this.apiStudentService.addStudent(this.student).subscribe(s => {
        alert(`Student ${s.name} added successfully!`);
      });
    } else {
      this.apiStudentService.updateStudent(this.student.id, this.student).subscribe(msg => {
        alert(msg);
        this.router.navigate(['/students']);
    });
  }
}
}
