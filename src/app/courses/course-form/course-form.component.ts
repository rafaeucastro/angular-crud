import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.max(100)],
    ],
    category: ['', [Validators.required]],
  });
  categories: string[] = ['Back-end', 'Front-end'];

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
    if(this.form.invalid) return;

    this.service
      .save(this.form.value)
      .subscribe({ next: this.onSaveSuccess, error: this.onSaveError });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  onSaveSuccess = () => {
    this.router.navigate(['courses']);
    this.openSnackBar('Curso salvo com sucesso!');
  };

  onSaveError = (error: HttpErrorResponse) => {
    this.openSnackBar('Não foi possível salvar o curso!');
  };

  onLoadError = () => {
    this.openSnackBar('Não foi possível carregar o curso!');
  };

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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);
    if(field?.hasError('required')){
      return "Campo Obrigatório";
    }

    if(field?.hasError('minlength')){
      const requiredLength = this.form.errors ? this.form.errors['minlength']['requiredlenght'] : 3;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }
    
    if(field?.hasError('maxlength')){
      const requiredLength = this.form.errors ? this.form.errors['maxlength']['requiredlenght'] : 3;
      return `O campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return "Campo inválido";
  }
}
