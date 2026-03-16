import React, { Component } from "react";
import { Button } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import DriversList from "./DriversList";
import DriverDetails from "./DriverDetails";
import VehicleDetails from "./VehicleChart";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchGetDrivers, fetchGetDriverDetails, fetchVehicleDetails } from '../../service';
import { format } from "date-fns";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

class Drivers extends Component {
  constructor(props) {
    super(props);
    const getOneWeekAgo = () => {
      const today = new Date(); // Get today's date
      const oneWeekAgo = new Date(today); // Create a copy of today's date
      oneWeekAgo.setDate(today.getDate() - 7); // Subtract 7 days
      return oneWeekAgo;
    };
    this.state = {
      loader: false,
      drivers: [],
      vehicles: [],
      driverDetails: [],
      showDrivers: "none",
      showDriverDetails: "none",
      driverName: "",
      driverLicense: "",
      title: "Hours of Service Report",
      filter: "Driver", // Default tab
      startDate: getOneWeekAgo(), // Default to one week ago
      endDate: new Date(), // Default to today
      openModal: false,
      drivingDistanceData: {
        labels: ["Test VG", "Vehicle 1", "Vehicle 3", "Vehicle 6.1", "Vehicle 7"],
        datasets: [{
          label: "Miles",
          data: [130, 0, 0, 0, 0],
          backgroundColor: "blue",
        }],
      },
      drivingHoursData: {
        labels: ["Test VG", "Vehicle 1", "Vehicle 3", "Vehicle 6.1", "Vehicle 7"],
        datasets: [{
          label: "Hours",
          data: [12.3, 0, 0, 0, 0],
          backgroundColor: "blue",
        }],
      },
      safetyData: {
        labels: ["No Violations", "1-5 Violations", ">5 Violations"],
        datasets: [
          {
            data: [90, 8, 2],
            backgroundColor: ["green", "orange", "red"],
          },
        ],
      },
      vehicleShow: "block",
      driverShow:false
    };
  }


  handleDateChange = (date) => {
      const { startDate, endDate } = this.state;

      if (!startDate || (startDate && endDate)) {
          // Set start date if none is selected or reset if both are already selected
          this.setState({ startDate: date, endDate: null });
      } else if (date > startDate) {
          // Set end date only if it’s after start date
          this.setState({ endDate: date });
      } else {
          // If user selects an earlier date, reset start date
          this.setState({ startDate: date, endDate: null });
      }
  };

  toggleModal = () => {
      this.setState((prevState) => ({ openModal: !prevState.openModal }));
  };

  formatSelectedDates = () => {
      const { startDate, endDate } = this.state;
      if (!startDate) return "Select Date Range";
      if (!endDate) return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  componentDidMount() {
    // Set loader to true before fetching
    this.setState({
        loader: true
    });
    this.loadDrivers();
    this.loadVehichles();
  }


  

  getDriverDetails = (driver) => {
      this.setState({
        loader: true,
        showDrivers: "none",
        showDriverDetails: "block",
        title: "Hours of Service Report of " + driver.driverName,
        driverName: driver.driverName,
        driverLicense: driver.driverLicense
      })
  
      fetchGetDriverDetails(driver.driverId)
        .then(([res1]) => {
            // Once data is received, update the state
            this.setState({
            driverDetails: res1,
            loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
    });
  }

  loadDrivers = () => {
    const formatStartDate = format(this.state.startDate, "yyyy-MM-dd");
    const formatEndDate = format(this.state.endDate, "yyyy-MM-dd");

    // Fetch data and handle the response
    fetchGetDrivers(formatStartDate, formatEndDate)
        .then(([res1]) => {
            // Once data is received, update the state
            console.log(JSON.stringify(res1));
            this.setState({
            drivers: res1,
            loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
        
    });
  }

  loadVehichles = () => {
    const formatStartDate = format(this.state.startDate, "yyyy-MM-dd");
    const formatEndDate = format(this.state.endDate, "yyyy-MM-dd");

    fetchVehicleDetails(formatStartDate, formatEndDate)
        .then(([res1]) => {
            // Once data is received, update the state
            console.log(JSON.stringify(res1));
            this.setState({
              vehicles: res1.vehicles,
              drivingDistanceData: res1.drivingDistanceData,
              drivingHoursData: res1.drivingHoursData,
              safetyData: res1.safetyData,
              loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
        
    });
  }

  getAllDrivers = () => {
    this.setState({
      loader: true,
      showDrivers: "block",
      showDriverDetails: "none",
      vehicleShow: "none",
      title: "Hours of Service Report"
    })

    // Fetch data and handle the response
    this.loadDrivers();
    
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
    if (filter === "Driver") {
      this.setState({
        driverShow: true,
        showDrivers: "block",
        vehicleShow: "none",
        showDriverDetails: "none",
        loader: false
      });
    } else {
      this.setState({
        driverShow: false,
        showDrivers: "none",
        vehicleShow: "block",
        showDriverDetails: "none",
        loader: false
      });
    }
  };

  render() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { autoSkip: false } },
        y: { beginAtZero: true },
      },
    };

    const { startDate, endDate, openModal } = this.state;

    return (
      <React.Fragment>
         <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <LoadingOverlay
              active={this.state.loader}
              spinner
              text="Loading please wait..."
            >
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                    <Button variant={this.state.filter === "Vehicle" ? "contained" : "outlined"} onClick={() => this.handleFilterChange("Vehicle")}>Vehicle</Button>
                    <Button variant={this.state.filter === "Driver" ? "contained" : "outlined"} onClick={() => this.handleFilterChange("Driver")} style={{ marginLeft: 10 }}>Driver</Button>
                    <Button variant="outlined" onClick={this.toggleModal} style={{ float: 'right'}}>
                        {this.formatSelectedDates()}
                    </Button>
                      <section style={{ display: this.state.vehicleShow }}>
                        <VehicleDetails
                           vehicles={this.state.vehicles}
                           drivingDistanceData={this.state.drivingDistanceData}
                           drivingHoursData={this.state.drivingHoursData}
                           safetyData={this.state.safetyData}
                           chartOptions={this.chartOptions}
                        />
                      </section>
                      <section style={{ display: this.state.showDrivers }}>
                        <DriversList
                           drivers={this.state.drivers}
                           getDriverDetails={this.getDriverDetails}
                        />
                      </section>
                      <section style={{ display: this.state.showDriverDetails }}>
                        <DriverDetails
                           driverName= {this.state.driverName}
                           driverLicense= {this.state.driverLicense}
                           driverDetails={this.state.driverDetails}
                           getAllDrivers={this.getAllDrivers}
                        />
                      </section>
                      {/* Date Picker Modal */}
                      <Dialog open={openModal} onClose={this.toggleModal}>
                          <DialogTitle>Select Date Range</DialogTitle>
                          <DialogContent>
                              <DatePicker
                                  inline
                                  selectsRange
                                  monthsShown={2} // Show two months side by side
                                  startDate={startDate}
                                  endDate={endDate}
                                  onChange={this.handleDateChange}
                              />
                              <Button onClick={this.toggleModal} color="primary">
                                  Confirm
                              </Button>
                          </DialogContent>
                      </Dialog>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </LoadingOverlay>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Drivers;