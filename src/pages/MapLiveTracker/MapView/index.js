// import React, { Component } from 'react'

// import { fetchVehicleTrackingbySite } from "../../../service";
// import Header from './SideNav/Header'
// import MapView from './Components/MapView'
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Container,
//   Row,
//   Col,
//   Button,
// } from 'reactstrap'
// export default class MapTracker extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       sites: [],
//       selectedSite: '',
//       loader: false,
//       vehiclePositions: [],
//       vehicles: [],
//       selectedVehicle: null,
//     }
//   }

//   componentDidMount() {
//     var user = JSON.parse(localStorage.getItem('authUser'))

//     Promise.all([
//       fetch(
//         `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/track/usrsites?user=` +
//         user.username
//       ),
//     ])
//       .then(([res1]) => {
//         return Promise.all([res1.json()])
//       })
//       .then(([res1]) => {
//         this.setState({
//           sites: res1,
//         })
//       })


//     this.intervalId = setInterval(this.fetchVehiclePositions, 10000);

//   }

//   componentWillUnmount() {
//     console.log("inside componeny did mount")
//     clearInterval(this.intervalId);
//   }


//   fetchVehiclePositions = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/track/livevehbysite?site=` + this.state.selectedSite); // Your API endpoint
//       const data = await response.json();
//       this.setState({ vehiclePositions: data });
//     } catch (error) {
//       console.error('Error fetching vehicle positions:', error);
//     }
//   };




//   fetchVehiclesBySite = async (siteId) => {
//     try {
//       const today = new Date().toISOString().split('T')[0];

//       const response = await fetch(
//         `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/vehicle/panel?site=${siteId}&date=${today}`
//       );

//       const data = await response.json();

//       this.setState({
//         vehicles: data || [],
//         selectedVehicle: null, // reset on site change
//       });
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//     }
//   };


//   componentDidMount() {
//     // existing
//     this.fetchVehicleList();
//     this.intervalId = setInterval(this.fetchVehiclePositions, 10000);
//   }


//   handleVehicleChange = (selectedVehicle) => {
//   this.setState({ selectedVehicle });
// };

//   handleSiteChange = (data) => {
//     const siteId = data.value;

//     this.setState(
//       {
//         selectedSite: siteId,
//         loader: true,
//         vehicles: [],
//         vehiclePositions: [],
//       },
//       async () => {
//         // 1️⃣ fetch vehicles for selected site
//         await this.fetchVehiclesBySite(siteId);

//         // 2️⃣ fetch live positions (initial hit)
//         await this.fetchVehiclePositions();

//         this.setState({ loader: false });
//       }
//     );
//   };




//   // handleSiteChange = (data) => {
//   //   this.setState({ loader: true })
//   //   console.log(data)

//   //   fetchVehicleTrackingbySite(data.value)
//   //     .then(([res1]) => {
//   //       this.setState({
//   //         vehiclePositions: res1,
//   //       });
//   //     })
//   //   this.setState({
//   //     selectedSite: data.value,
//   //     loader: false,
//   //   })
//   // }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="page-content pb-0">
//           <Row>
//             <Col xs="12">
//               <Card>
//                 <CardBody>


//                   <Header
//                     sites={this.state.sites}
//                     selectedSite={this.state.selectedSite}
//                     siteChange={this.handleSiteChange}
//                     vehicles={this.state.vehicles}
//                     selectedVehicle={this.state.selectedVehicle}
//                     vehicleChange={this.handleVehicleChange}
//                   />
//                   <Row
//                     style={{ backgroundColor: 'currentcolor', height: '5px' }}
//                   >
//                     <Col md="6" className="d-flex align-items-center">
//                     </Col>
//                   </Row>

//                   <Row>
//                     <MapView vehiclePositions={this.state.vehiclePositions} />
//                   </Row>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </React.Fragment>
//     )
//   }
// }

