import { Component, inject, signal } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'lessons'];
  courses$: Observable<Course[]>;
  readonly dialog = inject(MatDialog);

  constructor(private courseService: CoursesService) {
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

  detailCourse(){
    
  }
}
