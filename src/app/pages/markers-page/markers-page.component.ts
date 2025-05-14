import { Component, signal } from '@angular/core';
import { MapViewComponent } from "../../components/map-view/map-view.component";

@Component({
    selector: 'app-markers-page',
    imports: [
    MapViewComponent
],
    templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent {
    zoom = signal(1);
    /* markers = [
        {
            id: 1,
            coordinates: [-65.017, -16.457],
            title: 'Marker 1',
        },
        {
            id: 2,
            coordinates: [-165.017, 16.457],
            title: 'Marker 2',
        }
    ]; */
}
