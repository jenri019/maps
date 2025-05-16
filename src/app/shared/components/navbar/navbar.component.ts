import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
        title: `${route.title ?? 'Mapas en NG'}`,
    })).filter((route) => {
        return route.path !== '**'
    });

    pageTitle = toSignal(this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((event) => console.log(event)),
        map((event) => {
            return event.url
        }),
        map((url) => {
            return routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en NG'
        })
    ));
}
