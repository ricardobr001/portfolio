import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ListeningComponent } from './listening/listening.component';
import { CvComponent } from './cv/cv.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'listening', component: ListeningComponent },
    { path: 'cv', component: CvComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
