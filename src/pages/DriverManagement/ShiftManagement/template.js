import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
  Col,
} from 'reactstrap';

const AddTemplateForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      let diff = (end - start) / (1000 * 60 * 60); // difference in hours
      if (diff < 0) diff += 24; // adjust for crossing midnight
      const hours = Math.floor(diff);
      const minutes = Math.round((diff - hours) * 60);
      setTimeDiff(`${hours}:${minutes.toString().padStart(2, '0')}`);
    }
  }, [startTime, endTime]);

  return (
    <Form style={{ border: '2px solid blue', borderRadius: '10px', padding: '20px' }}>
      <FormGroup row>
        <Label for="shiftTitle" sm={2}>Shift title</Label>
        <Col sm={7}>
          <Input type="text" name="shiftTitle" id="shiftTitle" placeholder="Type here" />
        </Col>
        <Label sm={1}>Active</Label>
        <Col sm={2}>
          <CustomInput type="switch" id="allDaySwitch" name="allDaySwitch" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="startTime" sm={2}>Start</Label>
        <Col sm={3}>
          <Input type="time" name="startTime" id="startTime" placeholder="00:00" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </Col>
        <Col sm={1}>
        </Col>
        <Label for="endTime" sm={2}>End</Label>
        <Col sm={2}>
          <Input type="time" name="endTime" id="endTime" placeholder="00:00" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </Col>
        <Col sm={2}>
          <FormText>{timeDiff} HH:MM</FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="shiftDescription" sm={2}>Description</Label>
        <Col sm={10}>
          <Input type="textarea" name="shiftDescription" id="shiftDescription" placeholder="Type here" rows="3" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button color="info">Add Shift</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default AddTemplateForm;
