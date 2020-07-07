import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookviewComponent } from './bookview/bookview.component';
import { BookslistComponent } from './booklist/booklist.component';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { SystemAlertComponent } from './system-alert/system-alert.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { CommentsComponent } from './comments/comments.component';
import { ToggleComponent } from './toggle/toggle.component';
import { AddLessonPartComponent } from './add-lesson-part/add-lesson-part.component';
import { NumberValidatorDirective } from './validators/numberValidator.directive';
import { PointerReplacerDirective } from './directives/point-peplacer.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccessRigtsDirective } from './directives/access.directive';


@NgModule({
  declarations: [
    AppComponent,
    BookviewComponent,
    BookslistComponent,
    ChaptersListComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent,
    SystemAlertComponent,
    AddBookComponent,
    AddChapterComponent,
    CommentsComponent,
    ToggleComponent,
    AddLessonPartComponent,
    NumberValidatorDirective,
    PointerReplacerDirective,
    UserProfileComponent,
    AccessRigtsDirective    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    CKEditorModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
