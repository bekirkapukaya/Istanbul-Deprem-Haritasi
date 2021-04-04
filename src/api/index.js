import GeoJSON from 'geojson';
import data from './data.json';

const apiData = GeoJSON.parse(data, {
  Point: ['Latitude', 'Longitude'],
  include: [
    'EventID',
    'Time',
    'Latitude',
    'Longitude',
    'DepthKm',
    'MagType',
    'Magnitude',
    'EventLocationName',
  ],
});

export default apiData;
