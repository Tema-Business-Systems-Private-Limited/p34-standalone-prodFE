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
import Select from "react-select";

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
    <Form className='mt-3'>
      <FormGroup row>
        <Col sm={4}>
          <div>
        <Label for="shiftTitle" className="form-label">Shift title</Label>

          <Input type="text" name="shiftTitle" id="shiftTitle" placeholder="Type here" />
          </div>
        </Col>
        <Col sm={4}>
													<div className="mb-3">
														<Label className="form-label">Site</Label>
														<Select
														// value={optionSelected}
															isMulti={false}
															// onChange={this.handleSiteChange}
															// options={optionSiteItems}
															classNamePrefix="select2-selection"
														/>
													</div>
												</Col>
        <Col sm={4} className='d-flex justify-content-center align-items-center'>
          <div>
        <Label className="form-label">Active</Label>

          <CustomInput type="switch" id="allDaySwitch" name="allDaySwitch" />
          </div>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={4}>
          <div>
        <Label for="startTime" className="form-label">Start</Label>

          <Input type="time" name="startTime" id="startTime" placeholder="00:00" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
        </Col>
      
        <Col sm={4}>
          <div>
        <Label for="endTime" className="form-label">End</Label>

          <Input type="time" name="endTime" id="endTime" placeholder="00:00" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </Col>
        <Col sm={4} className='d-flex justify-content-center align-items-center'>
          <FormText style={{fontSize:"20px"}}>{timeDiff} HH:MM</FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <div>
        <Label className="form-label" for="shiftDescription">Description</Label>
        <Input type="textarea" name="shiftDescription" id="shiftDescription" placeholder="Type here" rows="3" />
          </div>
         
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col className='d-flex justify-content-start align-items-center'>
          <Button color="info" className=''>Add Shift</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default AddTemplateForm;
