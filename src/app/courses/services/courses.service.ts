import { first, map } from 'rxjs';

import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  API = 'http://localhost:8080/api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Page<Course>>(this.API).pipe(
      first(),
      // delay(2000),
      map((res) => res.courses)
    );
  }

  loadById(couseId: string) {
    return this.httpClient.get<Course>(`${this.API}/${couseId}`);
  }

  save(record: Partial<Course>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record);
  }

  update(record: Partial<Course>) {
    return this.httpClient.put<Course>(this.API, record);
  }

  remove(couseId: string) {
    return this.httpClient.delete<Course>(`${this.API}/${couseId}`);
  }
}
