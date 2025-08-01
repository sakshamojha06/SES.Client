import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PartialStudent } from '../models/partial-student';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5160/api/students';
  private http = inject(HttpClient);

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getPartialStudents(): Observable<PartialStudent[]> {
    return this.http.get<PartialStudent[]>(`${this.apiUrl}/partial`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, student, {
      responseType: 'text',
    });
  }

  deleteStudent(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
