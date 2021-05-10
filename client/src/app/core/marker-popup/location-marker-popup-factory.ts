import { Injectable } from '@angular/core';

@Injectable()
export class LocationMarkerPopupFactory {
  // TODO un translate Service

  create(location: any): () => string {
    return () => `
      <div class="popup-container">
        <div class="popup-header">
          ${
            location.type === 'Visited'
              ? `<div class="visited">${location.type}</div>`
              : `<div class="to-visit">To be Planned</div>`
          }
        </div>
        <div class="popup-body">
          <div class="info-text">
            Id: ${location.properties.locationId}
          </div>
          <div class="info-text">
            Location name: ${location.city}
          </div>
        </div>
      </div>
    `;
  }
}
