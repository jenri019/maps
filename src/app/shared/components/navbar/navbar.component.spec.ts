import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let routerEvents$: Subject<any>;
    let mockRouter: any;

    // Usa las rutas reales de app.routes.ts
    const mockRoutes = [
        { path: 'fullscreen', title: 'Fullscreen Map' },
        { path: 'markers', title: 'Markers' },
        { path: 'houses', title: 'Houses' },
        { path: 'schools', title: 'Schools' },
        { path: '**', redirectTo: 'fullscreen' }
    ];
    beforeEach(async () => {
        routerEvents$ = new Subject();
        mockRouter = {
            events: routerEvents$.asObservable(),
            createUrlTree: () => ({}), // Mock necesario para RouterLink
            serializeUrl: () => ''     // Mock necesario para RouterLink
        };

        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: {} },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        // Patch the routes para el test
        (component as any).routes = mockRoutes
            .map((route: any) => ({
                path: route.path,
                title: `${route.title ?? 'Mapas en NG'}`,
            }))
            .filter((route: any) => route.path !== '**');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set pageTitle based on navigation event', () => {
        routerEvents$.next(new NavigationEnd(1, '/fullscreen', '/fullscreen'));
        fixture.detectChanges();
        expect(component.pageTitle()).toBe('Fullscreen Map');
        routerEvents$.next(new NavigationEnd(2, '/markers', '/markers'));
        fixture.detectChanges();
        expect(component.pageTitle()).toBe('Markers');
        routerEvents$.next(new NavigationEnd(3, '/houses', '/houses'));
        fixture.detectChanges();
        expect(component.pageTitle()).toBe('Houses');
        routerEvents$.next(new NavigationEnd(4, '/schools', '/schools'));
        fixture.detectChanges();
        expect(component.pageTitle()).toBe('Schools');
        routerEvents$.next(new NavigationEnd(5, '/notfound', '/notfound'));
        fixture.detectChanges();
        expect(component.pageTitle()).toBe('Mapas en NG');
    });
});
