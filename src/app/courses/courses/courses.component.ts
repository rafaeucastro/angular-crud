import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'lessons', 'actions'];
  courses$: Observable<Course[]>;
  readonly dialog = inject(MatDialog);

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
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
    this.router.navigate(['edit', course.id], { relativeTo: this.activeRoute, state: course });
  }

  onDelete(course: Course) {}
}
