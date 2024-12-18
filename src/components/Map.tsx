import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

const Mapbox = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <Map
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 13,
      }}
      style={{ height: "200px", width: "200px", borderRadius: "10%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude}>
        {/*<Popup anchor="top">Start or End Location</Popup>*/}
      </Marker>
    </Map>
  );
};

export default Mapbox;
