import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookviewComponent } from './bookview/bookview.component';
import { BookslistComponent } from './booklist/booklist.component';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { AddLessonPartComponent } from './add-lesson-part/add-lesson-part.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'book/:bookId',
    component: ChaptersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book/:bookId/chapter/:chapterId',
    component: BookviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books',
    component: BookslistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-book',
    component: AddBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-book/:bookId',
    component: AddBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-chapter/:bookId',
    component: AddChapterComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-chapter/:bookId/:chapterId',
    component: AddChapterComponent, 
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-lesson/:bookId/:chapterId',
    component: AddLessonPartComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-lesson/:bookId/:chapterId/:lessonId',
    component: AddLessonPartComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'my-profile',
    component: UserProfileComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
