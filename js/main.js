import * as maplibregl from 'https://unpkg.com/maplibre-gl@^6.12.0/dist/maplibre-gl.mjs';

const map = new maplibregl.Map({
  container: 'map',
  minZoom: 2.5,
  style: 'basemap.json' 
});

window.map = map;

map.on('click', e => {
  map.queryRenderedFeatures(e.point).forEach(f =>
    console.log(f.layer.id, JSON.stringify(f.properties['name:en']), JSON.stringify(f.properties.name))
  );
});

map.on('click', e => {
  const r = 6;
  map.queryRenderedFeatures(
    [[e.point.x - r, e.point.y - r], [e.point.x + r, e.point.y + r]],
    { layers: ['adm1-borders'] }
  ).forEach(f => console.log(f.properties.adm0_l, f.properties.adm0_r));
});

map.on('click', e => {
  map.queryRenderedFeatures(e.point, { layers: ['neighborhoods'] })
    .forEach(f => console.log(f.properties.class, f.properties['name:en'] || f.properties.name, map.getZoom().toFixed(1)));
});

map.on('load', () => {

  map.addSource('glow-bands', {
    type: 'geojson',
    data: 'glow_bands.geojson'
  });

  map.addLayer({
  id: 'country-glow',
  type: 'fill',
  source: 'glow-bands',
  paint: {
    'fill-color': [
      'match',
      ['to-number', ['get', 'color']],
      1, '#e9b5a1',  
      2, '#f2d59c',  
      3, '#cddba5',  
      4, '#a9d1c3',  
      5, '#a9c9e2',  
      6, '#c6bade',  
      7, '#e7b9c9',  
      8, '#dcc5a2',  
      9, '#b8d4b1',  
      '#cfd8dc'      
    ],
    'fill-opacity': ['get', 'opacity'],
    'fill-antialias': false
  }
}, 'cities');

});
