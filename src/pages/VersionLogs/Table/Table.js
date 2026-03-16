import React, { useState } from "react";
import { Button, Col, Label, Row, Table } from "reactstrap";
import Select from "react-select";
import CancelIcon from "@mui/icons-material/Cancel";
import "./versiontable.css";

const versions = [
  {
    versionNumber: "1.0.0",
    date: "2024-05-30",
    issues: [
      "Fixed login page alignment issue",
      "Resolved issue with header navigation",
    ],
    bugs: [
      "Fixed validation bug on login form",
      "Resolved performance issue on dashboard",
    ],
    improvements: [
      "Added pagination to user list page",
      "Optimized database queries",
    ],
    ClientRequests: [
      "Implemented new feature request for profile picture upload",
      "Added option to customize dashboard layout",
    ],
  },
  {
    versionNumber: "1.0.1",
    date: "2024-06-15",
    issues: [
      "Fixed issue with user profile page layout",
      "Resolved issue with logout functionality",
    ],
    bugs: [
      "Fixed bug causing app crash on certain devices",
      "Resolved security vulnerability in authentication module",
    ],
    improvements: [
      "Added search functionality to user list page",
      "Optimized images for faster loading",
    ],
    ClientRequests: [
      "Implemented new feature request for dark mode",
      "Added option to export data to CSV",
    ],
  },
  {
    versionNumber: "1.0.2",
    date: "2024-07-01",
    issues: [
      "Fixed issue with data synchronization",
      "Resolved issue with notifications not showing",
    ],
    bugs: [
      "Fixed bug causing app freeze on startup",
      "Resolved issue with data loss on logout",
    ],
    improvements: [
      "Added offline support for certain features",
      "Optimized API calls for faster response",
    ],
    ClientRequests: [
      "Implemented new feature request for push notifications",
      "Added option to delete user account",
    ],
  },
  {
    versionNumber: "1.0.3",
    date: "2024-07-20",
    issues: [
      "Fixed issue with file uploads",
      "Resolved issue with email notifications",
      "Fixed issue with file uploads",
      "Resolved issue with email notifications",
    ],
    bugs: [
      "Fixed bug causing incorrect data rendering",
      "Resolved issue with infinite loading spinner",
    ],
    improvements: [
      "Added sorting functionality to user list page",
      "Optimized memory usage for better performance",
    ],
    ClientRequests: [
      "Implemented new feature request for data export",
      "Added option to change account password",
    ],
  },
  {
    versionNumber: "1.0.4",
    date: "2024-08-05",
    issues: [
      "Fixed issue with user permissions",
      "Resolved issue with broken links",
    ],
    bugs: [
      "Fixed bug causing intermittent crashes",
      "Resolved issue with search functionality",
    ],
    improvements: [
      "Added filtering options to data tables",
      "Optimized database queries for improved scalability",
    ],
    ClientRequests: [
      "Implemented new feature request for multi-language support",
      "Added option to schedule automated reports",
    ],
  },
  {
    versionNumber: "1.1.0",
    date: "2024-09-01",
    issues: [
      "Fixed issue with user profile editing",
      "Resolved issue with session management",
      "Fixed issue with user profile editing",
      "Resolved issue with session management",
    ],
    bugs: [
      "Fixed bug causing incorrect data calculations",
      "Resolved issue with data corruption",
    ],
    improvements: [
      "Added dashboard customization options",
      "Optimized UI for better user experience",
    ],
    ClientRequests: [
      "Implemented new feature request for real-time chat",
      "Added option to import/export data",
    ],
  },
  {
    versionNumber: "1.1.1",
    date: "2024-09-20",
    issues: [
      "Fixed issue with payment processing",
      "Resolved issue with user preferences not saving",
    ],
    bugs: [
      "Fixed bug causing intermittent server errors",
      "Resolved issue with form validation",
    ],
    improvements: [
      "Added user activity logs",
      "Optimized server response time",
    ],
    ClientRequests: [
      "Implemented new feature request for user roles",
      "Added option to customize email templates",
    ],
  },
  {
    versionNumber: "1.1.2",
    date: "2024-10-10",
    issues: [
      "Fixed issue with data synchronization",
      "Resolved issue with notifications not showing",
    ],
    bugs: [
      "Fixed bug causing app freeze on certain devices",
      "Resolved issue with data loss on logout",
    ],
    improvements: [
      "Added offline support for certain features",
      "Optimized API calls for faster response",
    ],
    ClientRequests: [
      "Implemented new feature request for push notifications",
      "Added option to delete user account",
    ],
  },
  {
    versionNumber: "1.1.3",
    date: "2024-10-30",
    issues: [
      "Fixed issue with file uploads",
      "Resolved issue with email notifications",
    ],
    bugs: [
      "Fixed bug causing incorrect data rendering",
      "Resolved issue with infinite loading spinner",
    ],
    improvements: [
      "Added sorting functionality to user list page",
      "Optimized memory usage for better performance",
    ],
    ClientRequests: [
      "Implemented new feature request for data export",
      "Added option to change account password",
    ],
  },
  {
    versionNumber: "1.1.4",
    date: "2024-11-15",
    issues: [
      "Fixed issue with user permissions",
      "Resolved issue with broken links",
    ],
    bugs: [
      "Fixed bug causing intermittent crashes",
      "Resolved issue with search functionality",
    ],
    improvements: [
      "Added filtering options to data tables",
      "Optimized database queries for improved scalability",
    ],
    ClientRequests: [
      "Implemented new feature request for multi-language support",
      "Added option to schedule automated reports",
    ],
  },
];

