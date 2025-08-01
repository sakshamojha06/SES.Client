import { Component, inject } from '@angular/core';
import {
  ApiEnrollmentService,
  Enrollment,
} from '../../Services/api.enrollment.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ApiStudentService, PartialStudent } from '../../Services/api.student.service';

@Component({
  selector: 'app-enrollments',
  imports: [NgIf, NgFor],
  templateUrl: './enrollments.html',
  styleUrl: './enrollments.css',
})
export class Enrollments {
  enrollments: Enrollment[] = [];
  private partialStudents: PartialStudent[] = [];

  private apiService = inject(ApiEnrollmentService);
  private studentService = inject(ApiStudentService);
  private router = inject(Router);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.GetEnrollments();
    this.GetPartialStudents();
  }

  private GetEnrollments(): void {
    this.subscription.add(
      this.apiService.getEnrollments().subscribe((ps) => {
        this.enrollments = ps;
      })
    );
  }

  private GetPartialStudents(): void {
    this.subscription.add(
      this.studentService.getPartialStudents().subscribe((ps) => {
        this.partialStudents = ps;
      })
    );
  }

  GetStudentName(id: number): string | undefined {
      return this.partialStudents.find(s => s.id === id)?.name;
  }

  public EditEnrollment(id: number): void {
    this.router.navigate(['editEnrollment', id]);
  }

  public DeleteEnrollment(id: number): void {
    if (!confirm('Are you sure you want to delete this enrollment?')) {
      return;
    }

    this.subscription.add(
      this.apiService.deleteEnrollment(id).subscribe((msg) => {
        alert(msg);
        this.GetEnrollments();
      })
    );
  }

  public AddEnrollment(): void {
    this.router.navigate(['addEnrollment']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
