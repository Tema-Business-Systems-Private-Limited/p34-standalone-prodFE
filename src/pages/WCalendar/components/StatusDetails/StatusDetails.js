// import React, { Fragment } from "react";
// import moment from "moment";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import Imagecard from "../Imagecard";
// import StatusCard from "./StatusCard";
// import mockData from "./mockData.json";
// import { getFullDate } from "../../foramatterFunctions";
// import { Table } from "reactstrap";
// import { Alert } from "reactstrap";
// import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //     display: 'flex',
//   //     flexDirection: 'row',
//   //     width: '100%',
//   //     padding: 4,
//   //     marginTop: 16,
//   //     background: "white",
//   //     justifyContent: "space-between"
//   // },
//   headerContent: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   body2: {
//     color: "#2C3A3D",
//     fontWeight: 600,
//     fontSize: 12,
//     fontFamily: "SF Pro Display",
//   },
//   divheader: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#2C3A3D",
//     height: 48,
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   divider: {
//     width: 2,
//     // backgroundColor: "#707070"'
//   },

//   itemText: {
//     color: "white",
//     fontWeight: 500,
//     // backgroundColor:"red"
//   },
// }));

// export default function StatusDetails(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   let dates = [];
//   var from = new Date(props.weekStartDate);
//   console.log("weekStartDate==>", props.weekStartDate);
//   console.log("weekStartDate==> from", from);
//   var to = new Date(props.weekEndDate);
//   console.log("weekStartDate==>end", props.weekEndDate);
//   console.log("weekStartDate==>to ", to);
//   for (var day = from; day < to; day.setDate(day.getDate() + 1)) {
//     console.log("weekStartDate==>day ", day);
//     dates.push(new Date(day));
//   } 





//   let vehicleList = [...new Set(props.tripDetails?.map((item) => item.code))];
//   console.log("weekStartDate==>dates ", dates);
//   return (
//     <div>
//       <Table bordered className="mt-3">
//   <thead className="bg-secondary text-white">
//     <tr>
//       <th>Vehicle/Week</th>
//       {dates &&
//         dates.length > 0 &&
//         dates.slice(0, 5).map((date, index) => {
//           const parseDate = new Date(Date.parse(date)).toString();
//           const SelParsedate = moment
//             .tz(parseDate, "")
//             .format("YYYY/MM/DD");
//           console.log(SelParsedate, "This is selParsedate");
//           return (
//             <th key={index} className="text-nowrap text-center">
//               {moment.tz(SelParsedate, "").format("ddd DD-MMM-YYYY")}
//             </th>
//           );
//         })}
//     </tr>
//   </thead>
//   <tbody >
//     {vehicleList.map((trip, outerIndex) => {
//       return (
//         <tr key={outerIndex}>
//           <td
//             className="border-bottom border-secondary"
//             style={{ borderRight: "1px solid #d9ddde" }}
//           >
//             <Imagecard vehicleNumber={trip} />
//           </td>
//           {props.tripDetails?.map((item, innerIndex) => {
//             if (trip === item.code) {
//               return (
//                 <td
//                   className="border-bottom border-secondary"
//                   key={innerIndex}
//                 >
//                   {item.tripList.length > 0 ? (
//                     <div>
//                       <StatusCard dataList={item.tripList} dates={dates} />
//                     </div>
//                   ) : (
//                     <div >
//                       <img width={200} style={{marginTop:"25%"}} src="https://www.playonkochi.com/book-turf/assets/images/no-result.png"/>
//                     </div>
//                   )}
//                 </td>
//               );
//             }
//           })}
//         </tr>
//       );
//     })}

 
//   </tbody>

// </Table>
// <div style={{width:"100%", display:"flex", justifyContent:"center" ,alignItems:"center"}} >
//   {
//       vehicleList.length === 0 && <Alert  color="primary w-100" style={{fontSize:"20px",textAlign:"center"}}>No Data found<SentimentVeryDissatisfiedIcon style={{fontSize:"30px"}} className="ml-2"/></Alert>
//     }
//   </div>
//     </div>
//   );
// }



import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Imagecard from "../Imagecard";
import StatusCard from "./StatusCard";
import { Table, Alert } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  headerContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemText: {
    color: "white",
    fontWeight: 500,
  },
}));

export default function StatusDetails(props) {
  const classes = useStyles();
  let dates = [];
  const from = new Date(props.weekStartDate);
  let to = new Date(props.weekEndDate);
to.setDate(to.getDate() + 1);
  for (let day = from; day < to; day.setDate(day.getDate() + 1)) {
    dates.push(new Date(day));
  }

  const { tripDetails } = props;

  // Determine if there's an error or no data
  const hasError = !Array.isArray(tripDetails) && tripDetails?.status === 0;
  const noData = Array.isArray(tripDetails) && tripDetails.length === 0;

  let vehicleList = Array.isArray(tripDetails) ? [...new Set(tripDetails.map((item) => item.code))] : [];

  return (
    <div>
      <Table bordered className="mt-3">
        <thead className="bg-secondary text-white">
          <tr>
            <th>Vehicle/Week</th>
            {dates.slice(1, 6).map((date, index) => (
              <th key={index} className="text-nowrap text-center">
                {moment(date).format("ddd DD-MMM-YYYY")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicleList.map((trip, outerIndex) => (
            <tr key={outerIndex}>
              <td className="border-bottom border-secondary">
                <Imagecard vehicleNumber={trip} />
              </td>
              {tripDetails.map((item, innerIndex) => {
                if (trip === item.code) {
                  return (
                    <td className="border-bottom border-secondary" key={innerIndex}>
                      {item.tripList.length > 0 ? (
                        <StatusCard dataList={item.tripList} dates={dates} />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                          <h4>No Data found</h4>
                        </div>
                      )}
                    </td>
                  );
                }
                return null; // Ensure to return null if no condition met
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Alert message displayed below the table */}
      {(hasError || noData) && (
        <Alert color={hasError ? "danger" : "primary"} className="w-100 text-center" style={{ fontSize: "20px" }}>
          {hasError ? (
            tripDetails.message || "An error has occurred. Please contact your administrator for assistance"
          ) : (
            "No Data found"
          )}
        </Alert>
      )}
    </div>
  );
}
