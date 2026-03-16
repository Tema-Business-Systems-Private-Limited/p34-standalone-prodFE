import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from "reactstrap";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Home from './Home';
import UserCostCapture from './UserCostCapture';
import EquipmentDetails from './EquipmentDetails';
import Notes from './Notes';
import Inspection from './Inspection';

import { fetchLVSHeaderAndDetails } from '../../../service';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
   const [lvsHeader, setlvsHeader] = useState(null)
   const [lvsDetails, setlvsDetails] = useState(null)

   console.log("T555 at Tabindex");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const  getLVSDetail = (orderId) => {
    console.log("inside lvs - detail screen")
     const selVR_num = orderId;
       fetchLVSHeaderAndDetails(selVR_num)
           .then(([res1, res2]) => {
               setlvsDetails(res2)
               setlvsHeader(res1)

           }).then(() => {
           }).catch(error => {
           //  history.push('/');
           });

  }


  useEffect(() => {
    console.log("T555 inside useeffect");
    const orderId = props.match.params.id
    if (orderId) {
      getLVSDetail(orderId)
    }
  }, [props])





  return (
      <Card>

      <CardContent>
      <Box sx={{ width: '100%', marginTop : '100px', marginLeft : '20px' }}>
      <div style={{ display : "flex", justifyContent : "space-between"}}>
               <h4> Load/Unload Vehicle Stock </h4>
               <div style={{ display : "flex", justifyContent : "space-between", marginRight : "30px"}}>
               <Button color="primary" style={{ marginLeft : "20px", marginRight : "20px"}}>Confirm</Button>
               <Button color="success" style={{ marginLeft : "20px", marginRight : "20px"}}>Inventory Validation</Button>
               <Button color="warning" style={{ marginLeft : "20px", marginRight : "20px"}}>UnLoad Vehicle</Button>
               </div>

           </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="User Cost Capture" {...a11yProps(1)} />
          <Tab label="Equipment Details" {...a11yProps(2)} />
          <Tab label="Note" {...a11yProps(3)} />
          <Tab label="Inspection" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {lvsHeader &&
          <Home
         lvsHeader = {lvsHeader}
         lvsDetails = {lvsDetails}/>

        }
          </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserCostCapture lvsHeader = {lvsHeader} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EquipmentDetails lvsHeader = {lvsHeader} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
         <Notes />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
               <Inspection />
            </CustomTabPanel>
    </Box>
    </CardContent>
    </Card>
  );
}