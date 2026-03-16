import React, { Component } from 'react'

import { fetchVehicleTrackingbySite } from "../../../service";
import Header from './SideNav/Header'
import MapView from './Components/MapView'
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'
export default class MapTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sites: [],
      selectedSite: '',
      loader: false,
      vehiclePositions: [],
      vehicles : [],
    }
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('authUser'))

    Promise.all([
      fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/track/usrsites?user=` +
          user.username
      ),
    ])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      })
      .then(([res1]) => {
        this.setState({
          sites: res1,
        })
      })


       this.intervalId = setInterval(this.fetchVehiclePositions, 10000);

  }

    componentWillUnmount() {
     console.log("inside componeny did mount")
      clearInterval(this.intervalId);
    }


  fetchVehiclePositions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/track/livevehbysite?site=` + this.state.selectedSite); // Your API endpoint
        const data = await response.json();
        this.setState({ vehiclePositions: data });
      } catch (error) {
        console.error('Error fetching vehicle positions:', error);
      }
    };



  handleSiteChange = (data) => {
    this.setState({ loader: true })
    console.log(data)

     fetchVehicleTrackingbySite(data.value)
                         .then(([res1]) => {
                           this.setState({
                                     vehiclePositions: res1,
                                   });
                         })
    this.setState({
      selectedSite: data.value,
      loader: false,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content pb-0">
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>


                  <Header
                    sites={this.state.sites}
                    selectedSite={this.state.selectedSite}
                    siteChange={this.handleSiteChange}
                  />
                   <Row
                                      style={{ backgroundColor: 'currentcolor', height: '5px' }}
                                    >
                                      <Col md="6" className="d-flex align-items-center">
                                      </Col>
                                    </Row>

                  <Row>
                    <MapView vehiclePositions={this.state.vehiclePositions} />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}
