import { CommonModule, DecimalPipe, JsonPipe } from '@angular/common';
import { Component, input, signal, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';
import { v4 as UUIDV4 } from 'uuid';

interface MapMarker {
    coordinates: LngLatLike;
    id: string;
    color: string;
}

@Component({
    selector: 'app-map-view',
    imports: [
        CommonModule,
        MapComponent,
        MarkerComponent,
        DecimalPipe,
        JsonPipe
    ],
    templateUrl: './map-view.component.html',
})
export class MapViewComponent {
    zoom = signal(1);
    mapType = input<'fullscreen' | 'markers'>('fullscreen');
    /* markersValue = input<any[]>([]); */
    markers = signal<MapMarker[]>([]);
    selectedMarker = signal<MapMarker>(null);

    @ViewChild('mapLibre', { static: false }) mapLibre?: MapComponent;

    /** Funciones generales */
    /** Zoom en el mapa usando el input range */
    onZoomInput(value: number) {
        this.zoom.set(value);
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.setZoom(value);
        }
    }

    /** Hacer zoom con raton */
    onMapMove(event: any) {
        const zoom = event.target?.getZoom?.();
        if (zoom !== undefined) {
            this.zoom.set(zoom);
        }
    }

    /**Funciones solo disponibles para la ruta markers */
    addMarker(event: MapLayerMouseEvent) {
        if (this.mapType() !== 'markers') return;
        const marker: MapMarker = {
            coordinates: [event.lngLat.lng, event.lngLat.lat],
            id: UUIDV4(),
            color: this.getRandomHexColor(),
        }
        this.markers.update(current => [...current, marker]);
    }

    /**Mover el mapa basado en coordenadas */
    viewMarker(marker: MapMarker) {
        if (this.mapType() !== 'markers') return;
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.easeTo({ center: marker.coordinates, duration: 600 }); // animación suave
            this.selectedMarker.set(marker);
        }
    }

    /** Remover marcador al dar clic sobre el */
    deleteMarker(id: string) {
        if (this.mapType() !== 'markers') return;
        this.markers.update(current => current.filter(m => m.id !== id));
    }

    getRandomHexColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
}
