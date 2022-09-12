import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForumComponent } from './components/forum/forum.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ThreadBottomNavigationComponent } from './components/thread-bottom-navigation/thread-bottom-navigation.component';
import { QuoteCommentComponent } from './components/quote-comment/quote-comment.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { ThreadsComponent } from './components/threads/threads.component';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { ThreadComponent } from './components/thread/thread.component';
import { CreateThreadComponent } from './components/create-thread/create-thread.component';
import { UsersOnlineComponent } from './components/users-online/users-online.component';
import { SideViewComponent } from './components/side-view/side-view.component';

const port = ( window.location.hostname === 'localhost' ) ? ':8080' : '';
const url = `${window.location.protocol}//${window.location.hostname}${port}`;
const config: SocketIoConfig = { url: url, options: {}}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ForumComponent,
    LoginComponent,
    RegisterComponent,
    EditCommentComponent,
    CommentCardComponent,
    AddCommentComponent,
    ThreadBottomNavigationComponent,
    QuoteCommentComponent,
    ProfileComponent,
    ThreadsComponent,
    ThreadCardComponent,
    ThreadComponent,
    CreateThreadComponent,
    UsersOnlineComponent,
    SideViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
