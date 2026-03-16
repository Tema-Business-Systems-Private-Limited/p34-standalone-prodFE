import React, { useState }   from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import customIcon from "../truck1.png"
import driverimage from "./driver.png"
import './MapView.css'
const mapContainerStyle = {
  height: '600px',
  width: '100%',
}

const defaultCenter = {
  lat: 17.471460,
  lng: 78.353140,
}

function MapView(props) {

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleInfoWindowClose = () => {
    setSelectedVehicle(null);
  };


   console.log("Data changes at maps", props.vehiclePositions)
  return (

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
      >
       {props.vehiclePositions.map((position, index) => (

                  <Marker
                    key={index}
                    position={{ lat: parseFloat(position.lat), lng: parseFloat(position.lng) }}
                    icon={{
                      url: customIcon, // Replace with your icon URL
                      scaledSize: new window.google.maps.Size(50, 50) // Adjust size as needed
                    }}
                    onClick={() => handleMarkerClick(position)}
                  />
                ))}

                    {selectedVehicle && (
                           <InfoWindow
                             position={{ lat: parseFloat(selectedVehicle.lat), lng: parseFloat(selectedVehicle.lng) }}
                             onCloseClick={handleInfoWindowClose}
                           >
                             <div className="info-window">
                               <div className="info-header">
                                 <i className="fas fa-truck icon"></i>
                                 <h3>{selectedVehicle.vehicle}</h3>
                               </div>
                               <div className="info-content">
                                 <p><i className="fas fa-map-marker-alt"></i> Latitude: {selectedVehicle.lat}</p>
                                 <p><i className="fas fa-map-marker-alt"></i> Longitude: {selectedVehicle.lng}</p>
                                 <p><i className="fas fa-id-card"></i>{selectedVehicle.regplate}</p>
                                 <p><i className="fas fa-road"></i> {selectedVehicle.vrnum}</p>
                                  <p><img src={driverimage} alt="Driver" />{selectedVehicle.driver}</p>

                               </div>
                             </div>
                           </InfoWindow>
                         )}

      </GoogleMap>

  )
}
export default MapView
