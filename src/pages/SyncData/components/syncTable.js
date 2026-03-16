import React from "react";

const SyncTable = ({ data, onSync }) => {
  const rows = [
    { label: "Customers", key: "customers" },
    { label: "Suppliers", key: "suppliers" },
    { label: "Sites", key: "sites" },
  ];

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
      }}
    >
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={thStyle}>Items</th>
          <th style={thStyle}>ERP</th>
          <th style={thStyle}>TMS</th>
          <th style={thStyle}>Sync</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            <td style={tdStyle}>{row.label}</td>
            <td style={tdStyle}>{data[row.key]?.erp}</td>
            <td style={tdStyle}>{data[row.key]?.tms}</td>
            <td style={tdStyle}>
              <button
                onClick={() => onSync(row.key)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                Sync
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default SyncTable;
