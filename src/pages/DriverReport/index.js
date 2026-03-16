import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import TrailerReportCalendar from './TrailerSchduler';
import { fetchDocumentsTrackingbySite, fetchSchedulerPanelList } from "../../service";
import Header from './SideNav/Header'

class Dashboard extends Component {
  constructor(props) {
    super(props);
     this.state = {
          sites: [],
          selectedSite: '',
          loader: false,
          selectedDate : new Date(),
          documents : [],
           vehiclePanel: {
                  vehicles: [],
                  equipments: [],
                  trails: [],
                  drivers: [],
                },

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


    }


    handleDateRangeChange = (date) => {
      console.log("handleDateRangeChange - 2", date)

    }


      handleSiteChange = (data) => {
        this.setState({ loader: true })
        console.log(data)
        let currDate =  "2024-03-25";
         fetchSchedulerPanelList(data.value, currDate)
                .then(([res1, res2, res3, res4]) => {
                  this.setState({
                    vehiclePanel: res1

                  });
                })
                .catch((error) => {});

         fetchDocumentsTrackingbySite(data.value)
                             .then(([res1]) => {
                               this.setState({
                                         documents: res1,
                                       });
                             })
        this.setState({
          selectedSite: data.value,
          loader: false,
        })
      }

render( ) {
    return (
 <React.Fragment>
        <div className="page-content pb-0">
          <Container fluid>
               <Row>
                             <Col xs="12">
                               <Card>
                                 <CardBody>
                                   <Row style={{ backgroundColor: "currentcolor", height: "50px" }}>
                                     <Col md="6" className="d-flex align-items-center">
                                       <CardTitle className="h1 mb-0 " style={{ color: "white" }}>
                                         Scheduled Routes by Driver

                                       </CardTitle>
                                     </Col>
                                   </Row>
                                   <Row style={{marginTop : "10px"}}>


                                   <Col xs="12">
                                    <Header
                                                                                          sites={this.state.sites}
                                                                                          selectedSite={this.state.selectedSite}
                                                                                          siteChange={this.handleSiteChange}
                                                                                        />
                                           <TrailerReportCalendar
                                           drivers = {this.state.vehiclePanel.drivers}
                                           data = {this.state.documents}
                                           selectedDate = {this.state.selectedDate}
                                           handleDateRangeChange = {this.handleDateRangeChange}

                                           />
                                    </Col>
                                   </Row>
                                </CardBody>
                                </Card>
                             </Col>
                  </Row>
         </Container>
        </div>
 </React.Fragment>
    );

  }
  }


export default Dashboard;
