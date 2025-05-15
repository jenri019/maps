import { LngLatLike } from "maplibre-gl";

export interface HouseProperty {
    id: string;
    name: string;
    description: string;
    price: number;
    coordinates: LngLatLike;
    tags: string[];
}
