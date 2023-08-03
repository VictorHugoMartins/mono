// tutorial em https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { divIcon } from "leaflet";
import { LatLngExpression } from "leaflet";
const Map = ({
  markers,
  unfilteredData,
  viewForClusters
}: {
  coords: number[][];
  lastPosition?: [number, number];
  markers?: [number, number][];
  latestTimestamp?: string;
  unfilteredData: any;
  viewForClusters?: boolean;
}) => {
  const colors = ['#264653', '#E76f51', '#e9c46a', '#2a9d8f', '#f4a261', '#3a5a40', '#a3b18a', '#b5838d', '#bc6c25', '#c77dff']

  const airbnbIcon = divIcon({ html: `<div class='marker' style='background-color: ${colors[0]}'></div>` }),
    bookingIcon = divIcon({ html: `<div class='marker' style='background-color: ${colors[1]}'></div>` }),
    bothIcon = divIcon({ html: `<div class='marker' style='background-color: ${colors[2]}'></div>` });

  const _centerPosition = [markers[markers.length - 1][0], markers[markers.length - 1][1]];

  return (
    <div style={{ width: "60vw", height: "80vh" }}>

      {markers?.length > 0 && <MapContainer
        center={_centerPosition as LatLngExpression}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoidmh1Z29tYXJ0aW5zIiwiYSI6ImNsaHBkdTc1dTA1cDczZ281ODJsdWxycjAifQ.zWYl23LFmV4tqr2t-UA9Wg`}
        />
        {markers?.map((latLng, i) => (
          <Marker
            position={latLng}
            icon={!viewForClusters ?
              unfilteredData[i]?.platform == 'Airbnb' ? airbnbIcon :
                unfilteredData[i]?.platform == 'Booking' ? bookingIcon : bothIcon :
              divIcon({ html: `<div class='marker' style='background-color: ${colors[Number(unfilteredData[i]?.cluster)]}'></div>` })}
          >
            {unfilteredData?.length > 0 &&
              <Popup>
                <div style={{ maxWidth: "150px" }}>
                  <div>
                    <strong>
                      {unfilteredData[i]?.name}
                      {unfilteredData[i]?.hotel_name && ` no ${unfilteredData[i]?.hotel_name}`}
                    </strong>
                  </div>
                  <div>
                    {unfilteredData[i]?.platform == 'Airbnb' && unfilteredData[i]?.room_id ?
                      <a href={`https://www.airbnb.com.br/rooms/${unfilteredData[i]?.room_id}`}>Acesse no Airbnb</a> :
                      unfilteredData[i]?.hotel_id ?
                        <a href={`https://www.booking.com/hotel/br/${unfilteredData[i]?.hotel_id}`}>Acesse no Booking</a> :
                        <h6>Algo deu errado ao tentar encontrar link... Tente encontrar o estabelecimento manualmente</h6>
                    }
                  </div>
                </div>
              </Popup>
            }
          </Marker>
        ))}
      </MapContainer>
      }
    </div>
  );
};

export default Map;