
// ** Third Party Components
import Select from 'react-select'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, CardBody, Form, FormGroup, TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, Alert, Table } from 'reactstrap'



import { useParams } from 'react-router-dom';

import { Link, useHistory } from 'react-router-dom'

import classnames from 'classnames'
import moment from 'moment'


const RouteDetailsComponent = (props) => {


  return (
    <div className="w-100" style={{marginTop : "40px"}}>
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='border-bottom' style={{ display : "flex", justifyContent : "space-between"}}>
              <CardTitle tag='h4'>ROUTE DETAILS - {props.selectedRouteDetail}</CardTitle>
              <Button style={{backgroundColor : "#217f69", color : "white"}} type='button'  onClick={props.onHideRouteDetails}>
                                                          Back
                                           </Button>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RouteDetailsComponent
