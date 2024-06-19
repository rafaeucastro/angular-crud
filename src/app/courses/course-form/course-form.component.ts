import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NonNullableFormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    id: [0],
    name: [''],
    category: [''],
  });
  categories: string[] = ['back-end', 'front-end'];
  readonly snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private snackBar: MatSnackBar
  ) {
    const course = this.activatedRoute.snapshot.data['course'] as Course;
    this.form.setValue({id:course.id, name: course.name, category: course.category});
  }

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(console.log, this.onError);
  }

  onCancel() {
    this.router.navigate(['courses']);
  }

  onError() {
    console.log("Erro ao salvar curso!");
    
    console.log(this.snackBar);
  }
}
