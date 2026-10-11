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

