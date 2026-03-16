import React, { Component } from 'react'
import Select from 'react-select'
import {
  Container,
  Row,
  FormGroup,
  Form,
  Label,
  Input,
  Media,
  Col,
} from 'reactstrap'

export default class Header extends Component {
  handleSiteChange = (selectedMulti) => {
    this.props.siteChange(selectedMulti)
    //this.setState({ selectedMulti });
  }

  render() {
    console.log('inside useEffect', this.props.sites)

    let optionSiteItems = []
    var selectedSite = {}
    var optionSelected = {}
    var placeHolder = 'All'
    this.props.sites &&
      this.props.sites.length > 0 &&
      this.props.sites.map((site) => {
        if (site.id == this.props.selectedSite) {
          selectedSite = site
          placeHolder = site.value
          optionSelected.value = site.id
          optionSelected.label = site.value + '(' + site.id + ')'
        }
        optionSiteItems.push({
          value: site.id,
          label: site.value + '(' + site.id + ')',
        })
      })

    return (
      <>
        <Form className="row_nav d-flex align-items-center">
          <Row className=" w-100 ">
            <Col lg="3">
              <div className="mb-3">
                <Label className="form-label">Site</Label>
                <Select
                  value={optionSelected}
                  isMulti={false}
                  onChange={this.handleSiteChange}
                  options={optionSiteItems}
                  classNamePrefix="select2-selection"
                />
              </div>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}
