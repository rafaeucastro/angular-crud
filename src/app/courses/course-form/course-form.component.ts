import { Component, inject } from '@angular/core';

import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NonNullableFormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });
  categories: string[] = ['back-end', 'front-end'];
  readonly snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private router: Router,
    // private snackBar: MatSnackBar
  ) {}

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
