import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export class Enrollment {
  id: number = 0;
  studentId: number = 0;
  courseId: number = 0;
  grade: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:5160/api/enrollments';
  private http = inject(HttpClient);

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(id: number, student: Enrollment): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, student, {
      responseType: 'text',
    });
  }

  deleteEnrollment(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
