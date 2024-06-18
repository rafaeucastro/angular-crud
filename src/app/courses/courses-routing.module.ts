import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'edit/:id', component: CourseFormComponent },
  { path: 'new', component: CourseFormComponent },
  { path: '', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
