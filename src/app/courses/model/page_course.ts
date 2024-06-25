import { Course } from "./course";

export interface PageCourse {
    courses: Course[];
    totalElements: number;
    totalPages: number;
}