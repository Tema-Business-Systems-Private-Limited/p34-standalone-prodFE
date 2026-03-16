import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withNamespaces } from "react-i18next";

class ProductsDetailList extends React.Component {
  constructor(props) {
    super(props);
  }

  getBgcolor(t) {
    let color = "lightblue";

    let breakCondition = false;
    this.props.vehiclePanel.vehicles.map((vehicle) => {
      if (vehicle.codeyve === t && !breakCondition) {
        var myStr = vehicle.color;
        var subStr = myStr.match("background-color:(.*)");
        color = subStr[1];
        breakCondition = true;
      }
    });

    return color;
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-bg">
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="text-white">Route Detail List</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "max-height": "calc(100vh - 210px)", "overflow-y": "auto" }}
        >
          <table class="table table-striped text-xsmall" id="diagnosis_list">
            <thead style={{ textAlign: "left" }}>
              <tr>
                <th width="3%" class="pl-2">
                  {" "}
                  {"Seq"}
                </th>
                {/* <th width="6%"> {"Route"}</th>
                <th width="6%"> {"Vehicle"}</th> */}
                <th width="6%"> {"Transaction"}</th>
                {/* <th width="6%"> {"Type"}</th> */}
                {/* <th width="6%"> {"Customer"}</th> */}
                <th width="6%"> {"Name"}</th>
                <th width="6%"> {"Pallets"}</th>
                <th width="6%"> {"Cases"}</th>
                {/* <th width="6%"> {"Weight"}</th>
                <th width="6%"> {"Volume"}</th> */}
                <th width="6%"> {"City"}</th>
                <th width="auto"> {"Product"}</th>
                <th width="auto"> {"Product Name"}</th>
                <th width="auto"> {"Qty"}</th>
              </tr>
            </thead>
            <tbody>
              {(this.props.Datalist || []).map((data, i) => {
                return (
                  <tr
                    key={data.docnum}
                    style={{
                      backgroundColor: this.getBgcolor(data.vehicleCode),
                      textAlign: "left",
                    }}
                  >
                    <td width="3%" class="priority">
                      <span class="badge badge-primary text-uppercase">
                        {i + 1}
                      </span>
                    </td>
                    {/* <td width="6%" name="itemCod">
                      {data.itemCode}
                    </td>
                    <td width="6%" name="itemCode">
                      {data.vehicleCode}
                    </td> */}
                    <td width="6%" name="docNum">
                      {data.docnum}
                    </td>
                    {/* <td width="6%">{data.bpcode}</td> */}
                    <td width="6%">{data.bpname}</td>
                    <td width="6%">{parseFloat(data.noofCases).toFixed(2)} PAL</td>
                    <td width="6%">{data?.mainCases ? parseFloat(data.mainCases) : 0} CS</td>
                    {/* <td width="6%">
                      {data.netweight} {data.weightunit}
                    </td>
                    <td width="6%">
                      {data.volume} {data.volume_unit}
                    </td> */}
                    <td width="6%">
                      {/* {data.poscode} ,  */}
                      {data.city}
                    </td>
                    <td width="auto" style={{ whiteSpace: "nowrap" }}>
                      {data.products.map((prd) => (
                        <tr>
                          <td>{prd.productCode}</td>
                        </tr>
                      ))}
                    </td>
                    <td width="auto" style={{ whiteSpace: "nowrap" }}>
                      {data.products.map((prd) => (
                        <tr>
                          <td>{prd.productName}</td>
                        </tr>
                      ))}
                    </td>
                    <td width="auto" style={{ whiteSpace: "nowrap" }}>
                      {data.products.map((prd) => (
                        <tr>
                          <td>
                            {prd.quantity} {prd.uom}
                          </td>
                        </tr>
                      ))}
                    </td>
                    {/* <td width="6%">
                      {data.doctype ? data.doctype : data.movtype}
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="button-custom" onClick={this.props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withNamespaces()(ProductsDetailList);
