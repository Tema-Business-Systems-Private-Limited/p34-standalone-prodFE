import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import { fetchLvsList,fetchLvsBySite,fetchLvsBySiteAndDate,fetchLvsByDate } from '../../service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import RailCarCheckInList  from './RailCarCheckInList_backup';
import "./checkIn.scss";
import moment from 'moment'

class LVS extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        searchValue : '',
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
        selectedDate : '',

    };
  }


   componentDidMount() {
     console.log("inside lvs")
      var user = JSON.parse(localStorage.getItem("authUser"));
       Promise.all([fetch('http://localhost:3001/api/v1/transport/usrsites?user='+ user.username)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      }).then(([res1]) => {
                this.setState({
                   sites: res1
                });
              });
    this.ReloadData();
}


   setCurrentSite = selectedOption => {

      this.setState({
        selectedSite: selectedOption
      });
    }


    OnCheckInClicked = selectedRailCar => {

      console.log("onCheckInClikced",selectedRailCar);
      fetch('http://localhost:3001/api/v1/rail/Checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRailCar)
      }).then((response) => {
        console.log("inside after Railcarcheckin - response",response);
       this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         console.log("after success ",this.state.selectedSite);
        this.ReloadData();
      }).then(() => {
        this.notifySucess("RailCar Checked-In Sucessfully");
      }).catch(error => {

        this.notifyError("Failed to CheckIn");
      });

    }

      handleErrors = (response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        }



    ReloadData = () => {
   //  console.log("after success ",selectedOption);

   console.log("site selected is", this.state.selectedSite);
   console.log("site selected length is", this.state.selectedSite.length);

   if(this.state.selectedSite.length) {
         fetchLvsBySite(this.state.selectedSite)
                 .then(([res1]) => {
                   this.setState({
                     CheckInList: res1,
                   });
                 }).then(() => {

                 }).catch(error => {

                 });
   }
   else {
    fetchLvsList()
             .then(([res1]) => {
               this.setState({
                 CheckInList: res1,
               });
             }).then(() => {

             }).catch(error => {

             });
    }
}
     // ** Function to handle filter
      handleFilter = e => {
        const value = e.target.value
        let updatedData = []
       // setSearchValue(value)

        if (value.length) {
          updatedData = this.state.CheckInList && this.state.CheckInList.filter(order => {
            let isMatch = false
            Object.keys(order).forEach(key => {
              if (order[key] && order[key] !== " " && order[key].toString().toLowerCase().includes(value.toLowerCase())) {
                isMatch = true
              }
            })
            return isMatch
          })
           this.setState({
              searchValue : value,
              CheckInList : updatedData
           })
        }
        else {
             this.ReloadData();
        }
      }

     clearData = () => {
           fetchLvsList()
                       .then(([res1]) => {
                         this.setState({
                           CheckInList: res1,
                           selectedSite : '',
                           searchValue : '',
                         });
                       }).then(() => {

                       }).catch(error => {

                       });

     }



     onDateChange = (selectedDate) => {

          console.log("on changed date is", selectedDate);
         const DateParam = moment(selectedDate[0]).format('YYYY-MM-DD')
           console.log("on changed date is after", DateParam);
         if(this.state.selectedSite.length) {
                 fetchLvsBySiteAndDate(this.state.selectedSite, DateParam)
                         .then(([res1]) => {
                           this.setState({
                             CheckInList: res1,
                           });
                         }).then(() => {

                         }).catch(error => {

                         });
           }
           else {
            fetchLvsByDate(DateParam)
                     .then(([res1]) => {
                       this.setState({
                         CheckInList: res1,
                       });
                     }).then(() => {

                     }).catch(error => {

                     });
            }

     }




  handleSiteChange = selectedOption => {
        console.log("site change",selectedOption);
       // console.log("date =",this.state.date);
        this.setCurrentSite(selectedOption);
       fetchLvsBySite(selectedOption)
         .then(([res1]) => {
           this.setState({
             CheckInList: res1,
           });
         }).then(() => {

         }).catch(error => {

         });
     };

 notifySucess = (message) => toast.success(message, { autoClose: 3000 });

 notifyError = (message) => toast.error(message, { autoClose: 3000 });

  render() {
    const routeData = {
      columns: [
        {
          label: "LVS NO",
          field: "lvsno",
          width: 130,
        },
        {
          label: "LVS Date",
          field: "iptdate",
          width: 130,
        },
        {
          label: "SITE",
          field: "site",
          width: 130,
        },
        {
                  label: "VR NO",
                  field: "vrno",
                  width: 130,
                },
        {
          label: "VR DATE",
          field: "vrdate",
          width: 150,
        },
        {
          label: "CHECKED-IN TIME",
          field: "time",
          width: 150,
        }
      ],
      rows: [
        {
           railcar : "ACFX 78674",
           desc : "",
           site : "STCA1",
           date :   "10-02-2022",
           time :  "10:00"
        },
        {
           railcar : "GATX008841",
                     desc : "",
                     site : "STCA1",
                     date :   "10-02-2022",
                     time :  "11:00"
        },
         {
                   railcar : "GATX008842",
                             desc : "",
                             site : "STCA1",
                             date :   "10-02-2022",
                             time :  "09:00"
                },
          {
                    railcar : "GATX008843",
                              desc :  "",
                              site : "STCA1",
                              date :   "10-02-2022",
                              time :  "10:40"
                 },
           {
                     railcar : "GATX008844",
                               desc :  "",
                               site : "STCA1",
                               date :   "10-02-2022",
                               time :  "14:00"
                  },
      ],
    };
    return (
      <React.Fragment>
        <div className="page-content">
         <ToastContainer />
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>


                    <RailCarCheckInList
                    lvsList = {this.state.CheckInList}
                    sites = {this.state.sites}
                    handleSiteChange = {this.handleSiteChange}
                    handleFilter = {this.handleFilter}
                     searchValue = {this.searchValue}
                     clearData = {this.clearData}
                     onDateChange = {this.onDateChange}

                    />
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

export default LVS;
