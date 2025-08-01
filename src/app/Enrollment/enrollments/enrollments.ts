import { Component, inject } from '@angular/core';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { Enrollment } from '../../shared/models/enrollment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../shared/services/student.service';
import { PartialStudent } from '../../shared/models/partial-student';
import { CourseService } from '../../shared/services/course.service';
import { PartialCourse } from '../../shared/models/partial-course';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.html',
  styleUrl: './enrollments.css',
})
export class Enrollments {
  enrollments: Enrollment[] = [];
  private partialStudents: PartialStudent[] = [];
  private partialCourses: PartialCourse[] = [];

  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.GetEnrollments();
    this.GetPartialStudents();
    this.GetPartialCourses();
  }

  private GetEnrollments(): void {
    this.subscription.add(
      this.enrollmentService.getEnrollments().subscribe((ps) => {
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

  private GetPartialCourses(): void {
    this.subscription.add(
      this.courseService.getPartialCourses().subscribe((cs) => {
        this.partialCourses = cs;
      })
    );
  }

  GetStudentName(id: number): string | undefined {
    return this.partialStudents.find((s) => s.id === id)?.name;
  }

  GetCourseName(id: number): string | undefined {
    return this.partialCourses.find((c) => c.id === id)?.name;
  }

  public EditEnrollment(id: number): void {
    this.router.navigate(['editEnrollment', id]);
  }

  public DeleteEnrollment(id: number): void {
    if (!confirm('Are you sure you want to delete this enrollment?')) {
      return;
    }

    this.subscription.add(
      this.enrollmentService.deleteEnrollment(id).subscribe((msg) => {
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
