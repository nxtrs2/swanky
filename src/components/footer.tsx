import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type FooterProps = {
  googleMapsApiKey: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: string;
  };
};

export default function Footer({
  googleMapsApiKey,
  address,
  phone,
  email,
  openingHours,
}: FooterProps) {
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: 40.7128, // Replace with actual latitude
    lng: -74.006, // Replace with actual longitude
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Swanky Shears</h3>
            <p>{address}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <div className="mt-4">
              <strong>Opening Hours:</strong>
              <ul className="list-disc list-inside pl-4">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <li key={day}>
                    {day}: {hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Swanky Shears. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
