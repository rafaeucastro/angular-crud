import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';
import { NgModule } from '@angular/core';
import { courseResolver } from './guards/course.resolver';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
  {
    path: 'new',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
  { path: '', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
