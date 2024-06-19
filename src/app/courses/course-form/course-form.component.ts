import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NonNullableFormBuilder } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    id: [''],
    name: [''],
    category: [''],
  });
  categories: string[] = ['back-end', 'front-end'];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.pipe(first()).subscribe({
      next: (data) => this.updateForm(data['course']),
      error: this.onLoadError,
    });
  }

  onSubmit() {
    this.service
      .save(this.form.value)
      .subscribe({ next: this.onSaveSuccess, error: this.onSaveError});
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Fechar", { duration: 3000 });
  }

  onSaveSuccess = () =>{
    this.router.navigate(['courses']);
    this.openSnackBar("Curso salvo com sucesso!");
  }

  onSaveError = (error: HttpErrorResponse) => {
    this.openSnackBar("Não foi possível salvar o curso!");
  }

  onLoadError = () => {
    this.openSnackBar("Não foi possível carregar o curso!");
  }

  onCancel() {
    this.router.navigate(['courses']);
  }

  updateForm(course: Course) {
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    });
  }
}
