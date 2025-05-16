import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewComponent } from './map-view.component';

@Component({
    template: `<app-map-view
    [mapType]="mapType"
    [schoolMarkers]="schoolMarkers"
    [svgSize]="svgSize"
  ></app-map-view>`,
    standalone: true,
    imports: [MapViewComponent]
})
class HostComponent {
    mapType: 'fullscreen' | 'markers' | 'schools' = 'fullscreen';
    schoolMarkers: any[] = [];
    svgSize = 25;
}

describe('MapViewComponent (fullscreen)', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should create (fullscreen)', () => {
        host.mapType = 'fullscreen';
        fixture.detectChanges();
        expect(component).toBeTruthy();
        // No debe modificar zoom ni markers en ngAfterViewInit
        component.ngAfterViewInit();
        expect(component.zoom()).toBe(1);
        expect(component.markers()).toEqual([]);
        expect(component.selectedMarker()).toBeNull();
    });
});

describe('MapViewComponent (markers)', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should create (markers)', () => {
        host.mapType = 'markers';
        fixture.detectChanges();
        expect(component).toBeTruthy();
        // No debe modificar zoom ni markers en ngAfterViewInit
        component.ngAfterViewInit();
        expect(component.zoom()).toBe(1);
        expect(component.markers()).toEqual([]);
        expect(component.selectedMarker()).toBeNull();
    });
});

describe('MapViewComponent (schools)', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should create (schools) and set zoom/markers if schoolMarkers present', () => {
        const school = {
            coordinates: [0, 0] as [number, number],
            id: '1',
            color: '#fff',
            name: 'Test School'
        };
        host.mapType = 'schools';
        host.schoolMarkers = [school];
        fixture.detectChanges();
        component.ngAfterViewInit();
        expect(component.zoom()).toBe(10);
        expect(component.markers()).toEqual([school as any]);
        expect(component.selectedMarker()).toEqual(school as any);
    });

    it('should create (schools) and not set markers if schoolMarkers empty', () => {
        host.mapType = 'schools';
        host.schoolMarkers = [];
        fixture.detectChanges();
        component.ngAfterViewInit();
        expect(component.zoom()).toBe(10);
        expect(component.markers()).toEqual([]);
        expect(component.selectedMarker()).toBeNull();
    });
});

describe('MapViewComponent filteredSchoolMarkers', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should return all schools if filterTerm is empty', () => {
        const schools = [
            { coordinates: [0, 0] as [number, number], id: '1', color: '#fff', name: 'Alpha' },
            { coordinates: [1, 1] as [number, number], id: '2', color: '#000', name: 'Beta' }
        ];
        host.schoolMarkers = schools;
        fixture.detectChanges();
        component.filterTerm.set('');
        expect(component.filteredSchoolMarkers()).toEqual(schools as any);
    });

    it('should filter schools by name (case insensitive)', () => {
        const schools = [
            { coordinates: [0, 0] as [number, number], id: '1', color: '#fff', name: 'Alpha' },
            { coordinates: [1, 1] as [number, number], id: '2', color: '#000', name: 'Beta' }
        ];
        host.schoolMarkers = schools;
        fixture.detectChanges();
        component.filterTerm.set('alp');
        expect(component.filteredSchoolMarkers().length).toBe(1);
        expect(component.filteredSchoolMarkers()[0].name).toBe('Alpha');
    });

    it('should not fail if some markers have no name', () => {
        const schools = [
            { coordinates: [0, 0] as [number, number], id: '1', color: '#fff' },
            { coordinates: [1, 1] as [number, number], id: '2', color: '#000', name: 'Beta' }
        ];
        host.schoolMarkers = schools;
        fixture.detectChanges();
        component.filterTerm.set('beta');
        expect(component.filteredSchoolMarkers().length).toBe(1);
        expect(component.filteredSchoolMarkers()[0].name).toBe('Beta');
    });
});

describe('MapViewComponent onZoomInput', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should set zoom signal and call setZoom on mapLibre.mapInstance if present', () => {
        const setZoomSpy = jasmine.createSpy('setZoom');
        // Simula la referencia y el método
        (component as any).mapLibre = {
            mapInstance: {
                setZoom: setZoomSpy
            }
        };
        component.onZoomInput(8);
        expect(component.zoom()).toBe(8);
        expect(setZoomSpy).toHaveBeenCalledWith(8);
    });

    it('should set zoom signal even if mapLibre is not present', () => {
        (component as any).mapLibre = undefined;
        component.onZoomInput(5);
        expect(component.zoom()).toBe(5);
        // No debe lanzar error aunque mapLibre no exista
    });
});

