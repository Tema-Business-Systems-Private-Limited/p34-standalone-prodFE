// import React, { Component } from 'react'
// import Select from 'react-select'
// import {
//   Container,
//   Row,
//   FormGroup,
//   Form,
//   Label,
//   Input,
//   Media,
//   Col,
// } from 'reactstrap'

// export default class Header extends Component {
//   handleSiteChange = (selectedMulti) => {
//     this.props.siteChange(selectedMulti)
//     //this.setState({ selectedMulti });
//   }

//   render() {
//     console.log('inside useEffect', this.props.sites)

//     let optionSiteItems = []
//     var selectedSite = {}
//     var optionSelected = {}
//     var placeHolder = 'All'
//     this.props.sites &&
//       this.props.sites.length > 0 &&
//       this.props.sites.map((site) => {
//         if (site.id == this.props.selectedSite) {
//           selectedSite = site
//           placeHolder = site.value
//           optionSelected.value = site.id
//           optionSelected.label = site.value + '(' + site.id + ')'
//         }
//         optionSiteItems.push({
//           value: site.id,
//           label: site.value + '(' + site.id + ')',
//         })
//       })

//     return (
//       <>
//         <Form className="row_nav d-flex align-items-center">
//           <Row className=" w-100 ">
//             <Col lg="3">
//               <div className="mb-3">
//                 <Label className="form-label">Site</Label>
//                 <Select
//                   value={optionSelected}
//                   isMulti={false}
//                   onChange={this.handleSiteChange}
//                   options={optionSiteItems}
//                   classNamePrefix="select2-selection"
//                 />
//               </div>
//             </Col>
//           </Row>
//         </Form>
//       </>
//     )
//   }
// }




import React, { Component } from 'react'
import Select from 'react-select'
import { Row, Form, Label, Col } from 'reactstrap'
import { RefreshCw } from 'react-feather'
import './Header.css'

export default class Header extends Component {
  handleSiteChange = (selected) => {
    this.props.siteChange(selected)
  }

  handleVehicleChange = (vehicleValues) => {
  this.setState({
    selectedVehicles: vehicleValues,
  })
}



  render() {
    const {
      sites,
      selectedSite,
      vehicleDropList,
      selectedVehicle,
      onRefresh,
    } = this.props

    /* ---------- SITE OPTIONS ---------- */
    const siteOptions = Array.isArray(sites)
      ? sites.map((s) => ({
        value: s.id,
        label: `${s.id} - ${s.value}`,
      }))
      : []

    const selectedSiteOption =
      siteOptions.find((s) => s.value === selectedSite) || null

    /* ---------- VEHICLE OPTIONS ---------- */
    const vehicleOptions = [
      { value: 'ALL', label: 'All Vehicles' },
      ...vehicleDropList.map((v) => ({
        value: v.codeyve,
        label: v.name,
      })),
    ]


    const selectedVehicleOption =
      vehicleOptions.find(
        (v) => v.value === selectedVehicle
      ) || null


    return (
      <Form
        className="map-header-form"
        onSubmit={(e) => e.preventDefault()} // 🔥 REQUIRED for toast
      >
        <Row className="align-items-end w-100">
          {/* SITE */}
          <Col md="3">
            <Label className="header-label">Site</Label>
            <Select
              options={siteOptions}
              value={selectedSiteOption}
              onChange={this.handleSiteChange}
              placeholder="Select Site"
              classNamePrefix="map-select"
            />
          </Col>

          {/* VEHICLE */}
          <Col md="3">
            <Label className="header-label">Vehicle</Label>
            <Select
              isMulti
              options={vehicleOptions}
              value={vehicleOptions.filter(v =>
                this.props.selectedVehicles.includes(v.value)
              )}
              onChange={(selected) =>
                this.props.vehicleChange(
                  selected ? selected.map(v => v.value) : []
                )
              }
              placeholder="All Vehicles"
              isDisabled={!selectedSite}
              classNamePrefix="map-select"
            />

          </Col>

          {/* REFRESH */}
          <Col
            md="6"
            className="d-flex justify-content-end align-items-center"
          >
            <button
              type="button" // 🔥 prevents submit
              onClick={onRefresh}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#4f46e5')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#6366f1')
              }
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </Col>
        </Row>
      </Form>
    )
  }
}