import React, { Component } from 'react'
import Header from './SideNav/Header'
import MapView from './Components/MapView'
import StatsCard from './Components/StatsCard'
import { Card, CardBody, Row, Col } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default class MapTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sites: [],
      selectedSite: '',
      vehicles: [],              // live tracking (do not touch)
      vehicleDropList: [],       // dropdown vehicles
      selectedVehicles: [],
      vehiclePositions: [],
      loader: false,

      // orders section
      showOrders: false,
      selectedOrders: [],
      selectedVrNum: '',
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('authUser'))

    fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/track/usrsites?user=${user.username}`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ sites: data || [] }))
      .catch(console.error)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }


  /* ---------------- LIVE VEHICLE POSITIONS ---------------- */
  fetchVehiclePositions = async () => {
    if (!this.state.selectedSite) return

    try {
      const res = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/track/livevehbysite?site=${this.state.selectedSite}`
      )
      const data = await res.json()
      this.setState({ vehiclePositions: Array.isArray(data) ? data : [] })
    } catch (e) {
      console.error(e)
    }
  }

  /* ---------------- DROPDOWN VEHICLES ---------------- */
  fetchVehiclesBySite = async (siteId) => {
    const today = new Date().toISOString().split('T')[0]

    const res = await fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/vehicle/panel?site=${siteId}&date=${today}`
    )
    const data = await res.json()

    this.setState({
      vehicleDropList: Array.isArray(data?.vehicles) ? data.vehicles : [],
      selectedVehicles: [],
    })

  }

  /* ---------------- STATS ---------------- */
  getVehicleStats = () => {
    const live = Array.isArray(this.state.vehiclePositions)
      ? this.state.vehiclePositions
      : []

    const dropdown = Array.isArray(this.state.vehicleDropList)
      ? this.state.vehicleDropList
      : []

    let moving = 0,
      stopped = 0,
      idle = 0

    live.forEach((v) => {
      const speed = Number(v.speed || 0)
      const ignition = v.ignition === 'ON' || v.ignition === true

      if (speed > 0) moving++
      else if (speed === 0 && ignition) idle++
      else stopped++
    })

    return {
      total: dropdown.length, //  total from dropdown API
      moving,
      stopped,
      idle,
    }
  }

  /* ---------------- HANDLERS ---------------- */
  handleSiteChange = (data) => {
    if (!data) return

    clearInterval(this.intervalId)

    const selectedSiteObj = this.state.sites.find(
      (s) => s.id === data.value
    )

    this.setState(
      {
        selectedSite: data.value,

        // ✅ site coordinates
        siteLat: selectedSiteObj?.lat,
        siteLng: selectedSiteObj?.lng,

        // selectedVehicle: null,
        selectedVehicles: [],

        vehiclePositions: [],
        loader: true,
      },
      async () => {
        // ✅ FETCH VEHICLES AGAIN (THIS WAS MISSING)
        await this.fetchVehiclesBySite(data.value)
        await this.fetchVehiclePositions()

        this.intervalId = setInterval(
          this.fetchVehiclePositions,
          10000
        )

        this.setState({ loader: false })
      }
    )
  }



  // handleSiteChange = (data) => {
  //   if (!data) return

  //   clearInterval(this.intervalId)

  //   this.setState(
  //     {
  //       selectedSite: data.value,
  //       vehiclePositions: [],
  //       loader: true,
  //     },
  //     async () => {
  //       await this.fetchVehiclesBySite(data.value)
  //       await this.fetchVehiclePositions()
  //       this.intervalId = setInterval(this.fetchVehiclePositions, 10000)
  //       this.setState({ loader: false })
  //     }
  //   )
  // }

handleVehicleChange = (vehicleValues) => {
  this.setState({ selectedVehicles: vehicleValues })
}



  handleRefresh = async () => {
    const { selectedSite } = this.state
    if (!selectedSite) return

    // CLEAR VEHICLE DROPDOWN
    // this.setState({ selectedVehicle: null })
    this.setState({ selectedVehicles: [] })


    this.setState({ loader: true })

    clearInterval(this.intervalId)

    try {
      await this.fetchVehiclesBySite(selectedSite)
      await this.fetchVehiclePositions()

      this.intervalId = setInterval(this.fetchVehiclePositions, 10000)
      toast.success('Refreshed successfully')
    } catch (err) {
      toast.error('Refresh failed')
    } finally {
      this.setState({ loader: false })
    }
  }



  handleListOrdersFromMap = (vehicle) => {
    let orders = []

    // backend gives single order object
    if (vehicle.routeDetail) {
      orders = [vehicle.routeDetail]
    }

    this.setState({
      showOrders: true,
      selectedVrNum: vehicle.vrnum,
      selectedOrders: orders,
    })
  }



  getFilteredVehicles = () => {
    const { vehiclePositions, selectedVehicles } = this.state

    // no selection → show all live vehicles
    if (!selectedVehicles || selectedVehicles.length === 0) {
      return vehiclePositions
    }

    // show only selected vehicles that are live
    return vehiclePositions.filter(v =>
      selectedVehicles.includes(v.vehicle)
    )
  }




  render() {



    const { total, moving, stopped, idle } = this.getVehicleStats()
    const DELIVERY_STATUS_MAP = {
      '1': 'Scheduled',
      '2': 'On the way',
      '3': 'In-Progress',
      '4': 'Completed',
      '5': 'Skipped',
      '6': 'Re-Scheduled',
      '7': 'Cancelled',
      '8': 'To-Plan',
      '9': 'Non-Scheduled',
      '10': 'Picked Up',
    }
    return (
      <div className="page-content pb-0">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
        {/* ---------- HEADER ---------- */}
        <Row>
          <Col xs="12">
            <Card style={{ marginBottom: 16 }}>
              <CardBody >
                <Header
                  sites={this.state.sites}
                  selectedSite={this.state.selectedSite}
                  siteChange={this.handleSiteChange}
                  vehicleDropList={this.state.vehicleDropList}
                  // selectedVehicle={this.state.selectedVehicle}
                  selectedVehicles={this.state.selectedVehicles}

                  vehicleChange={this.handleVehicleChange}
                  onRefresh={this.handleRefresh}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* ---------- STATS ---------- */}
        <Row style={{ marginTop: 0, marginBottom: '8px' }}>

          <Col md="3"><StatsCard title="Total Vehicles" value={total} /></Col>
          <Col md="3"><StatsCard title="Moving" value={moving} color="#16a34a" /></Col>
          <Col md="3"><StatsCard title="Stopped" value={stopped} color="#dc2626" /></Col>
          <Col md="3"><StatsCard title="Idle" value={idle} color="#2563eb" /></Col>
        </Row>

        {/* ---------- MAP (ONLY ONCE) ---------- */}

        <Row>
          <Col xs="12">
            <Card style={{ marginBottom: 0 }}>
              <CardBody style={{ paddingBottom: 0 }}>
                <MapView
                  // vehiclePositions={this.state.vehiclePositions}
                  // onListOrders={this.handleListOrdersFromMap}
                  // vehiclePositions={this.getFilteredVehicles()}
                  // onListOrders={this.handleListOrdersFromMap}
                  vehiclePositions={this.getFilteredVehicles()}
                  siteLat={this.state.siteLat}
                  siteLng={this.state.siteLng}
                  selectedVehicles={this.state.selectedVehicles}

                  onListOrders={this.handleListOrdersFromMap}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>


        {/* ---------- ORDERS SECTION ---------- */}
        {this.state.showOrders && (
          <Row style={{ marginTop: 12 }}>
            <Col xs="12">
              <Card>
                <CardBody style={{ paddingBottom: 12 }}>

                  {/* HEADER */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <h5 style={{ margin: 0 }}>
                      Orders for : {this.state.selectedVrNum}
                    </h5>

                    <button
                      onClick={() =>
                        this.setState({
                          showOrders: false,
                          selectedOrders: [],
                          selectedVrNum: '',
                        })
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: 20,
                        cursor: 'pointer',
                        color: '#6b7280',
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* TABLE */}
                  <table
                    className="table table-sm table-bordered"
                    style={{ marginTop: 12, marginBottom: 0 }}
                  >
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Document No</th>
                        <th>Address</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.selectedOrders.map((o) => (
                        <tr key={o.rowid}>
                          <td>{o.rowid}</td>
                          <td>{o.bprnam || '-'}</td>
                          <td>
                            {Array.isArray(o.sdhnum)
                              ? o.sdhnum.join(', ')
                              : o.sdhnum
                                ? o.sdhnum
                                : '-'}
                          </td>
                          <td>{o.adresname || '-'}</td>

                          <td>
                            {DELIVERY_STATUS_MAP[o.xdlv_status] || '-'}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>

                </CardBody>
              </Card>
            </Col>
          </Row>
        )}


      </div>
    )
  }
}
