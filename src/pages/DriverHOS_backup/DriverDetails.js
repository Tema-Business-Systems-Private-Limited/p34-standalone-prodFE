import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col,
  Button
} from 'reactstrap';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Card, CardContent, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

export default function Component(props) {

  const [expandedRow, setExpandedRow] = useState(null);

  const statusLabels = ["OFF", "SB", "D", "ON"];
  const statusColors = ["#000000", "#4F4F4F", "#2ECC71", "#E67E22"]; // OFF (Black), SB (Gray), D (Green), ON (Orange)
  const backgroundColors = ["#f2f2f2", "#d9d9d9", "#c8f7c5", "#f4d03f"]; // Light background for each status

  const data = {
      labels: ["M", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "N", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "M"],
      datasets: [
          {
              label: "HOS Status",
              data: [0, 0, 1, 1, 2, 0, 2, 2, 1, 0, 0, 2, 1, 0, 2, 0, 3, 1, 2, 0, 1, 0, 2, 1],
              borderColor: "black",
              borderWidth: 2,
              stepped: true,
              fill: true,
              backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  if (!chartArea) {
                      return null; // Return null if chart area is not defined
                  }

                  // Create a gradient or segmented background
                  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                  gradient.addColorStop(0, backgroundColors[0]); // OFF
                  gradient.addColorStop(0.33, backgroundColors[1]); // SB
                  gradient.addColorStop(0.66, backgroundColors[2]); // D
                  gradient.addColorStop(1, backgroundColors[3]); // ON

                  return gradient;
              },
          },
      ],
  };

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: {
              title: {
                  display: true,
                  text: "Time (Hours)",
              },
              position: "top",
          },
          y: {
              min: 0,
              max: 3,
              ticks: {
                  stepSize: 1,
                  callback: function (value) {
                      return statusLabels[value];
                  },
              },
          },
      },
      plugins: {
          legend: {
              display: true,
              labels: {
                  usePointStyle: true,
                  generateLabels: function () {
                      return statusLabels.map((label, i) => ({
                          text: label,
                          fillStyle: statusColors[i],
                          strokeStyle: "black",
                          lineWidth: 2,
                      }));
                  },
              },
          },
      },
  };

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const getAllDrivers = () => {
    props.getAllDrivers();
  }

  return (
    <div className="mt-5">
      <Row className="mb-3">
        <Col md={6}>
            <Button color="primary" size="lg" onClick={getAllDrivers}>Back to all drivers</Button>
        </Col>
      </Row>
      <div className="bg-white shadow-sm rounded">
        <Table responsive hover striped className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0">Date (PST)</th>
              <th className="border-0">Shift</th>
              <th className="border-0">Driving</th>
              <th className="border-0">In Violation</th>
              <th className="border-0">From</th>
              <th className="border-0">To</th>
              <th className="border-0">Violations</th>
              <th className="border-0"></th>
            </tr>
          </thead>
          <tbody>
            {props.driverDetails.map((driverDetail, index) => (
              <React.Fragment key={driverDetail.date}>
                <tr>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="font-weight-bold">{driverDetail.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{driverDetail.shift}</td>
                  <td className="align-middle">{driverDetail.driving}</td>
                  <td className="align-middle">{driverDetail.inViolation}</td>
                  <td className="align-middle">{driverDetail.from}</td>
                  <td className="align-middle">{driverDetail.to}</td>
                  <td className="align-middle">
                    {driverDetail.violations}
                  </td>
                  <td className="align-middle">
                    <Button
                        variant="link"
                        onClick={() => toggleRow(index)}
                        className="expand-btn"
                        style={{ background: 'transparent', padding: 0, fontSize: '12px', 
                          border: '0px !important', marginLeft: '10px' }}
                      >
                        {expandedRow === index ? <FaChevronUp size={15} /> : <FaChevronDown size={12} />}
                      </Button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                  <td colSpan="8" className="p-0">
                    <div className="p-3 bg-white" style={{ width: '100%' }}>

                      {/* Separator */}
                      <hr style={{ borderTop: '1px solid #ccc', margin: '1rem 0' }} />

                      {/* Driver Details Section */}
                      <div className="p-3 rounded">
                        <p><strong>Driver:</strong> {props.driverName}</p>
                        <p><strong>Driver License:</strong> {props.driverLicense}</p>
                        <p><strong>Vehicles:</strong> {driverDetail.vehicles}</p>
                      </div>

                      {/* Separator */}
                      <hr style={{ borderTop: '1px solid #ccc', margin: '1rem 0' }} />

                      <Card>
                          <CardContent>
                              <Typography variant="h6">HOS Graph</Typography>
                              <div style={{ height: 250 }}>
                                  <Line data={data} options={options} />
                              </div>
                          </CardContent>
                      </Card>

                      <Typography variant="h6" style={{ marginTop: "20px" }}>Status Changes</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Duration</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {driverDetail.dataPoints.map((point, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{point.start}</TableCell>
                                            <TableCell>{point.end}</TableCell>
                                            <TableCell>{point.duration}</TableCell>
                                            <TableCell>{point.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                  </td>
                </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}