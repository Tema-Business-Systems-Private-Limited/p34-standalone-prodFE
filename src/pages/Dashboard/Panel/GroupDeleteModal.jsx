import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Button as RsButton } from "reactstrap";

/**
 * GroupDeleteModal
 *
 * Props:
 *  - open             : boolean    — controls modal visibility
 *  - onClose          : () => void
 *  - tripsPanel       : Trip[]     — full trips list from parent
 *  - onConfirmDelete  : (selectedTripIds: string[]) => void
 */
const GroupDeleteModal = ({ open, onClose, tripsPanel = [], onConfirmDelete }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter only unlocked Open & Optimised trips
  const deletableTrips = tripsPanel.filter(
    (trip) =>
      !trip.lock &&
      (trip.optistatus === "Optimized" || trip.optistatus === "Open")
  );

  // Reset selection whenever modal opens
  useEffect(() => {
    if (open) setSelectedIds([]);
  }, [open]);

  const isAllSelected =
    deletableTrips.length > 0 && selectedIds.length === deletableTrips.length;

  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < deletableTrips.length;

  const handleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : deletableTrips.map((t) => t.itemCode));
  };

  const handleToggle = (itemCode) => {
    setSelectedIds((prev) =>
      prev.includes(itemCode)
        ? prev.filter((id) => id !== itemCode)
        : [...prev, itemCode]
    );
  };

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) return;
    onConfirmDelete(selectedIds);
    onClose();
  };

  // Teal checkbox color matching the app's ag-grid style
  const checkboxSx = {
    color: "#17a2b8",
    "&.Mui-checked": { color: "#17a2b8" },
    "&.MuiCheckbox-indeterminate": { color: "#17a2b8" },
    padding: "4px",
  };

  const statusChip = (status, generatedBy) => (
    <Chip
      label={(generatedBy === "AutoScheduler" && status === "Optimized") ? "AUTO OPTIMIZED" : status}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: 600,
        minWidth: 84,
        textTransform: "uppercase",
        borderColor: status === "Optimized" ? "#16A34A" : "#6B7280",
        color: status === "Optimized" ? "#16A34A" : "#6B7280",
      }}
    />
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 1, overflow: "hidden" } }}
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          backgroundColor: "#044C84",
          color: "white",
          py: 1.5,
          px: 2.5,
        }}
      >
        <Typography variant="h5" fontWeight={700} color="white">
          Group Delete Trips
        </Typography>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent dividers sx={{ p: 0 }}>
        {deletableTrips.length === 0 ? (
          <>
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary" fontSize="1.5rem">
              There are currently no open or optimised trips available for deletion.
            </Typography>
          </Box>
          <Divider />
                      <div style={{ display: "flex", justifyContent: "flex-end"}}>
              <RsButton
                onClick={onClose}
                style={{
                  background: "linear-gradient(135deg, #1a6faf 0%, #044C84 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  margin: "12px 20px",
                  padding: "6px 20px",
                  borderRadius: "6px",
                }}
              >
                Close
              </RsButton>
            </div>
            </>
        ) : (
          <>
            {/* Trip table */}
            <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 440 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {/* Select-all checkbox in header */}
                    <TableCell
                      padding="checkbox"
                      sx={{
                        backgroundColor: "#6893b5",
                        borderBottom: "none",
                      }}
                    >
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleSelectAll}
                        size="small"
                        sx={{
                          color: "white",
                          "&.Mui-checked": { color: "white" },
                          "&.MuiCheckbox-indeterminate": { color: "white" },
                          padding: "4px",
                        }}
                      />
                    </TableCell>
                    {["Trip Code", "Vehicle", "Driver", "Status"].map((col) => (
                      <TableCell
                        key={col}
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          backgroundColor: "#6893b5",
                          color: "white",
                          borderBottom: "none",
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deletableTrips.map((trip, index) => {
                    const isSelected = selectedIds.includes(trip.itemCode);
                    return (
                      <TableRow
                        key={trip.itemCode}
                        hover
                        onClick={() => handleToggle(trip.itemCode)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? "rgba(23,162,184,0.08) !important"
                            : index % 2 === 0 ? "white" : "#F8FAFC",
                          "&:hover": {
                            backgroundColor: "rgba(23,162,184,0.12) !important",
                          },
                          transition: "background-color 0.12s",
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            size="small"
                            onChange={() => handleToggle(trip.itemCode)}
                            onClick={(e) => e.stopPropagation()}
                            sx={checkboxSx}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} color="#111827">
                            {trip.itemCode}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {trip.code || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {trip.driverName || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>{statusChip(trip.optistatus, trip.generatedBy)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>

      {/* ── Footer ── */}
      {deletableTrips.length > 0 && (
        <>
          <Divider />
          <DialogActions
            sx={{
              px: 2.5,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            {/* Left: selection count */}
            <Typography variant="caption" color="text.disabled" fontSize="1rem" fontweight={800}>
              {`${selectedIds.length} out of ${deletableTrips.length} selected`}
            </Typography>

            {/* Right: action buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <RsButton
                onClick={onClose}
                style={{
                  background: "linear-gradient(135deg, #1a6faf 0%, #044C84 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  padding: "6px 20px",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </RsButton>
              <RsButton
                disabled={selectedIds.length === 0}
                onClick={handleDeleteClick}
                style={{
                  background:
                    selectedIds.length === 0
                      ? "linear-gradient(135deg, #f87171 0%, #dc2626 100%)"
                      : "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  padding: "6px 20px",
                  borderRadius: "6px",
                  opacity: selectedIds.length === 0 ? 0.55 : 1,
                  cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                Delete {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
              </RsButton>
            </div>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default GroupDeleteModal;