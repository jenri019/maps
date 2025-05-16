import { ComponentFixture, TestBed } from '@angular/core/testing';
import SchoolsPageComponent from './schools-page.component';
import hidalgoGeojson from '../../../assets/hidalgo.json';

describe('SchoolsPageComponent', () => {
    let fixture: ComponentFixture<SchoolsPageComponent>;
    let component: SchoolsPageComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SchoolsPageComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SchoolsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have schools array from hidalgoGeojson', () => {
        expect(Array.isArray(component.schools)).toBeTrue();
        expect(component.schools.length).toBe(hidalgoGeojson.features.length);
        if (component.schools.length > 0) {
            expect(component.schools[0]).toEqual(jasmine.objectContaining({
                id: jasmine.anything(),
                name: jasmine.anything(),
                coordinates: jasmine.anything(),
                color: '#FF0000'
            }));
        }
    });
});
