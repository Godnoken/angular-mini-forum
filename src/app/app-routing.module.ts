import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SideViewComponent } from './components/side-view/side-view.component';
import { ThreadComponent } from './components/thread/thread.component';
import { ThreadsComponent } from './components/threads/threads.component';

const routes: Routes = [
  { path: "", redirectTo: 'forum', pathMatch: 'full' },
  { path: "forum", component: ForumComponent, children: [
    { path: "", component: ThreadsComponent },
    { path: "thread/:id/:page", component: ThreadComponent },
  ]},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "side-view", component: SideViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
