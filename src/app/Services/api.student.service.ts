import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
  dob: Date = new Date();
  gpa: number = 0.0;
}

export class PartialStudent {
  id?: number;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiStudentService {
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
      return this.http.put(`${this.apiUrl}/${id}`, student, {responseType: 'text'});
    }

    deleteStudent(id: number): Observable<string> {
      return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text'});
    }
}
