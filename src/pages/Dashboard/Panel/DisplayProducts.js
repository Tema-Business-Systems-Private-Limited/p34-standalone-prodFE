import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withNamespaces } from "react-i18next";
import {
  nullAndNanChecking,
  nullAndNanCheckingFloat,
  nullAndTime,
} from "../converterFunctions/converterFunctions";

class DisplayProducts extends React.Component {
  documentBadgeLink = (docno, dtype) => {
    const docmvt = dtype;
    let url, content;

    if (docmvt == "PICK") {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESPRH2/2//M/` + docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt == "DLV") {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESSDH/2//M/` + docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt == "PRECEIPT") {
      url =
        `${process.env.REACT_APP_X3_URL}/$sessions?f=GESXX10CPTH/2/M//` + docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a className="text-white" href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
  };

  render() {


    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-bg">
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="text-white">
              Product Details (
              {this.documentBadgeLink(this.props.docNum, this.props.doctype)})
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-striped m-0">
            <thead>
              <tr class="">
                <th width="6%">{this.props.t("prodcode")}</th>
                <th width="10%">Product</th>
                <th width="6%">Quantity</th>
                <th width="6%">Weight</th>
                <th width="6%">Volume</th>

                {/* <th width="6%">UOM</th> */}

              </tr>
            </thead>
            <tbody>
              {(this.props.products || []).map((product) => {
                return (
                  <tr>
                    <td width="6%">{product.productCode}</td>
                    <td width="10%">{product.productName}</td>
                    <td width="6%">{product.quantity} {product.uom}</td>
                    <td width="6%">{parseFloat(nullAndNanChecking(product.weight)).toFixed(2)} {product.wei_unit}</td>
                    <td width="6%">{parseFloat(nullAndNanChecking(product.volume)).toFixed(2)} {product.vol_unit}</td>


                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr class="m-0 p-0" />
          {(() => {
            if (this.props.products.length <= 0) {
              return (
                <div class="col-md-12">
                  No trailers are configured, you can configure up to 2 trailers
                </div>
              );
            }
          })()}
        </Modal.Body>
        <Modal.Footer>
          <button className="button-custom" onClick={this.props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withNamespaces()(DisplayProducts);
