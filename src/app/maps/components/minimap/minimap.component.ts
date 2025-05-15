import { Component, input } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike } from 'maplibre-gl';

@Component({
    selector: 'app-minimap',
    imports: [
        MapComponent,
        MarkerComponent
    ],
    templateUrl: './minimap.component.html',
    styles: [`
        .minimap  {
            width: 100%;
            height: 260px;
        }
    `]
})
export class MinimapComponent {
    coordinates = input.required<LngLatLike>();
}
