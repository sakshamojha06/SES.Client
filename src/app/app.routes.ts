import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Students } from './Student/students/students';
import { Courses } from './Course/courses/courses';
import { Enrollments } from './Enrollment/enrollments/enrollments';
import { EditStudent } from './Student/edit-student/edit-student';
import { EditCourse } from './Course/edit-course/edit-course';

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
    },
    {
        path: 'addCourse',
        component: EditCourse
    },
    {
        path: 'editCourse/:id',
        component: EditCourse
    },
    {
        path: '**',
        component: Home
    }
];
