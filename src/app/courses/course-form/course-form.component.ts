import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = ['Back-end', 'Front-end'];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get lessonsFormArray() {
    return <UntypedFormArray>this.form.get('lessons');
  }

  get isFormArrayRequired() {
    return (
      !this.lessonsFormArray.valid &&
      this.lessonsFormArray.hasError('required') &&
      this.lessonsFormArray.touched
    );
  }

  isLessonFieldInvalid(index: number, field: string) {
    return this.lessonsFormArray.at(index).get(field)?.invalid;
  }

  ngOnInit(): void {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    this.initializeForm(course);
    this.updateForm(course);

    console.log(this.form);
  }

  initializeForm(course: Course) {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      category: ['', [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), [
        Validators.required,
      ]),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons?.length > 1) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
      lessons.pop();
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  getLessonsControls() {
    return this.lessonsFormArray?.controls;
  }

  addNewLesson() {
    this.lessonsFormArray?.push(this.createLesson());
    console.log(this.lessonsFormArray);
  }

  deleteLesson(controlIndex: number) {
    this.lessonsFormArray?.removeAt(controlIndex);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

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
      lessons: course.lessons,
    });
  }

  getErrorMessage(form: AbstractControl, fieldName: string) {
    const field = form.get(fieldName) as FormControl;

    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 3;
      return `O campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
