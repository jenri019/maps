import { Component } from '@angular/core';
import { MapViewComponent } from "../../maps/components/map-view/map-view.component";

@Component({
    selector: 'app-fullscreen-map-page',
    imports: [
    //MarkerComponent,
    MapViewComponent
],
    templateUrl: './fullscreen-map-page.component.html',
})
export default class FullscreenMapPageComponent {
}
