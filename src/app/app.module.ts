import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConstrucaoComponent } from './construcao/construcao.component';
import { HelloComponent } from './hello/hello.component';
import { ListeningComponent } from './listening/listening.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CvComponent } from './cv/cv.component';

@NgModule({
    declarations: [
        AppComponent,
        ConstrucaoComponent,
        HelloComponent,
        ListeningComponent,
        FooterComponent,
        AboutComponent,
        MenuComponent,
        CvComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
