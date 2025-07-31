import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Students } from './Student/students/students';
import { Courses } from './Course/courses/courses';
import { Enrollments } from './Enrollment/enrollments/enrollments';
import { EditStudent } from './Student/edit-student/edit-student';
import { EditCourse } from './Course/edit-course/edit-course';
import { EditEnrollment } from './Enrollment/edit-enrollment/edit-enrollment';

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
        path: 'editEnrollment/:id',
        component: EditEnrollment
    },
    {
        path: 'addEnrollment',
        component: EditEnrollment
    },
    {
        path: '**',
        component: Home
    }
];
