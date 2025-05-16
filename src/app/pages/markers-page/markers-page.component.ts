import { Component, signal } from '@angular/core';
import { MapViewComponent } from "../../maps/components/map-view/map-view.component";

@Component({
    selector: 'app-markers-page',
    imports: [
    MapViewComponent
],
    templateUrl: './markers-page.component.html',
})
export default class MarkersPageComponent {
    zoom = signal(1);
}