describe('MapViewComponent onMapMove', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should update zoom signal if event.target.getZoom returns a value', () => {
        const event = { target: { getZoom: () => 12 } };
        component.onMapMove(event);
        expect(component.zoom()).toBe(12);
    });

    it('should not update zoom if event.target.getZoom is undefined', () => {
        component.zoom.set(3);
        const event = { target: { getZoom: (): any => undefined } };
        component.onMapMove(event);
        expect(component.zoom()).toBe(3);
    });

    it('should not throw if event.target or getZoom is missing', () => {
        component.zoom.set(7);
        const event = {};
        expect(() => component.onMapMove(event)).not.toThrow();
        expect(component.zoom()).toBe(7);
    });
});

describe('MapViewComponent addMarker', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should add marker if mapType is markers', () => {
        host.mapType = 'markers';
        fixture.detectChanges();
        const event = { lngLat: { lng: 10, lat: 20 } };
        component.addMarker(event as any);
        expect(component.markers().length).toBe(1);
        expect(component.markers()[0].coordinates).toEqual([10, 20]);
        expect(component.markers()[0].id).toBeDefined();
        expect(component.markers()[0].color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should not add marker if mapType is not markers', () => {
        host.mapType = 'schools';
        fixture.detectChanges();
        const event = { lngLat: { lng: 10, lat: 20 } };
        component.addMarker(event as any);
        expect(component.markers().length).toBe(0);
    });
});
describe('MapViewComponent deleteMarker', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should delete marker by id if mapType is markers', () => {
        host.mapType = 'markers';
        fixture.detectChanges();
        const marker = { coordinates: [0, 0] as [number, number], id: 'abc', color: '#fff' };
        component.markers.set([marker as any]);
        component.deleteMarker('abc');
        expect(component.markers().length).toBe(0);
    });

    it('should not delete marker if mapType is not markers', () => {
        host.mapType = 'schools';
        fixture.detectChanges();
        const marker = { coordinates: [0, 0] as [number, number], id: 'abc', color: '#fff' };
        component.markers.set([marker as any]);
        component.deleteMarker('abc');
        expect(component.markers().length).toBe(1);
    });
});

describe('MapViewComponent viewMarker', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MapViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should do nothing if mapType is fullscreen', () => {
        host.mapType = 'fullscreen';
        fixture.detectChanges();
        const marker = { coordinates: [1, 2] as [number, number], id: 'x', color: '#fff' };
        // Espía para asegurarse que no se llama easeTo ni set
        (component as any).mapLibre = {
            mapInstance: { easeTo: jasmine.createSpy('easeTo') }
        };
        component.selectedMarker.set(null);
        component.markers.set([]);
        component.viewMarker(marker as any);
        expect(component.mapLibre.mapInstance.easeTo).not.toHaveBeenCalled();
        expect(component.selectedMarker()).toBeNull();
        expect(component.markers()).toEqual([]);
    });

    it('should call easeTo and set selectedMarker if mapType is markers', () => {
        host.mapType = 'markers';
        fixture.detectChanges();
        const marker = { coordinates: [1, 2] as [number, number], id: 'x', color: '#fff' };
        const easeToSpy = jasmine.createSpy('easeTo');
        (component as any).mapLibre = {
            mapInstance: { easeTo: easeToSpy }
        };
        component.selectedMarker.set(null);
        component.viewMarker(marker as any);
        expect(easeToSpy).toHaveBeenCalledWith({ center: marker.coordinates, duration: 600 });
        expect(component.selectedMarker()).toEqual(marker as any);
        // markers no debe cambiar
    });

    it('should call easeTo, set selectedMarker and update markers if mapType is schools', () => {
        host.mapType = 'schools';
        fixture.detectChanges();
        const marker = { coordinates: [1, 2] as [number, number], id: 'x', color: '#fff' };
        const easeToSpy = jasmine.createSpy('easeTo');
        (component as any).mapLibre = {
            mapInstance: { easeTo: easeToSpy }
        };
        component.selectedMarker.set(null);
        component.markers.set([]);
        component.viewMarker(marker as any);
        expect(easeToSpy).toHaveBeenCalledWith({ center: marker.coordinates, duration: 600 });
        expect(component.selectedMarker()).toEqual(marker as any);
        expect(component.markers()).toEqual([marker as any]);
    });
});
