import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCourseService, Course } from '../../Services/api.course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse {
  mode: string = 'New';
  courseId: number = 0;
  course: Course = {
    id: 0,
    name: '',
    credits: 0,
  };
  service: any;

  constructor(
    private apiCourseService: ApiCourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    this.apiCourseService.getCourseById(this.courseId).subscribe((course) => {
      this.course = course;
    });
  }

  Save() {
    if (this.course.id === 0) {
      this.apiCourseService.addCourse(this.course).subscribe((c) => {
        alert(`Course ${c.name} added successfully!`);
      });
    } else {
      this.apiCourseService.updateCourse(this.course.id, this.course).subscribe((msg) => {
          alert(msg);
        });
    }
  }
}
