import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'fullscreen',
        loadComponent: () => import("./pages/fullscreen-map-page/fullscreen-map-page.component"),
        title: 'Fullscreen Map',
    },
    {
        path: 'markers',
        loadComponent: () => import("./pages/markers-page/markers-page.component"),
        title: 'Markers',
    },
    {
        path: 'houses',
        loadComponent: () => import("./pages/houses-page/houses-page.component"),
        title: 'Houses',
    },
    {
        path: 'schools',
        loadComponent: () => import("./pages/schools-page/schools-page.component"),
        title: 'Schools',
    },
    {
        path: '**',
        redirectTo: 'fullscreen',
    }
];
