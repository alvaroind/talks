var track = new ol.source.Vector({
  format: new ol.format.GPX(),
  url: 'data/track.gpx'
});
track.once('change', function() {
  var features = track.getFeatures();
  for (var i = 0, ii = features.length; i < ii; ++i) {
    olcs.core.applyHeightOffsetToGeometry(features[i].getGeometry(), 75);
  }
  ol3d.setEnabled(true);
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        // Get your own key at http://bingmapsportal.com/
        // Replace the key below with your own.
        key: 'AhaJDO_bWhekq58C0nGLRkwJSMphRFDTYeccozENkqZTAAa1W0OgoaWmcgbPxatZ',
        imagerySet: 'AerialWithLabels'
      })
    }),
    new ol.layer.Vector({
      source: track
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([13.749, 47.175]),
    zoom: 11
  })
});

var ol3d = new olcs.OLCesium({map: map});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
});
scene.terrainProvider = terrainProvider;
scene.globe.depthTestAgainstTerrain = true;
