import React, { useState, useEffect } from 'react';
import {
  Table
} from 'reactstrap';
import { format } from "date-fns";
import moment from "moment";

export default function Component(props) {

  const getDriverDetails = (driver) => {
    props.getDriverDetails(driver);
  }

  const convertMinutesToHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };


 const  getStatus = (status) => {

 if (status === "Off Duty") {
       return (
         <span
           class="badge badge-danger text-uppercase"
           style={{ fontSize: 14 }}
         >
           {status}
         </span>
       );
     } else if (status === "On Duty") {
      return (
               <span
                 class="badge badge-primary text-uppercase"
                 style={{ fontSize: 14 }}
               >
                 {status}
               </span>
             );
      }
      else if (status == "Driving") {
            return (
                     <span
                       class="badge badge-secondary text-uppercase"
                       style={{ fontSize: 14 }}
                     >
                       {status}
                     </span>
                   );
            }
            else{
                        return (
                                 <span
                                   class="badge badge-primary text-uppercase"
                                   style={{ fontSize: 14 }}
                                 >
                                  {status}
                                 </span>
                               );
                        }



 }

  return (
    <div className="mt-5">

      <div className="bg-white shadow-sm rounded">
        <Table responsive hover striped className="mb-0">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-0">Drive ID</th>
              <th className="border-0">Drive Name</th>
              <th className="border-0">Current Status</th>
               <th className="border-0">Last Worked Date</th>
              <th className="border-0">Vehicle</th>
              <th className="border-0">Day Worked Hrs</th>
              <th className="border-0">Day Cycle Hrs</th>
               <th className="border-0">Week Worked Hrs</th>
                            <th className="border-0">Week Cycle Hrs</th>
              <th className="border-0">Month Worked Hrs</th>
                           <th className="border-0">Month Cycle Hrs</th>

            </tr>
          </thead>
          <tbody>
            {props.drivers.map((driver) => (
              <tr
                key={driver.driverId}
              >
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="font-weight-bold" onClick={() => getDriverDetails(driver)}>
                         {driver.driverId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="align-middle">{driver.driver}</td>
                <td className="align-middle">{getStatus(driver.currStatus)}</td>
                 <td className="align-middle">{driver?.lastUpdatedDate === '1900-01-01 00:00:00.0'  ?  '' : driver?.lastUpdatedDate === '1753-01-01 00:00:00.0' ? '' : moment(driver?.lastUpdatedDate).format("YYYY-MM-DD") }</td>
                <td className="align-middle">
                  {driver.vehicle}
                </td>
                <td className="align-middle">{driver.dayWorkedHrs ===0 ? driver.dayWorkedHrs : convertMinutesToHHMM(driver.dayWorkedHrs)}</td>
                <td className="align-middle">
                  {driver.shiftHrs === 0 ? driver.shiftHrs :   convertMinutesToHHMM(driver.shiftHrs)}
                </td>
                <td className="align-middle">
                  {driver.weeklyWorkedHrs === 0 ? driver.weeklyWorkedHrs : convertMinutesToHHMM(driver.weeklyWorkedHrs)}
                </td>
                <td className="align-middle">
                  {convertMinutesToHHMM(driver.weekCycleHrs)}
                </td>
                <td className="align-middle">
                  {driver.monthWorkedHrs === 0 ? driver.monthWorkedHrs : convertMinutesToHHMM(driver.weeklyWorkedHrs) }
                </td>
                <td className="align-middle">
                  {driver.monthCycleHrs === 0 ? driver.monthCycleHrs : convertMinutesToHHMM(driver.monthCycleHrs)}
                </td>
              </tr>
              
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}