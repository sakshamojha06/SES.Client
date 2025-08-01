import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { PartialCourse } from '../models/partial-course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:5160/api/courses';
  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getPartialCourses(): Observable<PartialCourse[]> {
    return this.http.get<PartialCourse[]>(`${this.apiUrl}/partial`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, course, {
      responseType: 'text',
    });
  }

  deleteCourse(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
