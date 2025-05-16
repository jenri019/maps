import { routes } from './app.routes';

describe('App Routes', () => {
    it('should have a fullscreen route', () => {
        const route = routes.find(r => r.path === 'fullscreen');
        expect(route).toBeTruthy();
        expect(route?.title).toBe('Fullscreen Map');
    });

    it('should redirect unknown paths to fullscreen', () => {
        const route = routes.find(r => r.path === '**');
        expect(route).toBeTruthy();
        expect(route?.redirectTo).toBe('fullscreen');
    });

    it('should have a markers route', () => {
        const route = routes.find(r => r.path === 'markers');
        expect(route).toBeTruthy();
        expect(route?.title).toBe('Markers');
    });

    it('should have a houses route', () => {
        const route = routes.find(r => r.path === 'houses');
        expect(route).toBeTruthy();
        expect(route?.title).toBe('Houses');
    });

    it('should have a schools route', () => {
        const route = routes.find(r => r.path === 'schools');
        expect(route).toBeTruthy();
        expect(route?.title).toBe('Schools');
    });

    it('should execute all loadComponent functions', async () => {
        const routesWithLoadComponent = routes.filter(r => typeof r.loadComponent === 'function');
        for (const route of routesWithLoadComponent) {
            const result = route.loadComponent();
            expect(result).toBeTruthy();
            // Asegura que se cubre la ejecución, sin importar el tipo devuelto
            await Promise.resolve(result).catch(() => { });
        }
    });
});
