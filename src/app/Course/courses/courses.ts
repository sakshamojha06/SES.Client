import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CourseService, Course } from '../../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [NgIf, NgFor],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit, OnDestroy {
  courses: Course[] = [];

  private apiService = inject(CourseService);
  private router = inject(Router);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.GetCourses();
  }

  public GetCourses(): void {
    this.subscription.add(
      this.apiService.getCourses().subscribe((ps) => {
        this.courses = ps;
      })
    );
  }

  public EditCourse(id: number): void {
    this.router.navigate(['editCourse', id]);
  }

  public DeleteCourse(id: number): void {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    this.subscription.add(
      this.apiService.deleteCourse(id).subscribe((msg) => {
        alert(msg);
        this.GetCourses();
      })
    );
  }

  public AddCourse(): void {
    this.router.navigate(['addCourse']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
