import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageCourse } from '../model/page_course';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$?: Observable<PageCourse>;
  readonly dialog = inject(MatDialog);
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loadCourses();
  }

  loadCourses(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }
  ) {
    this.courses$ = this.courseService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError((error) => {
          this.openDialog('Erro ao carregar cursos!');
          return of({ courses: [], totalElements: 0, totalPages: 0 });
        })
      );
  }

  openDialog(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
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

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe({
      next: (shouldDeleteCourse: boolean) => {
        if (shouldDeleteCourse) {
          this.courseService.remove(course.id).subscribe({
            next: () => {
              this.openSnackbar('Curso removido com sucesso!');
              this.loadCourses();
            },
            error: () => {
              this.openSnackbar('Erro ao remover curso');
            },
          });
        }
      },
    });
  }
}
