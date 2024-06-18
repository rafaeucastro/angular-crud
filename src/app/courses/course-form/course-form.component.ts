import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
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
    name: [''],
    category: [''],
  });
  categories: string[] = ['back-end', 'front-end'];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    // private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(console.log, this.onError);
  }

  onCancel() {}

  onError() {
    console.log("Erro ao salvar curso!");
    
    // this.snackBar.open('Erro ao salvar curso!');
  }
}
