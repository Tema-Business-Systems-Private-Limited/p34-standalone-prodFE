import React from 'react';
import moment from 'moment';


import notintime from './images/delay.png';
import notokay from './images/not_ok.png';
import ontime from './images/on-time-4.png';
import { withNamespaces } from 'react-i18next';
import ProductsDetailList from './ProductsDetailList';

import { convertHrToSec, formatTime, nullAndNanChecking } from './converterFunctions/converterFunctions';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  TabPane,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
function GetDeliveryStatus22(x) {
    switch (x) {
        case 1: return 'Scheduled';
        case 2: return 'On the Way';
        case 3: return 'In-progress';
        case 4: return 'Completed';
        case 5: return 'Skipped';
        case 6: return 'Re-Scheduled';
        case 7: return 'Cancelled';
        case 8: return 'To-Plan';
        default: return '';
    }
}

class VrStops3 extends React.Component {
     constructor(props) {
            super(props);
            this.state = {
                ShowDetailList : false,
                addInfoShow: false,
                docNumber_1: "",
                skills : "",
                doctype_1:"",
                logisticDetails: '',


         }
         }
    GetDeliveryStatus = (x) => {

        switch (x) {
            case '1': return (<span class='badge badge-primary text-uppercase' >Scheduled</span>);
            case '2': return (<span class='badge badge-warning text-uppercase' >On the Way</span>);
            case '3': return (<span class='badge badge-warning text-uppercase' >In-progress</span>);
            case '4': return (<span class='badge badge-success text-uppercase' >Completed</span>);
            case '5': return (<span class='badge badge-info text-uppercase' >Skipped</span>);
            case '6': return (<span class='badge badge-primary text-uppercase' >Re-Scheduled</span>);
            case '7': return (<span class='badge badge-dark text-uppercase' >Cancelled</span>);
            case '8': return (<span class='badge badge-info text-uppercase' >To-Plan</span>);
            default: return (<span class='badge badge-primary text-uppercase' >default</span>);
        }

    }

        GetPickTicketStatus = (x, doctype) => {

          if(doctype == "4") {
            switch (x) {
                case '1': return ("In Process");
                case '2': return ("Delivarable");
                case '3': return ("Delivered");
                case '4': return ("Cancelled");
            }
            }
            else {
               return  'NA';
            }
        }

