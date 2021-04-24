import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPoints } from '../redux/actions/spatialActions';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../sass/style.scss';

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken ='<MapBox Api Key>';

const Map = () => {
  const dispatch = useDispatch();
  const { spatial } = useSelector((state) => state.spatial);
  console.log(spatial);
  const mapContainer = useRef();
  const [lng, setLng] = useState(28.5);
  const [lat, setLat] = useState(39.6);
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    dispatch(getPoints());
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    let size = 200;

    let pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      onAdd: function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

      render: function () {
        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.7 * t + radius;
        let context = this.context;

        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0, 0, this.width, this.height).data;

        map.triggerRepaint();

        return true;
      },
    };

    map.on('load', function () {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addSource('Deprem', {
        type: 'geojson',
        data: spatial,
      });

      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'Deprem',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true,
          'icon-size': ['get', 'Magnitude'],
        },
      });
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('click', 'places', function (e) {
      let coordinates = e.features[0].geometry.coordinates.slice();

      let eventID = e.features[0].properties.EventID;
      let eventLocationName = e.features[0].properties.EventLocationName;
      let magnitude = e.features[0].properties.Magnitude;
      let depthKm = e.features[0].properties.DepthKm;
      let magType = e.features[0].properties.MagType;
      let time = e.features[0].properties.Time;
      let latitude = e.features[0].properties.Latitude;
      let longitude = e.features[0].properties.Longitude;

      let infoTable = `<table style="width:100%">
      <tr>
        <th>Öznitelik</th>
        <th>Bilgi</th> 
      </tr>
      <tr>
        <td>ID</td>
        <td>${eventID}</td>
      </tr>
      <tr>
        <td>Konum</td>
        <td>${eventLocationName}</td>
      </tr>
      <tr>
        <td>Büyüklük</td>
        <td>${magnitude}</td>
      </tr>
      <tr>
        <td>Derinlik</td>
        <td>${depthKm}</td>
      </tr>
      <tr>
      <td>Zaman</td>
      <td>${time}</td>
      </tr>
      <tr>
        <td>Enlem</td>
        <td>${latitude}</td>
      </tr>
      <tr>
        <td>Boylam</td>
        <td>${longitude}</td>
      </tr>
    </table>`;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup().setLngLat(coordinates).setHTML(infoTable).addTo(map);
    });

    map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
    });

    return () => map.remove();
  }, [spatial]);

  return (
    <div>
      <div className="sidebar">
        Enlem: {lat} | Boylam: {lng} | Yakınlaştırma: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
