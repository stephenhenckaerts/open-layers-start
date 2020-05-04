import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

class OlMap {

  constructor() {
    this.map = this.createMap();
  }

  createMap() {
    return new Map({
      target: null,
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });
  }

  addTileLayer(url) {
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url,
        params: {
          'TILED': true
        },
        crossOrigin: 'Anonymous'
      })
    });
    this.map.addLayer(wmsLayer);
  }

}

export default new OlMap();