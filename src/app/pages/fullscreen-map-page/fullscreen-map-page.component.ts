import { Component } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
    selector: 'app-fullscreen-map-page',
    imports: [MapComponent, MarkerComponent],
    templateUrl: './fullscreen-map-page.component.html',
})
export class FullscreenMapPageComponent {
    alert(message: string) {
        alert(message);
    }
}