const options = [
  { value: "issues", label: "Issues" },
  { value: "bugs", label: "Bugs" },
  { value: "improvements", label: "Improvements" },
  { value: "ClientRequests", label: "Client Requests" },
];

const VersionLogTable = () => {
  const rowColors = ["#90ee90", "#ee9090", "#e6ffe6"];
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("issues");
  const [searchQuery, setSearchQuery] = useState("");

  const handleVersionChange = (selectedOption) => {
    setSelectedVersion(selectedOption ? selectedOption.value : null);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleClear = () => {
    setSelectedVersion(null);
    setSelectedCategory("issues");
    setSearchQuery("");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterVersions = (version) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      version.versionNumber.toLowerCase().includes(searchLower) ||
      version.date.toLowerCase().includes(searchLower) ||
      version[selectedCategory].some((item) =>
        item.toLowerCase().includes(searchLower)
      )
    );
  };

  return (
    <div>
  <div className="select-dropdowns ">
    <Row className="w-100 mb-3 d-flex align-items-end">
      <Col md="2">
        <Label>Version</Label>
        <Select
          value={
            selectedVersion
              ? { value: selectedVersion, label: selectedVersion }
              : null
          }
          onChange={handleVersionChange}
          options={versions.map((version) => ({
            value: version.versionNumber,
            label: version.versionNumber,
          }))}
        />
      </Col>
      <Col md="2">
        <Label>Category</Label>
        <Select
          value={options.find(
            (option) => option.value === selectedCategory
          )}
          onChange={handleCategoryChange}
          options={options}
        />
      </Col>
      <Col md="2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control"
        />
      </Col>
      <Col md="1" className="mb-2">
        <CancelIcon style={{ cursor: "pointer" }} onClick={handleClear} />
      </Col>

      <Col md="5">
        <h3 style={{ textAlign: "end", fontWeight: "bold" }}>VERSION LOGS</h3>
      </Col>
    </Row>
  </div>
  <Table className="version-log-table">
    <thead>
      <tr style={{ background: "#3498db", color: "white" }} className=" text-center">
        <th style={{ width: "20%" }}>Version</th>
        <th style={{ width: "30%" }}>Date</th>
        <th style={{ width: "50%" }}>
          {selectedCategory.charAt(0).toUpperCase() +
            selectedCategory.slice(1)}
        </th>
      </tr>
    </thead>
    <tbody>
      {versions.filter(filterVersions).map((version, index) =>
        selectedVersion === null ||
        selectedVersion === version.versionNumber ? (
          <tr
            className="text-dark"
            // style={{ backgroundColor: rowColors[index % rowColors.length] }}
            key={version.versionNumber}
          >
            <td className="text-center align-middle">{version.versionNumber}</td>
            <td className=" text-center align-middle">{version.date}</td>
            <td className="align-middle">
              <ul>
                {version[selectedCategory].map((item, i) => (
                  <li className="mb-2" key={i}>
                    {item}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ) : null
      )}
    </tbody>
  </Table>
</div>

  );
};

export default VersionLogTable;
