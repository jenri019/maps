import { DecimalPipe } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
    selector: 'app-fullscreen-map-page',
    imports: [
        MapComponent,
        //MarkerComponent,
        DecimalPipe
    ],
    templateUrl: './fullscreen-map-page.component.html',
})
export class FullscreenMapPageComponent {
    zoom = signal(1);

    @ViewChild('mapLibre', { static: false }) mapComponent?: any;

    onZoomInput(value: number) {
        this.zoom.set(+value);
        if (this.mapComponent && this.mapComponent.mapInstance) {
            this.mapComponent.mapInstance.setZoom(+value);
        }
    }

    centerMap() {
        const coords = [-65.017, -16.457]; // Cambia por las coordenadas que desees
        if (this.mapComponent && this.mapComponent.mapInstance) {
            this.mapComponent.mapInstance.setCenter(coords);
        }
    }

    onMapMove(event: any) {
        const zoom = event.target?.getZoom?.();
        if (zoom !== undefined) {
            this.zoom.set(zoom);
        }
    }

    alert(message: string) {
        alert(message);
    }
}
