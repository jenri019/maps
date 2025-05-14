import { DecimalPipe } from '@angular/common';
import { Component, input, signal, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
    selector: 'app-map-view',
    imports: [
        MapComponent,
        MarkerComponent,
        DecimalPipe
    ],
    templateUrl: './map-view.component.html',
})
export class MapViewComponent {
    zoom = signal(1);
    mapType = input<'fullscreen' | 'markers'>('fullscreen');
    markersValue = input<any[]>([]);

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

    moveMap(coords: number[]) {
        if (this.mapComponent && this.mapComponent.mapInstance) {
            this.mapComponent.mapInstance.setCenter(coords);
        }
    }
}
