import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const courseService = inject(CoursesService);

  if (route.params && route.paramMap.get('id')) {
    return courseService.loadById(route.params['id']);
  }
  return of<Course>({ id: 0, name: '', category: '', lessons: [] });
};
