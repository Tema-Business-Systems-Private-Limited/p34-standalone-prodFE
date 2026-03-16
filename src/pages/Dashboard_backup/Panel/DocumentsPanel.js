import React from 'react';
import Drops3 from './Drops3';
import Pickups3 from './Pickups3';
import Frequency from './Frequency';
import moment from 'moment';
import 'moment-timezone';
import { withNamespaces } from 'react-i18next';
import { AgGridReact } from "ag-grid-react";
import Checkbox from '@mui/material/Checkbox';
import ReactFullscreen from 'react-easyfullscreen';
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
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import classnames from "classnames";
class DocumentsPanel extends React.Component {

 constructor(props) {
        super(props);
         this.state = {
              activeTab: "Drops",
              ToPlanchecked : false,
              Todayschecked : false
              }
          this.toggleTab = this.toggleTab.bind(this);
    }



    dayscheckBoxChange = () => {
       console.log("T222 docpanel - dayscheckbox change");
       this.setState({ Todayschecked: !this.props.daysCheckedIn });
       this.props.checked5days(!this.props.daysCheckedIn)

    }


      checkBoxChange = () => {
       console.log("T224 docpanel - to plan change");
                  this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
                  this.props.checkedToPlan(!this.state.ToPlanchecked)
              }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }





  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var timeLineContainer = document.querySelector(".timeline-container");
    var dropZone = {
      getContainer: function () {
        return timeLineContainer;
      },
      onDragStop: function (params) {
        const el = document.querySelector(".timeline-data");
        el.classList.remove("d-none");
        // var el = document.createElement("div");
        // el.classList.add("tile");
        // el.innerHTML =
        //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
        // timeLineContainer.appendChild(el);
      },
    };
    params.api.addRowDropZone(dropZone);
  }

toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

    render() {
     const site = this.props.deliverySite;
    console.log("T6 inside docpanel - flag",this.props.daysCheckedIn)
 //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
 const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
 console.log("T222 curr date =",currDate);


     let filterDrops;
     let filterPickups;
 if(this.props.dropsPanel && (this.props.dropsPanel.drops ||this.props.dropsPanel.pickUps)){
            filterDrops = this.props.dropsPanel.drops.filter(
                (drop) => {
                 if(this.state.ToPlanchecked)
                 {

                      return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && !this.props.selectedDocuments.includes(drop.docnum) );
                    }


                    if(site === ""){
                      return ((drop.docnum.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.netweight).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.volume).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1));

                    }
                    else {
                       return (((drop.docnum.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.netweight).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.volume).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)) && (drop.site === site));

                    }
                }
            );


        if(this.props.selectedRouteCodeArr.length > 0) {
               let SelectedRouteCodes = this.props.selectedRouteCodeArr;
                 filterDrops = filterDrops.filter(
                         (drop) =>  {
             return ( SelectedRouteCodes.includes(drop.routeCode));
                                  }
                                           );
                    }



            filterPickups = this.props.dropsPanel.pickUps.filter(
                (pickup) => {
                    if(this.state.ToPlanchecked)
                                    {

                                         return ((pickup.type === 'open') && (pickup.dlvystatus === '0' || pickup.dlvystatus === '8') && !this.props.selectedDocuments.includes(pickup.docnum));
                                       }
                                     if(site == '') {
                                                       return ((pickup.docnum.indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (pickup.bpcode.toLowerCase().indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (pickup.bpname.toLowerCase().indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (pickup.doctype.toLowerCase().indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (pickup.poscode.toLowerCase().indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (String(pickup.netweight).indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1) || (String(pickup.volume).indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1)  || (pickup.type.toLowerCase().indexOf(
                                                           this.props.searchPck.toLowerCase()
                                                       ) !== -1));
                                                       }
                                                       else {
                                                       return (((pickup.docnum.indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (pickup.bpcode.toLowerCase().indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (pickup.bpname.toLowerCase().indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (pickup.doctype.toLowerCase().indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (pickup.poscode.toLowerCase().indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (String(pickup.netweight).indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1) || (String(pickup.volume).indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1)  || (pickup.type.toLowerCase().indexOf(
                                                                               this.props.searchPck.toLowerCase()
                                                                           ) !== -1)) && (pickup.site === site));
                                                       }
                                   }
            );
        }


        return (
<div >
                <ReactFullscreen>
                 {({ ref, onToggle }) => (
             <div ref={ref} style={{ width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 12
             }}>
       <Card className="mb-3">
                         <CardBody className="p-2">
                           <div className="d-flex justify-content-between align-items-center">
                             <Nav tabs className="nav-tabs-custom nav-justified">
                                                           <NavItem>
                                                             <NavLink
                                                               style={{ cursor: "pointer" }}
                                                               className={classnames({
                                                                 active: this.state.activeTab === "Drops",
                                                               })}
                                                               onClick={() => {
                                                                 this.toggleTab("Drops");
                                                               }}
                                                             >
                                                               <span>{this.props.t('Drops')}</span>
                                                             </NavLink>
                                                           </NavItem>
                                                           <NavItem>
                                                             <NavLink
                                                               style={{ cursor: "pointer" }}
                                                               className={classnames({
                                                                 active: this.state.activeTab === "Pickups",
                                                               })}
                                                               onClick={() => {
                                                                 this.toggleTab("Pickups");
                                                               }}
                                                             >
                                                               <span>{this.props.t('Pickups')}</span>
                                                             </NavLink>
                                                           </NavItem>
                                                           <NavItem>
                                                                                                                        <NavLink
                                                                                                                          style={{ cursor: "pointer" }}
                                                                                                                          className={classnames({
                                                                                                                            active: this.state.activeTab === "Frequency",
                                                                                                                          })}
                                                                                                                          onClick={() => {
                                                                                                                            this.toggleTab("Frequency");
                                                                                                                          }}
                                                                                                                        >
                                                                                                                          <span>{this.props.t('Frequency')}</span>
                                                                                                                        </NavLink>
                                                                                                                      </NavItem>
                                                         </Nav>
                             <div className="d-flex align-items-center">
                               <div className="custom-control mb-0 mr-4">
                               <Checkbox  color="primary"
                                  onChange = {this.dayscheckBoxChange}
                                  checked = {this.props.daysCheckedIn}/>
                               <Label

                                  onClick={() => {
                                                                                                      this.setState({
                                                                                                        Todayschecked: !this.state.Todayschecked,
                                                                                                      });
                                                                                                    }}
                                                                                                  >
                                                                                                    {this.props.t('+/- 5days')}
                                </Label>
                                </div>
                               <div className="d-inline-block"  style ={{paddingRight: '40px' ,alignSelf: 'center'}} >
                               <button style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '20%', marginLeft: '20%' }}
                                    onClick = {() => this.props.changeDate(0,'','buttons')}
                                                                  >
                                                                   {this.props.t('Update')}
                               </button>
                               </div>

                               <div className="custom-control custom-checkbox mb-2 mr-3">
                                 <Input
                                   type="checkbox"
                                   className="custom-control-input"
                                   onChange = {()=>this.checkBoxChange()}
                                   checked={this.state.ToPlanchecked}
                                 />
                                 <Label
                                   className="custom-control-label"
                                   onClick={() => {
                                     this.setState({
                                       ToPlanchecked: !this.state.ToPlanchecked,
                                     });
                                   }}
                                 >
                                   {this.props.t('ToPlan')}
                                 </Label>
                               </div>
                               <div className="d-inline-block">
                                 <ButtonGroup className="mb-2">
                                   <Button
                                     size="sm"
                                     color="primary"
                                     active
                                     type="button"
                                     onClick = {() => this.props.changeDate(-1,'','buttons') }
                                   >
                                     <i className="ri-arrow-left-s-line"></i>
                                   </Button>
                                   <Button
                                     size="sm"
                                     color="light"
                                     outline
                                     type="button"
                                   >
                                    {currDate}
                                   </Button>
                                   <Button
                                     size="sm"
                                     color="primary"
                                     active
                                     type="button"
                                     onClick = {() => this.props.changeDate(1,'','buttons')}
                                   >
                                     <i className="ri-arrow-right-s-line"></i>
                                   </Button>
                                 </ButtonGroup>




                                 <OpenInFullIcon style={{color:'grey'}} onClick={() => onToggle()} />
                               </div>
                             </div>
                           </div>
                           <hr className="my-0" />
                            <TabContent activeTab={this.state.activeTab}>
                             <Drops3
                             dropsList={filterDrops}
                             dayschecked = {this.props.daysCheckedIn}
                             updateDropSearchTerm= {this.props.updateDropSearchTerm}
                             sortDrop= {this.props.sortDrop}
                             dropOrder = {this.props.dropOrder}
                             currDate = {this.props.selectedDate}
                             selectedDocuments = {this.props.selectedDocuments}
                             handleDragStart = {this.props.handleDragStart}/>
                             <Pickups3
                             curPickupList={filterPickups}
                             dayschecked = {this.props.daysCheckedIn}
                             updatePickupSearchTerm = {this.props.updatePickupSearchTerm}
                              sortPickup = {this.props.sortPickup}
                             pickOrder = {this.props.pickOrder}
                             selectedDocuments = {this.props.selectedDocuments}
                              currDate = {this.props.selectedDate}
                             handleDragStart = {this.props.handleDragStart}/>
                              <Frequency
                                                          dropsList={filterDrops}
                                                          dayschecked = {this.props.daysCheckedIn}
                                                          updateDropSearchTerm= {this.props.updateDropSearchTerm}
                                                          sortDrop= {this.props.sortDrop}
                                                          dropOrder = {this.props.dropOrder}
                                                          currDate = {this.props.selectedDate}
                                                          selectedDocuments = {this.props.selectedDocuments}
                                                          handleDragStart = {this.props.handleDragStart}/>
                            </TabContent>
                         </CardBody>
                       </Card>
                       </div>
                   )}
                          </ReactFullscreen>
                          </div>
        );
    }
}

export default withNamespaces()(DocumentsPanel);