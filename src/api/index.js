import GeoJSON from 'geojson';
import data from './data.json';

const apiData = GeoJSON.parse(data, {
  Point: ['Latitude', 'Longitude'],
  include: [
    'EventID',
    'Time',
    'Latitude',
    'Longitude',
    'Depth/km',
    'MagType',
    'Magnitude',
    'EventLocationName',
  ],
});

export default apiData;
