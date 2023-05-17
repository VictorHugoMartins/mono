// tutorial em https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";

const Map = ({
  coords,
  lastPosition,
  markers,
  latestTimestamp,
  unfilteredData,
}: {
  coords: number[][];
  lastPosition?: [number, number];
  markers?: [number, number][];
  latestTimestamp?: string;
}) => {

  const _centerPosition = [markers[markers.length - 1][0], markers[markers.length - 1][1]];
  const geoJsonObj: any = [
    {
      type: "LineString",
      coordinates: coords,
    },
  ];

  const mapMarkers = markers?.map((latLng, i) => (
    <CircleMarker key={i} center={latLng} />
  ));

  useEffect(() => {
    console.log(markers);
  }, [markers])

  return (
    <div style={{ width: "60vw", height: "80vh" }}>
      {/* <h2>Asset Tracker Map</h2> */}
      {markers?.length > 0 && <MapContainer
        // bounds={markers?.length > 0 ? [markers[0][0], markers[0][1]] : null}
        // center={_lastPosition ?? [0, 0]}
        // zoom={12}
        center={_centerPosition}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoidmh1Z29tYXJ0aW5zIiwiYSI6ImNsaHBkdTc1dTA1cDczZ281ODJsdWxycjAifQ.zWYl23LFmV4tqr2t-UA9Wg`}
        />
        {markers?.map((latLng, i) => (
          <Marker
            position={latLng}
            draggable={true}
            animate={true}
          >
            <Popup>
              <div style={{ maxWidth: "150px" }}>
                <div>
                  <strong>{unfilteredData[i]?.name}</strong>
                </div>
                <div>
                  <a href={`https://www.airbnb.com.br/rooms/${unfilteredData[i]?.room_id}`}>Acesse no Airbnb</a>
                </div>
              </div>
            </Popup>
            {/* {mapMarkers} */}
          </Marker>
        ))}


        {/* <Marker position={_lastPosition}>
          {/* draggable={true}> */}
        {/* <Popup>
            Last recorded position:
            <br />
            {lastPosition[0].toFixed(3)}&#176;,&nbsp;
            {lastPosition[1].toFixed(3)}&#176;
            <br />
            {latestTimestamp}
          </Popup> */}
        {/* <GeoJSON data={geoJsonObj}></GeoJSON> 
          {mapMarkers}
        </Marker> */}
      </MapContainer>
      }
    </div>
  );
};

export default Map;