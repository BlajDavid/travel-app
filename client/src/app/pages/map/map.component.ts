import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../core/map-service';
import { BehaviorSubject, Subject } from 'rxjs';
import * as env from '../../core/env';
import { MapOptions, Map, Marker, latLng, marker, divIcon, Util } from 'leaflet';
import {
  locationIconSettingsToGo,
  locationIconSettingsVisited,
  streetMap
} from '../../core/map-constants';
import * as _ from 'lodash';

import { HttpClient } from '@angular/common/http';
import { ROMANIA_PLACES_GEO_JSON_URL } from '../../core/env';
import { LocationMarkerPopupFactory } from '../../core/marker-popup/location-marker-popup-factory';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input()
  locations: [];
  options: MapOptions;
  layer;

  private map: Map;
  private unsubscribe = new Subject<void>();
  private zoomLevel: BehaviorSubject<number>;
  private markers = [];

  constructor(private mapService: MapService,
              private locationMarkerPopupFactory: LocationMarkerPopupFactory,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    const defaultZoom = env.zoomLevels.mapDefaultZoomLevel;
    this.options = {
      center: env.ROMANIA_COORDINATES,
      zoom: defaultZoom,
      minZoom: env.zoomLevels.mapMinZoomLevel,
      maxZoom: env.zoomLevels.mapMaxZoomLevel,
      scrollWheelZoom: true
    };
    this.zoomLevel = new BehaviorSubject<number>(defaultZoom);
    this.layer = streetMap(this.options.maxZoom);
    this.httpClient.get(ROMANIA_PLACES_GEO_JSON_URL).subscribe(response => this.handleCastleHillGeoJsonResponse());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onMapReady(map: Map): void {
    this.map = map;
    map.zoomControl.setPosition('topright');
    map.tap.disable();
  }

  onZoomChange(newZoomLevel: number): void {
    this.zoomLevel.next(newZoomLevel);
  }

  private createMarkerForLocation(location: any): Marker {
    this.getMarkerColor(location);
    const lat = location.geometry.coordinates[0];
    const long = location.geometry.coordinates[1];
    const x = marker(latLng(lat, long), {
      icon: divIcon({
        className: 'leaflet-data-marker',
        html: this.getMarkerColor(location),
        iconAnchor: [12, 22],
        iconSize: [56, 90],
        popupAnchor: [0, -28]
      })
    }).bindPopup(this.locationMarkerPopupFactory.create(location)).addTo(this.map);
    console.log(x);
    return x;
  }

  private getMarkerColor(location: any): string {
    if (location.type === 'Visited') {
      return Util.template(locationIconSettingsVisited.mapIconUrl, locationIconSettingsVisited);
    } else if ( location.type === 'ToGo') {
      return Util.template(locationIconSettingsToGo.mapIconUrl, locationIconSettingsToGo);
    }
  }

  private handleCastleHillGeoJsonResponse(): void {
    console.log(this.locations);
    this.markers = _.compact(this.locations)
      .map(location => this.createMarkerForLocation(location));
  }
}
