// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import { withNamespaces } from "react-i18next";

// class DisplayProducts extends React.Component {
//   documentBadgeLink = (docno, dtype) => {
//     const docmvt = dtype;
//     let url, content;

//     if (docmvt == "PICK") {
//       url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/` + docno;
//       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
//       return (
//         <a className="text-white" href={url} target="_blank">
//           {docno}{" "}
//         </a>
//       );
//     }
//     if (docmvt == "DLV") {
//       url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` + docno;
//       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
//       return (
//         <a className="text-white" href={url} target="_blank">
//           {docno}{" "}
//         </a>
//       );
//     }
//     if (docmvt == "PRECEIPT") {
//       url =
//         `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2/M//` + docno;
//       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
//       return (
//         <a className="text-white" href={url} target="_blank">
//           {docno}{" "}
//         </a>
//       );
//     }
//   };

//   render() {


//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header className="modal-header-bg">
//           <Modal.Title id="contained-modal-title-vcenter" className="text-white">
//             Product Details (
//             <span style={{fontWeight: "bold", textDecorationLine: "underline"}}>
//               {this.documentBadgeLink(this.props.docNum, this.props.doctype)}
//             </span>
//             )
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <table class="table table-striped m-0">
//             <thead>
//               <tr class="">
//                 <th width="6%">{this.props.t("prodcode")}</th>
//                 <th width="10%">Product</th>
//                 <th width="6%">Quantity</th>
//                 <th width="6%">Weight</th>
//                 <th width="6%">Volume</th>

//                 {/* <th width="6%">UOM</th> */}
//                 {/* <th width="10%">Line No</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {(this.props.products || []).map((product) => {
//                 return (
//                   <tr>
//                     <td width="6%">{product.productCode}</td>
//                     <td width="10%">{product.productName}</td>
//                     <td width="6%">{product.quantity} {product.uom}</td>
//                     <td width="6%">{parseFloat(product.weight).toFixed(2)} {product.weu}</td>
//                     <td width="6%">{parseFloat(product.volume).toFixed(2)} {product.vou}</td>
                   
//                     {/* <td width="10%">{product.docLineNum}</td> */}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <hr class="m-0 p-0" />
//           {(() => {
//             if (this.props.products.length <= 0) {
//               return (
//                 <div class="col-md-12">
//                   No trailers are configured, you can configure up to 2 trailers
//                 </div>
//               );
//             }
//           })()}
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="button-custom" onClick={this.props.onHide}>
//             Close
//           </button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }

// export default withNamespaces()(DisplayProducts);

import React from "react";
import { Modal } from "react-bootstrap";
import { withNamespaces } from "react-i18next";

class DisplayProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products || [],
      // prodOrder: productCode, productName, quantity, weight, volume
      prodOrder: [-1, -1, -1, -1, -1],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ products: this.props.products || [] });
    }
  }

  documentBadgeLink = (docno, dtype) => {
    let url;
    if (dtype === "PICK")
      url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/${docno}`;
    else if (dtype === "DLV")
      url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/${docno}`;
    else if (dtype === "PRECEIPT")
      url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2/M//${docno}`;

    return (
      <a className="text-white" href={url} target="_blank" rel="noreferrer">
        {docno}{" "}
      </a>
    );
  };

  sortProducts = (type, index) => {
    let products = [...this.state.products];
    let order = [...this.state.prodOrder];

    const isAsc = order[index] === 1;
    order.fill(-1); // reset all others
    order[index] = isAsc ? 0 : 1; // toggle

    const getValue = (obj, key) => {
      const val = obj[key];
      if (["quantity", "weight", "volume"].includes(key)) {
        return parseFloat(val) || 0;
      }
      if (typeof val === "string") {
        return val.toLowerCase();
      }
      return val;
    };

    products.sort((a, b) => {
      const valA = getValue(a, type);
      const valB = getValue(b, type);
      if (valA > valB) return 1;
      if (valA < valB) return -1;
      return 0;
    });

    if (!isAsc) products.reverse();

    this.setState({ products, prodOrder: order });
  };

  render() {
    const { t } = this.props;
    const { products, prodOrder } = this.state;

    const renderSortArrow = (index) => (
      <span style={{ color: prodOrder[index] === -1 ? "gray" : "black" }}>
        {prodOrder[index] === 1 ? '▼' : '▲'}
      </span>
    );

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-bg">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-white"
          >
            Product Details (
            <span
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              {this.documentBadgeLink(this.props.docNum, this.props.doctype)}
            </span>
            )
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped m-0">
            <thead>
              <tr>
                <th
                  width="6%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.sortProducts("productCode", 0)}
                >
                  {t("prodcode")} {renderSortArrow(0)}
                </th>

                <th
                  width="10%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.sortProducts("productName", 1)}
                >
                  Product {renderSortArrow(1)}
                </th>

                <th
                  width="6%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.sortProducts("quantity", 2)}
                >
                  Quantity {renderSortArrow(2)}
                </th>

                <th
                  width="6%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.sortProducts("weight", 3)}
                >
                  Weight {renderSortArrow(3)}
                </th>

                <th
                  width="6%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.sortProducts("volume", 4)}
                >
                  Volume {renderSortArrow(4)}
                </th>
              </tr>
            </thead>

            <tbody>
              {(products || []).map((product, i) => (
                <tr key={`${product.productCode || "p"}_${i}`}>
                  <td width="6%">{product.productCode}</td>
                  <td width="10%">{product.productName}</td>
                  <td width="6%">
                    {product.quantity} {product.uom}
                  </td>
                  <td width="6%">
                    {parseFloat(product.weight || 0).toFixed(2)} {product.weu}
                  </td>
                  <td width="6%">
                    {parseFloat(product.volume || 0).toFixed(2)} {product.vou}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="m-0 p-0" />

          {products.length <= 0 && (
            <div className="col-md-12">
              No trailers are configured, you can configure up to 2 trailers
            </div>
          )}
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
