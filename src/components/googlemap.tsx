import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  const googleMapsApiKey = "AIzaSyBN0T4epPdoJNwfe4cFgvl4oz-mkwQbQGI";
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: 4.173583, // Replace with actual latitude
    lng: 73.517227, // Replace with actual longitude
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
