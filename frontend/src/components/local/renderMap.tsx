// imports
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// other imports

type DataProps = {
  data?: any;
  viewForClusters?: boolean;
  // condensed for code brevity
};

const MapRender: React.FC<DataProps> = ({ data, viewForClusters }) => {
  // needed to make the Leaflet map render correctly
  const MapWithNoSSR = dynamic(() => import("../../../src/components/local/Map"), {
    ssr: false,
  });

  const [lngLatCoords, setLngLatCoords] = useState([]);
  // logic to transform data into the items needed to pass to the map

  const [latLngMarkerPositions, setLatLngMarkerPositions] = useState<[number, number][]>();
  useEffect(() => {
    if (data) {
      let obj = [] as [number, number][];
      for (let i = 0; i < data.length; i++) {
        // console.log(Number(data[i].latitude), Number(data[i].longitude))
        obj.push([Number(data[i].latitude), Number(data[i].longitude)]);
      }
      setLatLngMarkerPositions(obj);
    }
  }, [data])

  return (
    <div>
      <main>
        <div>
          {latLngMarkerPositions?.length > 0 &&
            <MapWithNoSSR
              coords={lngLatCoords}
              // lastPosition={lastPosition}
              markers={latLngMarkerPositions}
              unfilteredData={data}
              viewForClusters={viewForClusters}
            // latestTimestamp={latestTimestamp}
            />
          }
        </div>
        {/* other tracker components */}
      </main>
    </div>
  );
}

export default MapRender;