import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AutoOptimizationPopup = (props) => {
  //   const [isOpen, setIsOpen] = useState(props.modalState);

  //   useEffect(() => {
  //     setIsOpen(props.show);
  //   }, [props]);

  // State to manage the selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const [propsDocumentList, setPropsDocumentList] = useState([]);
  //   for documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  console.log(selectedItems, "selected items using checkbox");
  console.log(selectedDocuments, "selected documents using checkbox");

  // Function to toggle selection of an item
  const toggleSelect = (item) => {
    const selectedIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.codeyve === item.codeyve
    );

    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems = newSelectedItems.filter(
        (selectedItem) => selectedItem.codeyve !== item.codeyve
      );
    }

    setSelectedItems(newSelectedItems);
  };

  //   for documents

  const toggleSelectDocument = (item) => {
    const selectedIndex = selectedDocuments.findIndex(
      (selectedItem) => selectedItem.docnum === item.docnum
    );

    let newSelectedDocuments = [...selectedDocuments];

    if (selectedIndex === -1) {
      newSelectedDocuments.push(item);
    } else {
      newSelectedDocuments = newSelectedDocuments.filter(
        (selectedItem) => selectedItem.docnum !== item.docnum
      );
    }

    setSelectedDocuments(newSelectedDocuments);
  };

  // Function to handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems([...props.vehicles]);
    } else {
      setSelectedItems([]);
    }
  };



    // Function to handle select all
 // Function to handle select all
   const handleSelectAllDocuments = (e) => {
     if (e.target.checked) {
       setSelectedDocuments([...filteredDropsPanel]);
     } else {
       setSelectedDocuments([]);
     }
   };

  //   console.log(props.dropsPanel, "all documents")

  const filteredDropsPanel = propsDocumentList.filter(
    (item) => ((item.type === 'open') && (item.dlvystatus === '0' || item.dlvystatus === '8'))
  );

  //clear all selection from input checkboxes


  const clearSelections = () =>{
   setSelectedItems([]);
setSelectedDocuments([])
  }


  const generateRoutefromSelections = () =>{
     console.log("data from selection");

      console.log("data from selection- vehicles", selectedItems);
      console.log("data from selection", selectedDocuments);
     props.autofromselection(selectedDocuments,selectedItems)
     props.openPopupAuto(false);
      setSelectedItems([]);
     setSelectedDocuments([])
  }

  console.log(props.modalState, "this is state from index");
  console.log(props.vehicles, "all vehicles");

  console.log(filteredDropsPanel, "this is filtered data");


    useEffect(() => {
      let docsPanel = [];
   if(props.dropsPanel && (props.dropsPanel.drops.length > 0 || props.dropsPanel.pickUps.length > 0)) {
      for(let jj=0 ; jj< props.dropsPanel.drops.length ; jj++) {
              let doc = props.dropsPanel.drops[jj];
              docsPanel.push(doc);
              }

         for(let jk=0 ; jk< props.dropsPanel.pickUps.length ; jk++) {
                 let doc = props.dropsPanel.pickUps[jk];
                    docsPanel.push(doc);
                 }
 setPropsDocumentList(docsPanel);
 }
   }, [props])



  return (
    <Dialog
      onClose={() => this.props.openPopupAuto(false)}
      open={props.modalState}
      disableEscapeKeyDown={true}
      // style={{width:"100%"}}
      maxWidth="xl"
      // PaperComponent={StyledPaper}
      //   Width="xl"
      // fullWidth

      PaperProps={{
        sx: {
          width: "80%",
          // maxWidth: "1500px!important",
        },
      }}
    >
      <DialogTitle>
        {" "}
        <Typography
          variant="h4"
          style={{
            backgroundColor: "#0275d8",
            color: "white",
            paddingLeft: "10px",
          }}
        >
          Choose Vehicles and Documents for Auto Route Generate
        </Typography>
      </DialogTitle>
      <DialogContent>
        <>
          <Card>
            {/* <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                BASIC INFO
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              {/* this is heding of table */}
              <Row style={{ border: "1px solid black" }}>
                <Col
                  className="p-3"
                  md="6"
                  style={{ borderRight: "1px solid black" }}
                >
                  {/* this is heading  */}
                  <Row>
                    <Col>
                      <h5 className="text-center">Vehicles</h5>
                    </Col>

                  </Row>
                </Col>

                <Col md="6" className="p-3">
                  {/* this is heading */}
                  <Row style={{backgroundColor : "#f1f5f7"}}>
                    <Col>
                      <h5 className="text-center" >Documents</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ border: "1px solid black", borderTop: 0 }}>
                <Col
                  md="6"
                  className="text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <Row className="">
                    <table className="w-100 table-striped">
                      <thead>
                        <tr
                          className="text-center"
                          style={{ height: "50px", backgroundColor : "#9396a4" }}
                        >
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={
                                selectedItems.length === props.vehicles.length
                              }
                            />
                          </th>
                          <th>VEHICLE CODE</th>
                          <th>VEHICLE NAME</th>
                          <th>DRIVER NAME</th>
                          <th>DRIVER ID</th>
                        </tr>
                      </thead>
                      <tbody className="mt-3 table-striped">
                        {props.vehicles &&
                          props.vehicles.map((item, index) => (
                            <tr
                              key={index}
                              className="text-center"

                            >
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={() => toggleSelect(item)}
                                  checked={selectedItems.some(
                                    (selectedItem) =>
                                      selectedItem.codeyve === item.codeyve
                                  )}
                                />
                              </td>
                              <td>{item.codeyve}</td>
                              <td>{item.name}</td>
                              <td>
                                {item.drivername ? item.drivername : "---"}
                              </td>
                              <td>{item.driverid ? item.driverid : "---"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Row>
                </Col>
                <Col md="6">
                  {/* these are documents */}
                  <Row className="">
                    <table className="w-100 table-striped">
                      <thead>
                        <tr
                          className="text-center"
                          style={{ height: "50px" , backgroundColor : "#9396a4"}}
                        >
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleSelectAllDocuments}
                              checked={
                                                              selectedDocuments.length === filteredDropsPanel.length
                                                            }
                            />
                          </th>
                          <th>DOCUMENT NUMBER</th>
                          <th>DATE</th>
                          <th>ROUTE STATUS</th>
                          <th>DOCUMENT TYPE</th>
                          <th>SITE</th>
                        </tr>
                      </thead>
                      <tbody className="mt-3">
                        {filteredDropsPanel &&
                          filteredDropsPanel.map((item, index) => (
                            <tr
                              key={index}
                              className="text-center"

                            >
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={() => toggleSelectDocument(item)}
                                  checked={selectedDocuments.some(
                                    (selectedItem) =>
                                      selectedItem.docnum === item.docnum
                                  )}
                                />
                              </td>
                              <td>{item.docnum}</td>
                              <td>
                                {" "}
                                {moment
                                  .tz(item.docdate, "")
                                  .format("MM-DD-YYYY")}
                              </td>
                              <td>{item.routeStatus}</td>
                              <td>{item.routeTag}</td>
                              <td>{item.site}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearSelections} className="badge badge-secondary" variant="contained">
          CLEAR
        </Button>
        <Button onClick={generateRoutefromSelections} className="badge badge-success" variant="contained">
          SUBMIT
        </Button>

        <Button
          className="badge badge-primary"
          onClick={() => props.openPopupAuto(false)}
          variant="contained"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutoOptimizationPopup;
