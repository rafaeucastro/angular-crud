import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$?: Observable<Course[]>;
  readonly dialog = inject(MatDialog);

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loadCourses();
  }

  loadCourses(){
    this.courses$ = this.courseService.list().pipe(
      catchError((error) => {
        this.openDialog('Erro ao carregar cursos!');
        return of([]);
      })
    );
  }

  openDialog(errorMsg: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], {
      relativeTo: this.activeRoute,
      state: course,
    });
  }

  openSnackbar(message: string){
    this.snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onRemove(course: Course) {
    this.courseService.remove(course.id).subscribe({
      next: () => {
        this.openSnackbar("Curso removido com sucesso!");
        this.loadCourses();
      },
      error: () => {
        this.openSnackbar("Erro ao remover curso");
      },
    });
  }
}
