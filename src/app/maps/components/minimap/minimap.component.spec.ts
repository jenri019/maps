import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinimapComponent } from './minimap.component';

@Component({
    template: `<app-minimap [coordinates]="coords"></app-minimap>`,
    standalone: true,
    imports: [MinimapComponent]
})
class HostComponent {
    coords = [0, 0];
}

describe('MinimapComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: MinimapComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.children[0].componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
