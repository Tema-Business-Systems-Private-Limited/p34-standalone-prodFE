// import React, { useState }   from 'react'
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
// import customIcon from "../truck1.png"
// import driverimage from "./driver.png"
// import './MapView.css' // Import CSS for custom styles
// const mapContainerStyle = {
//   height: '600px',
//   width: '100%',
// }

// const defaultCenter = {
//   // lat: 40.748817,
//   // lng: -73.985428,
//   lat: 10.638787592522007,
//   lng: -61.38596369893519,
// }

// function MapView(props) {

//   const [selectedVehicle, setSelectedVehicle] = useState(null);

//   const handleMarkerClick = (vehicle) => {
//     setSelectedVehicle(vehicle);
//   };

//   const handleInfoWindowClose = () => {
//     setSelectedVehicle(null);
//   };


//    console.log("Data changes at maps", props.vehiclePositions)
//   return (

//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={defaultCenter}
//         zoom={10}
//       >
//        {props.vehiclePositions.map((position, index) => (

//                   <Marker
//                     key={index}
//                     position={{ lat: parseFloat(position.lat), lng: parseFloat(position.lng) }}
//                     icon={{
//                       url: customIcon, // Replace with your icon URL
//                       scaledSize: new window.google.maps.Size(50, 50) // Adjust size as needed
//                     }}
//                     onClick={() => handleMarkerClick(position)}
//                   />
//                 ))}

//                     {selectedVehicle && (
//                            <InfoWindow
//                              position={{ lat: parseFloat(selectedVehicle.lat), lng: parseFloat(selectedVehicle.lng) }}
//                              onCloseClick={handleInfoWindowClose}
//                            >
//                              <div className="info-window">
//                                <div className="info-header">
//                                  <i className="fas fa-truck icon"></i>
//                                  <h3>{selectedVehicle.vehicle}</h3>
//                                </div>
//                                <div className="info-content">
//                                  <p><i className="fas fa-map-marker-alt"></i> Latitude: {selectedVehicle.lat}</p>
//                                  <p><i className="fas fa-map-marker-alt"></i> Longitude: {selectedVehicle.lng}</p>
//                                  <p><i className="fas fa-id-card"></i>{selectedVehicle.regplate}</p>
//                                  <p><i className="fas fa-road"></i> {selectedVehicle.vrnum}</p>
//                                   <p><img src={driverimage} alt="Driver" />{selectedVehicle.driver}</p>

//                                </div>
//                              </div>
//                            </InfoWindow>
//                          )}

//       </GoogleMap>

//   )
// }
// export default MapView


import React, { useState, useEffect, useRef } from 'react'


import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import customIcon from '../truck1.png'
import driverimage from './driver.png'
import './MapView.css'




const mapContainerStyle = {
  height: '600px',
  width: '100%',
}

const defaultCenter = {
  lat: 10.638787592522007,
  lng: -61.38596369893519,
}

function MapView(props) {
  const mapRef = useRef(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle)
  }

  const handleInfoWindowClose = () => {
    setSelectedVehicle(null)
  }

  // 🔗 Tell parent (MapTracker) to show orders section
  const handleListOrders = (vehicle) => {
    if (props.onListOrders) {
      props.onListOrders(vehicle)
    }
  }

  useEffect(() => {
    if (mapRef.current && props.siteLat && props.siteLng) {
      mapRef.current.panTo({
        lat: Number(props.siteLat),
        lng: Number(props.siteLng),
      })
      mapRef.current.setZoom(12)
    }
  }, [props.siteLat, props.siteLng])



useEffect(() => {
  if (!mapRef.current) return

  const vehicles = props.vehiclePositions || []

  // 🚚 ONE vehicle → zoom to it
  if (
    props.selectedVehicles?.length === 1 &&
    vehicles.length === 1
  ) {
    const v = vehicles[0]

    const lat = Number(v.lat)
    const lng = Number(v.lng)

    if (!isNaN(lat) && !isNaN(lng)) {
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(16)
    }

    return
  }

  // 🗺️ MULTIPLE vehicles → fit bounds
  if (props.selectedVehicles?.length > 1 && vehicles.length > 1) {
    const bounds = new window.google.maps.LatLngBounds()

    vehicles.forEach((v) => {
      const lat = Number(v.lat)
      const lng = Number(v.lng)

      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat, lng })
      }
    })

    mapRef.current.fitBounds(bounds)
  }
}, [props.selectedVehicles, props.vehiclePositions])






  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}   // 👈 REQUIRED for initial render
      zoom={5}                 // 👈 any safe world zoom
      onLoad={(map) => {
        mapRef.current = map

        // move to site after map loads
        if (props.siteLat && props.siteLng) {
          map.panTo({
            lat: Number(props.siteLat),
            lng: Number(props.siteLng),
          })
          map.setZoom(12)
        }
      }}
    >


      {/* VEHICLE MARKERS */}
      {Array.isArray(props.vehiclePositions) &&
        props.vehiclePositions.map((position, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(position.lat),
              lng: parseFloat(position.lng),
            }}
            icon={{
              url: customIcon,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => handleMarkerClick(position)}
          />
        ))}

      {/* INFO WINDOW */}
      {selectedVehicle && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedVehicle.lat),
            lng: parseFloat(selectedVehicle.lng),
          }}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="vehicle-card">
            {/* VEHICLE NUMBER */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>🚚</span>
              <span>{selectedVehicle.vehicle}</span>
            </div>

            {/* LATITUDE */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>📍</span>
              <span>Latitude: {selectedVehicle.lat}</span>
            </div>

            {/* LONGITUDE */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>📍</span>
              <span>Longitude: {selectedVehicle.lng}</span>
            </div>

            {/* TDN */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>📦</span>
              <span>TDN: {selectedVehicle.regplate}</span>
            </div>

            {/* TRIP */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>🧾</span>
              <span>Trip: {selectedVehicle.vrnum}</span>
            </div>

            {/* DRIVER */}
            <div className="vehicle-row">
              <span className="row-icon"
                style={{ fontSize: '18px' }}>👤</span>
              <span>Driver: {selectedVehicle.driver}</span>
            </div>

            {/* LIST ORDERS BUTTON */}
            <button
              className="vehicle-orders-btn"
              onClick={() => handleListOrders(selectedVehicle)}
            >
              List Orders
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default MapView
