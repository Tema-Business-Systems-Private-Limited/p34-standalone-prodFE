import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import RouteIcon from '@mui/icons-material/Route';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StorageIcon from '@mui/icons-material/Storage';
import PrintIcon from '@mui/icons-material/Print';
//import RouteIcon from '@mui/icons-material/Route';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ColoredRoundElement from './ColoredRoundElement';
import Alert from './Alert';
import LVSToPickDetail from './LVS_ToPick_Detail';
import LVSPrintDetail from './LVS_Print_Detail';
import LVSAllocationDetail from './LVS_Allocation_Detail';
import Link from '@mui/material/Link';

import { IconButton } from '@mui/material';


export default function CustomizedSteppers(props) {

  const [addAlertClose, setaddAlertClose] = React.useState(true);
  const [addAlertShow, setAddAlertShow] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const [addToPickClose, setAddToPickClose] = React.useState(true);
  const [addToPickShow, setAddToPickShow] = React.useState(false);
  const [addToPrintClose, setAddToPrintClose] = React.useState(true);
  const [addToPrintShow, setAddToPrintShow] = React.useState(false);
  const [addToAllocationClose, setAddToAllocationClose] = React.useState(true);
  const [addToAllocationShow, setAddToAllocationShow] = React.useState(false);
  const print_url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXREPORT/2//M/" + props.vrdata.xnumpc;


  const AlertClose = () => {
    setErrorMessage("");
    setAddAlertShow(false);
    setaddAlertClose(true);

  }

  const ToPickClose = () => {
    setAddToPickShow(false)
    setAddToPickClose(true)
  }

  const ToPrintClose = () => {
    setAddToPrintShow(false)
    setAddToPrintClose(true)
  }

  const ToAllocationClose = () => {
    setAddToAllocationShow(false)
    setAddToAllocationClose(true)
  }

  const ToSubmitAllocation = () => {
    console.log("Inside allocation submit at workflow");
    props.SubmitforAllocation();
    setAddToAllocationShow(false)
    setAddToAllocationClose(true)
  }



  const handleMoveToStageIconClick = () => {

    setAddAlertShow(true);
    setErrorMessage("Move to Stage");


  }


  const showMessage = () => {
    window.alert("Please ensure to connect to Live on TEST Folder");
  }


  const handleRouteValidateIconClick2 = () => {
    props.createLVS();
  }


  const handleRouteValidateIconClick = () => {

    if (props.vrdata.allocationflg === 2) {
      props.createLVS();
    }
    else {

      setAddAlertShow(true);
      setErrorMessage("Complete allocation not yet for this Route, please verify");

    }

  }

  const handleRouteValidateIconClick_validated = () => {

    setAddAlertShow(true);
    setErrorMessage("Route Already Validated");

  }


  const handleAllocationIconClick = () => {
    props.ToAllocationData();
    // setAddToAllocationShow(true);


  }
  const handlePrintIconClick = () => {

    setAddToPrintShow(true);


  }
  const handleToPickIconClick = () => {
    props.ToPickData();
    // setAddToPickShow(true);
  }

  const handleLoadToTruckIconClick = () => {
    console.log("inside handleLoadToTruckIconClick")
    props.confirmLVS();

    // setAddAlertShow(true);
    // setErrorMessage("Load To Truck");


  }



  console.log("Inside Allocation LVS workflow pick ticket flag", props.pickTicketflg)
  return (




    // <>

    //   {
    //     props.onlyReceiptflg ?

    //       <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
    //         {props.selectedVrValidated ?
    //           <div style={{ textAlignLast: "center" }} >
    //             <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
    //               <RouteIcon style={{ fontSize: "34px" }} />
    //             </IconButton>
    //             <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
    //           </div>
    //           :
    //           <div style={{ textAlignLast: "center" }} >
    //             <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
    //               <RouteIcon style={{ fontSize: "34px" }} />
    //             </IconButton>
    //             <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
    //           </div>
    //         }
    //       </div>
    //       :
    //       props.pickTicketflg ?


    //         <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
    //           <div style={{ textAlignLast: "center" }} >
    //             <IconButton color="primary" aria-label="icon" onClick={handleToPickIconClick}>
    //               <GroupAddIcon style={{ fontSize: "34px" }} />
    //             </IconButton>
    //             <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>To Pick </div>
    //           </div>
    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
    //           {/* <div style={{ textAlignLast: "center" }} >
    //             <IconButton disabled="true" color="primary" aria-label="icon">
    //               <Link onClick={() => showMessage()} href={print_url} target="_blank" rel="noopener noreferrer">
    //                 <PrintIcon style={{ fontSize: "34px" }} />
    //               </Link>
    //             </IconButton>
    //             <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Print</div>
    //           </div>
    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
    //           <div style={{ textAlignLast: "center" }} >
    //             <IconButton disabled="true" color="primary" aria-label="icon" onClick={handleMoveToStageIconClick}>
    //               <StorageIcon style={{ fontSize: "34px" }} />
    //             </IconButton>
    //             <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Move to Stage </div>
    //           </div>
    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div> */}
    //           {props.vrdata.allocationflg === 2 ?
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="success" aria-label="icon" onClick={handleAllocationIconClick}>
    //                 <AssignmentTurnedInIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "green", color: "white", fontSize: "18px" }}>Allocated </div>
    //             </div>
    //             :
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="primary" aria-label="icon" onClick={handleAllocationIconClick}>
    //                 <AssignmentTurnedInIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Allocate </div>
    //             </div>
    //           }
    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
    //           {props.selectedVrValidated ?
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick}>
    //                 <RouteIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
    //             </div>
    //             :
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick}>
    //                 <RouteIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
    //             </div>
    //           }

    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
    //           {props.lvsData && props.lvsData.xstoflg === 4 ?
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton disabled="true" color="success" aria-label="icon" onClick={handleLoadToTruckIconClick}>
    //                 <LocalShippingIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}>Stock moved to Truck </div>
    //             </div>

    //             :

    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="primary" aria-label="icon" onClick={handleLoadToTruckIconClick}>
    //                 <LocalShippingIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Load to Truck</div>
    //             </div>

    //           }
    //         </div>

    //         :

    //         <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
    //           {props.selectedVrValidated ?
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
    //                 <RouteIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
    //             </div>
    //             :
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
    //                 <RouteIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
    //             </div>
    //           }
    //           <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
    //           {props.lvsData && props.lvsData.xstoflg === 4 ?
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton disabled="true" color="success" aria-label="icon" onClick={handleLoadToTruckIconClick}>
    //                 <LocalShippingIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}>Stock moved to Truck </div>
    //             </div>

    //             :
    //             <div style={{ textAlignLast: "center" }} >
    //               <IconButton color="primary" aria-label="icon" onClick={handleLoadToTruckIconClick}>
    //                 <LocalShippingIcon style={{ fontSize: "34px" }} />
    //               </IconButton>
    //               <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Load to Truck </div>
    //             </div>

    //           }
    //         </div>
    //   }



    //   <Alert
    //     show={addAlertShow}
    //     onHide={AlertClose}
    //     errorMessage={ErrorMessage}
    //   ></Alert>
    //   <LVSToPickDetail
    //     show={addToPickShow}
    //     onHide={ToPickClose}
    //     vrdata={props.vrdata}
    //     toPickDataList={props.toPickDataList}

    //   ></LVSToPickDetail>
    //   <LVSPrintDetail
    //     show={addToPrintShow}
    //     onHide={ToPrintClose}
    //     vrdata={props.vrdata}
    //     lvsData={props.lvsData}

    //   ></LVSPrintDetail>
    //   <LVSAllocationDetail
    //     show={addToAllocationShow}
    //     onHide={ToAllocationClose}
    //     vrdata={props.vrdata}
    //     toAllocationDataList={props.toAllocationDataList}
    //     SubmitforAllocation={ToSubmitAllocation}

    //   ></LVSAllocationDetail>
    // </>

    <>

    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {props.selectedVrValidated ?
          <div style={{ textAlignLast: "center" }} >
            <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
              <RouteIcon style={{ fontSize: "34px" }} />
            </IconButton>
            <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
          </div>
          :
          <div style={{ textAlignLast: "center" }} >
            <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
              <RouteIcon style={{ fontSize: "34px" }} />
            </IconButton>
            <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
          </div>
        }

        <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
        {props.lvsData && props.lvsData.xstoflg === 4 ?
          <div style={{ textAlignLast: "center" }} >
            <IconButton disabled="true" color="success" aria-label="icon" onClick={handleLoadToTruckIconClick}>
              <LocalShippingIcon style={{ fontSize: "34px" }} />
            </IconButton>
            <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}>Truck Load Completed </div>
          </div>
          :
          <div style={{ textAlignLast: "center" }} >
            <IconButton color="primary" aria-label="icon" onClick={handleLoadToTruckIconClick}>
              <LocalShippingIcon style={{ fontSize: "34px" }} />
            </IconButton>
            <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Load to Truck </div>
          </div>

        }
      </div>

