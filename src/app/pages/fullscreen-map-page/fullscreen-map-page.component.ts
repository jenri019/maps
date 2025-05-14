import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
    selector: 'app-fullscreen-map-page',
    imports: [MapComponent],
    templateUrl: './fullscreen-map-page.component.html',
})
export class FullscreenMapPageComponent { }
