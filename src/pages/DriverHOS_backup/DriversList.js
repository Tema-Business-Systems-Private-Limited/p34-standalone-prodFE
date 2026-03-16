import React, { useState, useEffect } from 'react';
import {
  Table
} from 'reactstrap';

export default function Component(props) {

  const getDriverDetails = (driver) => {
    props.getDriverDetails(driver);
  }

  return (
    <div className="mt-5">

      <div className="bg-white shadow-sm rounded">
        <Table responsive hover striped className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0">Drive Name</th>
              <th className="border-0">Driver Status</th>
               <th className="border-0">Time in Status</th>
              <th className="border-0">Vehicle name</th>
              <th className="border-0">Time Until break</th>
              <th className="border-0">Drive remaining</th>
              <th className="border-0">Shift remaining</th>
              <th className="border-0">Cycle remaining</th>
              <th className="border-0">Cycle tomorrow</th>
              <th className="border-0">Driver in violation (today)</th>
              <th className="border-0">Drive in violation (cycle)</th>
            </tr>
          </thead>
          <tbody>
            {props.drivers.map((driver) => (
              <tr
                key={driver.driverName}
              >
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="font-weight-bold" onClick={() => getDriverDetails(driver)}>
                         {driver.driverName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="align-middle">{driver.driverStatus}</td>
                 <td className="align-middle">{driver.timeInStatus}</td>
                <td className="align-middle">
                  {driver.vechicleName}
                </td>
                <td className="align-middle">{driver.timeBreak}</td>
                <td className="align-middle">
                  {driver.driverRemaining}
                </td>
                <td className="align-middle">
                  {driver.shiftRemaining}
                </td>
                <td className="align-middle">
                  {driver.cycleRamining}
                </td>
                <td className="align-middle">
                  {driver.cycleTomorrow}
                </td>
                <td className="align-middle">
                  {driver.driverViolationToday}
                </td>
                <td className="align-middle">
                  {driver.driverViolationCycle}
                </td>
              </tr>
              
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}