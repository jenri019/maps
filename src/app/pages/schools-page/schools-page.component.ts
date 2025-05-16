import { Component } from '@angular/core';
import { MapViewComponent } from "../../maps/components/map-view/map-view.component";
import hidalgoGeojson from '../../../assets/hidalgo.json';

@Component({
    selector: 'app-schools-page',
    imports: [MapViewComponent],
    templateUrl: './schools-page.component.html',
})
export default class SchoolsPageComponent {
    schools = hidalgoGeojson.features.map((feature: any) => ({
        id: feature.id,
        name: feature.properties?.name,
        coordinates: feature.geometry?.coordinates,
        color: '#FF0000',
    }));
}
