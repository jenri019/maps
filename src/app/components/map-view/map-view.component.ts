import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, input, signal, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';

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
    isMapReady = signal(false);
    zoom = signal(1);
    mapType = input<'fullscreen' | 'markers'>('fullscreen');
    /* markersValue = input<any[]>([]); */
    markers = signal<any[]>([]);

    @ViewChild('mapLibre', { static: false }) mapLibre?: MapComponent;

    /** Zoom en el mapa usando el input range */
    onZoomInput(value: number) {
        this.zoom.set(+value);
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.setZoom(+value);
        }
    }

    /** Mover el mapa a 0,0 */
    centerMap() {
        const coords = [-65.017, -16.457] as LngLatLike; // Cambia por las coordenadas que desees
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.setCenter(coords);
        }
    }

    /** Hacer zoom con raton */
    onMapMove(event: any) {
        const zoom = event.target?.getZoom?.();
        if (zoom !== undefined) {
            this.zoom.set(zoom);
        }
    }

    onMapClick(event: MapLayerMouseEvent) {
        const coordinates: [number, number] = [event.lngLat.lng, event.lngLat.lat];
        this.markers.update(current => [...current, { coordinates }]);
    }

    /**Mover el mapa basado en coordenadas */
    moveMap(coords: number[]) {
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.setCenter(coords as LngLatLike);
        }
    }
}
