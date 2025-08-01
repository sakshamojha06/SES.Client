import { Component } from '@angular/core';
import { Enrollment } from '../../shared/models/enrollment';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PartialStudent } from '../../shared/models/partial-student';
import { PartialCourse } from '../../shared/models/partial-course';
import { StudentService } from '../../shared/services/student.service';
import { CourseService } from '../../shared/services/course.service';

@Component({
  selector: 'app-edit-enrollment',
  imports: [FormsModule],
  templateUrl: './edit-enrollment.html',
  styleUrl: './edit-enrollment.css'
})
export class EditEnrollment {
  mode: string = 'New';
  enrollmentId: number = 0;
  partialStudents: PartialStudent[] = [];
  partialCourses: PartialCourse[] = [];
  enrollment: Enrollment = {
    id: 0,
    studentId: 0,
    courseId: 0,
    grade: 0
  };

  constructor(
    private apiEnrollmentService: EnrollmentService,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.GetPartialStudents();
    this.GetPartialCourses(); 

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.enrollmentId = +idParam;
        this.mode = 'Edit';
        this.loadEnrollment();
      }
    });
  }

  private GetPartialStudents(): void {
    this.studentService.getPartialStudents().subscribe((ps) => {
      this.partialStudents = ps;
    });
  }

  private GetPartialCourses(): void {
    this.courseService.getPartialCourses().subscribe((cs) => {
      this.partialCourses = cs;
    });
  }

  loadEnrollment() {
    this.apiEnrollmentService
      .getEnrollmentById(this.enrollmentId)
      .subscribe((enrollment) => {
        this.enrollment = enrollment;
      });
  }

  Save() {
    if (this.enrollment.id === 0) {
      this.apiEnrollmentService.addEnrollment(this.enrollment).subscribe((s) => {
        alert(`Student ${s.studentId} added successfully!`);
      });
    } else {
      this.apiEnrollmentService
        .updateEnrollment(this.enrollment.id, this.enrollment)
        .subscribe((msg) => {
          alert(msg);
          this.router.navigate(['/students']);
        });
    }
  }
}
