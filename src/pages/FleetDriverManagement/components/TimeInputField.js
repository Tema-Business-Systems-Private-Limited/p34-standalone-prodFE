import React, { useState } from 'react';
import { Container, Row, Col, Label, Input } from 'reactstrap';

const TimeInputField = () => {
  const [time, setTime] = useState('12:00');

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Label for="timeInput">Select Time (24-hour format)</Label>
          <Input
            id="timeInput"
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="form-control"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TimeInputField;
