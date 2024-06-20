import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [ErrorDialogComponent, CategoryPipe,],
})
export class SharedModule { }
