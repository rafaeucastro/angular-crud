import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from './services/courses.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent, CoursesListComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [CoursesService],
})
export class CoursesModule {}
