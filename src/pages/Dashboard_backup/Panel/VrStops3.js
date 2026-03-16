import React from 'react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';
import { convertHrToSec, formatTime, nullAndNanChecking, tConvert } from '../converterFunctions/converterFunctions';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Col,
    Container,
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

    GetDeliveryStatus = (x) => {

        switch (x) {
            case '1': return ("Scheduled");
            case '2': return ("On the Way");
            case '3': return ("In-progress");
            case '4': return ("Completed");
            case '5': return ("Skipped");
            case '6': return ("Re-Scheduled");
            case '7': return ("Cancelled");
            case '8': return ("To-Plan");
            default: return ("default");
        }
    }


    GetPickTicketStatus = (x, doctype) => {

        if (doctype == "4") {
            switch (x) {
                case '1': return ("In Process");
                case '2': return ("Delivarable");
                case '3': return ("Delivered");
                case '4': return ("Cancelled");
            }
        }
        else {
            return '';
        }
    }


    displayBadge = (type, iSeq) => {
        const docmvt = type
        const Seq = iSeq;
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
        else {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
    }


    documentBadgeLink = (docno, dtype) => {
        const docmvt = dtype;
        let url, content;

        if (docmvt == '4') {
            url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank' >{docno}  </a>
            );
        }
        if (docmvt == '1') {

            url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank' >{docno} </a>
            );
        }
        if (docmvt == '2') {
            url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank' >{docno} </a>
            );
        }
        else {
            url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//" + docno;
            // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
            return (
                <a href={url} target='_blank' >{docno} </a>
            );
        }
    }


    render() {
        var lang = localStorage.getItem("i18nextLng");
        var trip = this.props.tripdetails;
        console.log("trip", trip)
        console.log("this.props.vedetail", this.props.vedetail)
        let distunts;
        /*
        if (lang == "en") {
            distunts = 'Kms';
        }
        else {
            distunts = 'Kms';
        }
        */
        if (this.props.sites && this.props.sites.length > 0) {
            this.props.sites.map((site) => {
                if (trip.depSite === site.id) {
                    console.log("2 site matched");
                    distunts = site.distunit;
                }
            })
        }


        return (
            <Card>
                <CardTitle className="float-left h4 mb-0 pt-2" style={{ 'color': '#5664d2', 'paddingLeft': '20px' }}>
                    Transactions
                </CardTitle>
                <CardBody className="p-2">


                    <div className="tablheight">
                        <table className="table table-striped m-0 tablewidth1200" id="dtHorizontalVerticalExample">
                            <thead>
                                <tr className="">
                                    <th></th>
                                    <th> {this.props.t('Seq')}</th>
                                    <th>{this.props.t('DocNum')}</th>
                                    <th>{this.props.t('Site')}</th>
                                    <th>{this.props.t('Status')}</th>
                                    <th>{this.props.t('Pick Ticket Status')}</th>
                                    <th style={{ 'width': '120px' }} >{this.props.t('Arrival_Date')}<br /> {this.props.t('Time')}</th>
                                    <th style={{ 'width': '120px' }}>{this.props.t('DepartureDate')}<br /> {this.props.t('Time')}</th>
                                    <th>{this.props.t('ServiceTime')}</th>
                                    <th>{this.props.t('Client Code')}</th>
                                    <th>{this.props.t('Client')}</th>
                                    <th>{this.props.t('City')}</th>
                                    <th>{this.props.t('FromPrevDistance')}</th>
                                    <th>{this.props.t('FromPrevTravelTime')}</th>
                                    <th>{this.props.t('WaitingTime')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trip.lock ?
                                    (this.props.vedetail || []).map((doc, i) => (
                                        <tr class="bg-blue" key={i}>
                                            <td ></td>
                                            <td><span className="LS-default">{this.displayBadge(doc.xdoctyp, doc.sequence -1)}</span></td>
                                            <td>{this.documentBadgeLink(doc.sdhnum, doc.xdoctyp)}</td>
                                            <td>{doc.xdocSite}</td>
                                            <td>{this.GetDeliveryStatus(doc.xdlv_status)}</td>
                                            <td>{this.GetPickTicketStatus(doc.pickTcktStatus, doc.xdoctyp)} </td>
                                            <td>{moment(doc.arrivedate).format('MM-DD-YYYY')}<br /> <small>{tConvert(doc.arvtime)}</small> </td>
                                            <td>{moment(doc.departdate).format('MM-DD-YYYY')} <br /> <small>{tConvert(doc.departtime)}</small></td>
                                            <td>{doc.servicetim}</td>
                                            <td>{doc.bpcord}</td>
                                            <td>{doc.bprnam}</td>
                                            <td>{doc.cty}</td>
                                            <td>{Math.round(doc.fromprevDist) + ' ' + distunts}</td>
                                            <td>{formatTime(convertHrToSec(doc.fromprevTra))}</td>
                                            <td>{formatTime(convertHrToSec(doc.ywaitTime))}</td>
                                        </tr>
                                    )) :
                                    trip && trip.totalObject && trip.totalObject.selectedTripData &&
                                    trip.totalObject.selectedTripData.map((doc, i) => {
                                        console.log("doccccc", doc)
                                        return (
                                            <tr class="bg-blue" key={i}>
                                                <td ></td>
                                                <td><span className="LS-default">{i + 1}</span></td>
                                                <td>{doc.docnum}</td>
                                                <td>{doc.site}</td>
                                                <td></td>
                                                <td>{moment(doc.docdate).format('MM-DD-YYYY')}<br /> <small>{doc.arrival}</small> </td>
                                                <td>{moment(doc.docdate).format('MM-DD-YYYY')} <br /> <small>{doc.end}</small></td>
                                                <td>{doc.serTime}</td>
                                                <td>{doc.bpcode}</td>
                                                <td>{doc.bpname}</td>
                                                <td>{doc.cty}</td>
                                                <td>{Math.round(doc.distance) + ' ' + distunts}</td>
                                                <td>{formatTime(convertHrToSec(doc.time))}</td>
                                                <td>{formatTime(convertHrToSec(doc.waitingTime))}</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

        );
    }
}

export default withNamespaces()(VrStops3);