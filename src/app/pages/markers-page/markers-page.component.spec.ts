import { ComponentFixture, TestBed } from '@angular/core/testing';
import MarkersPageComponent from './markers-page.component';

describe('MarkersPageComponent', () => {
    let fixture: ComponentFixture<MarkersPageComponent>;
    let component: MarkersPageComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarkersPageComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MarkersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have initial zoom signal value', () => {
        expect(component.zoom()).toBe(1);
    });
});
