import { ComponentFixture, TestBed } from '@angular/core/testing';
import HousesPageComponent from './houses-page.component';

describe('HousesPageComponent', () => {
    let fixture: ComponentFixture<HousesPageComponent>;
    let component: HousesPageComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HousesPageComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HousesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have initial houses defined', () => {
        const houses = component.houses();
        expect(Array.isArray(houses)).toBeTrue();
        expect(houses.length).toBeGreaterThan(0);
        expect(houses[0]).toEqual(jasmine.objectContaining({
            id: jasmine.any(String),
            name: jasmine.any(String),
            description: jasmine.any(String),
            price: jasmine.any(Number),
            coordinates: jasmine.any(Object),
            tags: jasmine.any(Array)
        }));
    });
});
