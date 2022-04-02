import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForumComponent } from './components/forum/forum.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ThreadBottomNavigationComponent } from './components/thread-bottom-navigation/thread-bottom-navigation.component';
import { QuoteCommentComponent } from './components/quote-comment/quote-comment.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ForumComponent,
    CommentsComponent,
    LoginComponent,
    RegisterComponent,
    EditCommentComponent,
    CommentCardComponent,
    AddCommentComponent,
    ThreadBottomNavigationComponent,
    QuoteCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
