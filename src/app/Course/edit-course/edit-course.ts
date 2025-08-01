import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '../../shared/models/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  mode: string = 'New';
  courseId: number = 0;
  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiCourseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      id: [0],
      name: [''],
      credits: [0],
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.courseId = +idParam;
        this.mode = 'Edit';
        this.loadCourse();
      }
    });
  }

  loadCourse() {
    this.apiCourseService
      .getCourseById(this.courseId)
      .subscribe((course: Course) => {
        this.courseForm.patchValue(course);
      });
  }

  Save() {
    const course: Course = this.courseForm.value;

    if (course.id === 0) {
      this.apiCourseService.addCourse(course).subscribe((c) => {
        alert(`Course ${c.name} added successfully!`);
      });
    } else {
      this.apiCourseService.updateCourse(course.id, course).subscribe((msg) => {
        alert(msg);
      });
    }
  }
}