{/* 
    {
      props.onlyReceiptflg ?

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {props.selectedVrValidated ?
            <div style={{ textAlignLast: "center" }} >
              <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                <RouteIcon style={{ fontSize: "34px" }} />
              </IconButton>
              <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
            </div>
            :
            <div style={{ textAlignLast: "center" }} >
              <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                <RouteIcon style={{ fontSize: "34px" }} />
              </IconButton>
              <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
            </div>
          }
        </div>
        :

        props.pickTicketflg ?

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlignLast: "center" }} >
              <IconButton color="primary" aria-label="icon" onClick={handleToPickIconClick}>
                <GroupAddIcon style={{ fontSize: "34px" }} />
              </IconButton>
              <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>To Pick </div>
            </div>
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            <div style={{ textAlignLast: "center" }} >
              <IconButton color="primary" aria-label="icon">
                <Link onClick={() => showMessage()} href={print_url} target="_blank" rel="noopener noreferrer">
                  <PrintIcon style={{ fontSize: "34px" }} />
                </Link>
              </IconButton>
              <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Print</div>
            </div>
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            <div style={{ textAlignLast: "center" }} >
              <IconButton disabled="true" color="primary" aria-label="icon" onClick={handleMoveToStageIconClick}>
                <StorageIcon style={{ fontSize: "34px" }} />
              </IconButton>
              <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Move to Stage </div>
            </div>
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            {props.vrdata.allocationflg === 2 ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="success" aria-label="icon" onClick={handleAllocationIconClick}>
                  <AssignmentTurnedInIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", color: "white", fontSize: "18px" }}>Allocated </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleAllocationIconClick}>
                  <AssignmentTurnedInIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Allocate </div>
              </div>
            }
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            {props.selectedVrValidated || props.lvsData && props.lvsData.vcrnum && props.lvsData.vcrnum.length > 5 ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="success" aria-label="icon" onClick={handleRouteValidateIconClick_validated}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
              </div>
            }
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            {props.lvsData && props.lvsData.xstoflg === 4 ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton disabled="true" color="success" aria-label="icon" onClick={handleLoadToTruckIconClick}>
                  <LocalShippingIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}>Truck Load Completed </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleLoadToTruckIconClick}>
                  <LocalShippingIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Load to Truck </div>
              </div>

            }
          </div>

          :
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {props.selectedVrValidated ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton disabled="true" color="success" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "green", 'color': 'white', fontSize: "18px" }}> Validated </div>
              </div>
              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleRouteValidateIconClick2}>
                  <RouteIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Route Validation </div>
              </div>
            }
            <div className="arrow" style={{ fontSize: "34px", color: "blue" }}>→</div>
            {props.lvsData && props.lvsData.xstoflg === 4 ?
              <div style={{ textAlignLast: "center" }} >
                <IconButton disabled="true" color="success" aria-label="icon" onClick={handleLoadToTruckIconClick}>
                  <LocalShippingIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Stock moved to Truck </div>
              </div>

              :
              <div style={{ textAlignLast: "center" }} >
                <IconButton color="primary" aria-label="icon" onClick={handleLoadToTruckIconClick}>
                  <LocalShippingIcon style={{ fontSize: "34px" }} />
                </IconButton>
                <div style={{ backgroundColor: "lightgrey", fontSize: "18px" }}>Load to Truck </div>
              </div>

            }
          </div>

    } */}

    
    <Alert
      show={addAlertShow}
      onHide={AlertClose}
      errorMessage={ErrorMessage}
    ></Alert>
    <LVSToPickDetail
      show={addToPickShow}
      onHide={ToPickClose}
      vrdata={props.vrdata}
      toPickDataList={props.toPickDataList}

    ></LVSToPickDetail>
    <LVSPrintDetail
      show={addToPrintShow}
      onHide={ToPrintClose}
      vrdata={props.vrdata}
      lvsData={props.lvsData}

    ></LVSPrintDetail>
    <LVSAllocationDetail
      show={addToAllocationShow}
      onHide={ToAllocationClose}
      vrdata={props.vrdata}
      toAllocationDataList={props.toAllocationDataList}
      SubmitforAllocation={ToSubmitAllocation}

    ></LVSAllocationDetail>
  </>
  );
}
