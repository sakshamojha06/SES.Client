import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export class Course {
  id: number = 0;
  name: string = '';
  credits: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class ApiCourseService {
  private apiUrl = 'http://localhost:5160/api/courses';
  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
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
