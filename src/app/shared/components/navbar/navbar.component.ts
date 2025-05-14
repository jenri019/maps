import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-navbar',
    imports: [
        AsyncPipe,
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

    // Getting page title as a obervable
    pageTitle$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
            return event.url
        }),
        map((url) => {
            return routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en NG'
        })
    )
    // Getting page title as a signal
    /* pageTitle = toSignal(this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((event) => console.log(event)),
        map((event) => {
            return event.url
        }),
        map((url) => {
            return routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en NG'
        })
    )); */
}
