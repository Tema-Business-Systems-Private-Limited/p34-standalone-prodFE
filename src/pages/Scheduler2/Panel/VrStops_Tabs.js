import React from 'react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';
import ProductsDetailList from './ProductsDetailList';
import VrStops3 from './VrStops3';
import classnames from "classnames";
import IndividualRouteMap2 from './IndividualRouteMap2';

import { convertHrToSec, formatTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
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

class VrStopsTabs extends React.Component {
     constructor(props) {
            super(props);
            this.state = {
                ShowDetailList : false,
                activeTab: "Transactions",


         }
          this.toggleTab = this.toggleTab.bind(this);
         }

toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }



    render() {
        return (

               <div class="vrstopsPanel">
                        <div className="d-flex justify-content-between align-items-center">
                                     <Nav tabs className="nav-tabs-custom nav-justified">
                                                                   <NavItem>
                                                                     <NavLink
                                                                       style={{ cursor: "pointer" }}
                                                                       className={classnames({
                                                                         active: this.state.activeTab === "Transactions",
                                                                       })}
                                                                       onClick={() => {
                                                                         this.toggleTab("Transactions");
                                                                       }}
                                                                     >
                                                                       <span style={{fontWeight : "bolder", fontSize: "large"}}>{this.props.t('Transactions')}</span>
                                                                     </NavLink>
                                                                   </NavItem>
                                                                   <NavItem>
                                                                      <NavLink
                                                                                                                                  style={{ cursor: "pointer" }}
                                                                                                                                  className={classnames({
                                                                                                                                    active: this.state.activeTab === "VRMaps",
                                                                                                                                  })}
                                                                                                                                  onClick={() => {
                                                                                                                                    this.toggleTab("VRMaps");
                                                                                                                                  }}
                                                                                                                                >
                                                                                                                                  <span style={{fontWeight : "bolder", fontSize: "large"}}>{this.props.t('Maps')}</span>
                                                                                                                                </NavLink>
                                                                                                                              </NavItem>
                                                                 </Nav>
                                     {this.state.activeTab === 'Transactions' ?
                                     <div className="d-flex align-items-center">


                                     </div>
         :
         <div className="d-flex align-items-center">
                             </div>
         }
                                   </div>

                                   <hr className="my-0" />
                                    <TabContent className="xl-tabcontent1" activeTab={this.state.activeTab}>
                                     <VrStops3
                                        vedetail={this.props.vedetail}
                                                               tripdetails={this.props.tripdetails}
                                                                sites={this.props.sites}
                                                                   vehiclePanel={this.props.vehiclePanel}

                                     />
                                     <IndividualRouteMap2
                                       vrdata={this.props.vrlist}
                                                                                  markers={this.props.markers}
                                                                                  tripsList={this.props.tripsList}
                                                                                  siteDetails={this.props.siteDetails}
                                                                                  sites={this.props.sites}
                                                                                  bl_tripsList = {this.props.bl_tripsList}
                                                                                  bl_markers = {this.props.bl_markers}
                                                                                  triplock = {this.props.triplock}
                                                                  />

                                    </TabContent>

                               </div>

        );
    }
}

export default withNamespaces()(VrStopsTabs);