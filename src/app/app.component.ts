import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'portfolio';
    showHello = true;

    constructor (private router: Router) {
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd)
        ).subscribe(event => this.modifyContent(event));
    }

    modifyContent(location) {
        if (location.url === '/') {
            this.showHello = true;
        } else {
            this.showHello = false;
        }
    }
}
