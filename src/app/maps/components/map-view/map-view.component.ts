import { CommonModule, DecimalPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, computed, input, signal, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';
import { v4 as UUIDV4 } from 'uuid';

interface MapMarker {
    coordinates: LngLatLike;
    id: string;
    color: string;
    name?: string;
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
export class MapViewComponent implements AfterViewInit {
    zoom = signal(1);
    mapType = input<'fullscreen' | 'markers' | 'schools'>('fullscreen');
    svgSize = input<number>(25);
    /* markersValue = input<any[]>([]); */
    markers = signal<MapMarker[]>([]);

    firstView = 0;
    schoolMarkers = input<MapMarker[]>();
    filterTerm = signal<string>(''); // Signal para el término de búsqueda
    // Computed para filtrar las escuelas por nombre
    filteredSchoolMarkers = computed(() =>
        (this.schoolMarkers() ?? []).filter(marker =>
            !this.filterTerm() ||
            marker.name?.toLowerCase().includes(this.filterTerm().toLowerCase())
        )
    );

    selectedMarker = signal<MapMarker>(null);

    @ViewChild('mapLibre', { static: false }) mapLibre?: MapComponent;

    ngAfterViewInit(): void {
        if (this.mapType() === 'schools') {
            this.zoom.set(10);
            const firstSchool = this.schoolMarkers()?.[this.firstView];
            if (firstSchool) {
                this.markers.set([firstSchool]);
                this.selectedMarker.set(firstSchool);
            }
        }
    }

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

    /** Remover marcador al dar clic sobre el */
    deleteMarker(id: string) {
        if (this.mapType() !== 'markers') return;
        this.markers.update(current => current.filter(m => m.id !== id));
    }

    /**Mover el mapa basado en coordenadas */
    viewMarker(marker: MapMarker) {
        if (this.mapType() === 'fullscreen') return;
        if (this.mapLibre && this.mapLibre.mapInstance) {
            this.mapLibre.mapInstance.easeTo({ center: marker.coordinates, duration: 600 }); // animación suave
            this.selectedMarker.set(marker);
        }
        if (this.mapType() === 'schools') {
            this.markers.set([marker]);
        }
    }

    getRandomHexColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
}
