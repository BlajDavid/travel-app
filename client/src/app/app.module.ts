import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './pages/map/map.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MapService } from './core/map-service';
import { LocationMarkerPopupFactory } from './core/marker-popup/location-marker-popup-factory';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LeafletModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent}
    ])
  ],
  providers: [
    MapService,
    LocationMarkerPopupFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
