import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink
    ],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    router = inject(Router);
    routes = routes.map((route) => ({
        path: route.path,
        title: `${route.title ?? 'Mapas'}`,
    }));

    pageTitle$ = this.router.events.pipe(
        tap(event => {
            console.log(event);
        })
    )
}
