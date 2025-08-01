import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit, OnDestroy {
  students: Student[] = [];

  private apiService = inject(StudentService);
  private router = inject(Router);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.GetStudents();
  }

  public GetStudents(): void {
    this.subscription.add(
      this.apiService.getStudents().subscribe((ps) => {
        this.students = ps;
      })
    );
  }

  public EditStudent(id: number): void {
    this.router.navigate(['edit', id]);
  }

  public DeleteStudent(id: number): void {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    this.subscription.add(
      this.apiService.deleteStudent(id).subscribe((msg) => {
        alert(msg);
        this.GetStudents();
      })
    );
  }

  public AddStudent(): void {
    this.router.navigate(['add']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
