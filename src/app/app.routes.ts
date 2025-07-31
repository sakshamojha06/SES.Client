import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Students } from './Student/students/students';
import { Courses } from './Course/courses/courses';
import { Enrollments } from './Enrollment/enrollments/enrollments';
import { EditStudent } from './Student/edit-student/edit-student';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'students',
        component: Students
    },
    {
        path: 'courses',
        component: Courses
    },
    {
        path: 'enrollments',
        component: Enrollments
    },
    {
        path: 'add',
        component: EditStudent
    },
    {
        path: 'edit/:id',
        component: EditStudent
    }
];
