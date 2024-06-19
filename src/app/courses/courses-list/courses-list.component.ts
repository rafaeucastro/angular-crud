import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  readonly displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'lessons',
    'actions',
  ];
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {}
}