          displayBadge = (type, iSeq) => {
                const docmvt = type
                const Seq = iSeq ;
                if (docmvt == '4') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{Seq}</span></td>
                        </h5>
                    );
                }
                if (docmvt == '1') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                        </h5>
                    );
                }
                if (docmvt == '2') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                        </h5>
                    );
                }
                else{
                                    return (
                                        <h5>
                                            <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                                        </h5>
                                    );
                                }
            }

                 BPartnerBadgeLink = (doc, i, param) => {

                        console.log("passed data doc", doc);
                                               let data = this.props.tripdetails.totalObject.selectedTripData[i];
                                                                                       let logisticDetails = {};
                                                                                                                                                       logisticDetails.loadBay = '';
                                                                                                                                                       logisticDetails.tailGate = '';
                                                                                                                                                       logisticDetails.waitingTime = data.waitingTime && formatTime(convertHrToSec(data.waitingTime));
                                                                                                                                                       logisticDetails.stackHeight = data.stackHeight && nullAndNanChecking(data.stackHeight);
                                                                                                                                                       logisticDetails.timings = data.serviceTime && formatTime(convertHrToSec(data.serviceTime));
                                                                                                                                                       logisticDetails.packing = data.packing && data.packing;
                                                                                                                                                       logisticDetails.height = data.height && data.height;
                                                                                                                                                       logisticDetails.priority = data.priority && data.priority;
                                                                                                                                                       logisticDetails.loadingOrder = data.loadingOrder && data.loadingOrder;
                                                                                                                                                       logisticDetails.allDrivers = data.allDrivers && data.allDrivers;
                                                                                                                                                       logisticDetails.driverList = data.driverNameList && data.driverNameList;
                                                                                                                                                       logisticDetails.allVehClass = data.allVehClass && data.allVehClass;
                                                                                                                                                       logisticDetails.vehClassList = data.vehClassDescList && data.vehClassDescList;
                                                                                                                                                       logisticDetails.fromTime = data.fromTime && data.fromTime.length > 1 ? (data.fromTime).split(" ") : data.fromTime;
                                                                                                                                                       logisticDetails.toTime = data.toTime && data.toTime.length > 1 ? (data.toTime).split(" ") : data.toTime;
                                                                                                                                                       logisticDetails.availDays = data.availDays && data.availDays;


               return (<a href="#" onClick={() => this.onInfoClick(logisticDetails, doc.sdhnum, doc.xdoctyp)}>{param}
                                                                        </a> );

                                      }







                 documentBadgeLink = (docno, dtype) => {
                              const docmvt = dtype;
                              let url, content;

                              if (docmvt == '4') {
                                   url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/"+docno;
                                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                   return (
                                                            <a href={url} target='_blank' >{docno}  </a>
                                   );
                              }
                              if (docmvt == '1') {

                                       url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/"+docno;
                                      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                  return (
                                           <a href={url} target='_blank' >{docno} </a>
                                  );
                              }
                              if (docmvt == '2') {
                                   url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//"+docno;
                                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                   return (
                                                            <a href={url} target='_blank' >{docno} </a>
                                                   );
                              }
                             else {
                                                     url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//"+docno;
                                                                         // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                                                     return (
                                                                              <a href={url} target='_blank' >{docno} </a>
                                                                     );
                                                }
                          }




    isTimeRangeWithinAnotherRange = (outerStartTime, outerEndTime, innerStartTime, innerEndTime) => {
      const outerStartDate = new Date(`1970-01-01T${outerStartTime}`);
      const outerEndDate = new Date(`1970-01-01T${outerEndTime}`);
      const innerStartDate = new Date(`1970-01-01T${innerStartTime}`);
      const innerEndDate = new Date(`1970-01-01T${innerEndTime}`);

      console.log("Inner start time arvtime", innerStartDate);
      console.log("Inner end time deptime", innerEndDate);
      console.log("Outer start time fromTime", outerStartDate);
      console.log("Outer end time toTime", outerEndDate);


      return innerStartDate >= outerStartDate && innerEndDate <= outerEndDate;
    }


 GetTiminingWithinRange = (passedIndex) => {
    let acceptedProps =  this.props.tripdetails.totalObject.selectedTripData[passedIndex];
   console.log("TTTT props are", acceptedProps);
    let arrtime = acceptedProps && acceptedProps.arvtime , deptime = acceptedProps && acceptedProps.deptime, Tfromtime, Ttotime;
     let resultMatch = false, timeExist = true;

     if( acceptedProps && acceptedProps.fromTime && acceptedProps.fromTime.length > 0) {
         timeExist = false;
        Tfromtime = acceptedProps.fromTime.split(' ');
        Ttotime = acceptedProps.toTime.split(' ');

for (var ti = 0; ti < Tfromtime.length; ti++) {
  //console.log(strArray[i]);
   resultMatch =  this.isTimeRangeWithinAnotherRange(Tfromtime[ti],Ttotime[ti],arrtime,deptime);
  if(resultMatch === true)
     break;
}
     }
  //  resultMatch =  this.isTimeRangeWithinAnotherRange(fromtime,totime,arrtime,deptime);

     if(resultMatch) {
      return (
      <span className="tooltip_time1">
      <img src={ontime} height="34"/>
      <span className="tooltiptext_time1">On Time</span>
      </span>);
     }
    else if(timeExist) {
           return (<span className="tooltip_time1"><img src={ontime} height="34" />
           <span className="tooltiptext_time1">On Time</span>
           </span>);
          }
     else {
       return (<span className="tooltip_time1"><img src={notintime} style={{paddingLeft : "20%"}} />
       <span className="tooltiptext_time1">Delayed</span>
       </span>);
     }
}


  onInfoClick = (logisticData, docNum, doctype) => {
        const logisticDetails = logisticData;
        this.setState({
            addInfoShow: true,
            logisticDetails: logisticDetails,
            docNumber_1: docNum,
            doctype_1 : doctype
        });
    }

    render() {
        var lang = localStorage.getItem("lng");
        var trip = this.props.tripdetails;
        let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
            let addInfoIconClose = () => this.setState({ addInfoShow: false });
        console.log("data  =", this.props.geoData);
        let distunts;
        /*
        if (lang == "en") {
            distunts = 'Kms';
        }
        else {
            distunts = 'Kms';
        }
        */
        if(this.props.sites && this.props.sites.length > 0) {
         this.props.sites.map((site) => {
                     if (trip.depSite === site.id) {
                          distunts = site.distunit;
                         }
                })
                }


        return (
           <TabPane tabId="Transactions">
         <Card>
          <CardTitle className="float-left h4 mb-0 pt-2" style={{'color':'#5664d2', 'paddingLeft': '20px'}}>
                                          <span>Documents</span>

                                        </CardTitle>

                             <CardBody className="p-2">


                        <div className="tablheight">
                            <table className="table table-striped m-0 tablewidth1200" id="dtHorizontalVerticalExample">
                                <thead>
                                    <tr className="">

                                        <th className="mb-0 h6 text-primary"> {this.props.t('Seq')}</th>

                                        <th className="mb-0 h6 text-primary">{this.props.t('DocNum')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Status')}</th>
                                        <th className="mb-0 h6 text-primary" style={{'width':'120px'}} >{this.props.t('Arrival_Date')}<br /> {this.props.t('Time')}</th>
                                        <th className="mb-0 h6 text-primary" style={{'width':'120px'}}>{this.props.t('DepartureDate')}<br /> {this.props.t('Time')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('ServiceTime')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Client Code')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('Client')}</th>
                                        <th className="mb-0 h6 text-primary">{this.props.t('City')}</th>


                                    </tr>
                                </thead>
                                <tbody>
                                      {  trip && trip.totalObject && trip.totalObject.selectedTripData &&
                                        trip.totalObject.selectedTripData.map((doc, i) => {
                                            return (
                                                <tr class="bg-blue" key={i}>


                                                    <td><span className="LS-default">{i + 1}</span></td>

                                                    <td>{doc.docnum}</td>
                                                    <td>-</td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')}<br /> <small>{doc.arrival}</small> </td>
                                                    <td>{moment(doc.docdate).format('YYYY-MM-DD')} <br /> <small>{doc.end}</small></td>
                                                    <td>{formatTime(convertHrToSec(doc.serviceTime))}</td>
                                                    <td>{doc.bpcode}</td>
                                                    <td>{doc.bpname}</td>
                                                    <td>{doc.city}</td>

                                                </tr>
                                            )
                                        })
                                        }
                                </tbody>
                            </table>


                        </div>
                    </CardBody>
                </Card>
                 </TabPane>

        );
    }
}

export default withNamespaces()(VrStops3);