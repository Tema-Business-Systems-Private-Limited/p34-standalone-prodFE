import React, { useState, useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import RightSide from "./RightSection";

const ResizableLayout = ({
  leftSide,
  rightSide,
  initialLeftWidth = 40,
  minLeftWidth = 20,
  maxLeftWidth = 80,
  selectedOrder,
  setSelectedOrder,
  associations,
  handleUpdate,
  isCreate,
  handleDelete,
  error,
  setError,
  commonData
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging && isLeftVisible) {
        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        setLeftWidth(
          Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth)
        );
      }
    },
    [isDragging, isLeftVisible, minLeftWidth, maxLeftWidth]
  );

  const toggleLeftSide = () => {
    setIsLeftVisible(!isLeftVisible);
    if (!isLeftVisible) {
      setLeftWidth(minLeftWidth);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="d-flex"
      style={{ height: 'calc(80vh - 50px)', overflow: 'hidden' }}
    >
      {isLeftVisible && (
        <div style={{ width: `${leftWidth}%`, overflow: "hidden" }}>
          {leftSide}
        </div>
      )}
      <div
        style={{
          width: "20px",
          cursor: "col-resize",
          background: "#dee2e6",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          color="light"
          className="p-0"
          style={{ width: "20px", height: "60px" }}
          onClick={toggleLeftSide}
        >
          {isLeftVisible ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </Button>
      </div>
      <div
        style={{
          width: isLeftVisible
            ? `calc(100% - ${leftWidth}% - 20px)`
            : "calc(100% - 20px)",
          overflow: "hidden",
        }}
      >
        {/* {rightSide} */}

        <RightSide
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          associations={associations}
          handleUpdate={handleUpdate}
          isCreate={isCreate}
          handleDelete={handleDelete}
          error={error}
          setError={setError}
          commonData={commonData}
        />
      </div>
    </div>
  );
};

export default ResizableLayout;
