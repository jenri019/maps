import { Component } from '@angular/core';
import { MapViewComponent } from "../../components/map-view/map-view.component";

@Component({
    selector: 'app-fullscreen-map-page',
    imports: [
    //MarkerComponent,
    MapViewComponent
],
    templateUrl: './fullscreen-map-page.component.html',
})
export class FullscreenMapPageComponent {
}
