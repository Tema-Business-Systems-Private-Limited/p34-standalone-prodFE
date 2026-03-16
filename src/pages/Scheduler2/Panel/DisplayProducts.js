import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

class DisplayProducts extends React.Component {

      documentBadgeLink = (docno, dtype) => {
              const docmvt = dtype;
              let url, content;

              if (docmvt == 'PICK') {
                   url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a style={{color: "white"}} href={url} target='_blank'>{docno} </a>
                   );
              }
              if (docmvt == 'DLV') {

                       url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/"+docno;
                      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                  return (
                           <a style={{color: "white"}} href={url} target='_blank'>{docno} </a>
                  );
              }
              if (docmvt == 'PRECEIPT') {
                   url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//"+docno;
                                       // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
                                   return (
                                            <a style={{color: "white"}} href={url} target='_blank'>{docno} </a>
                                   );
              }
          }

    render() {

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='modal-header-bg'>{this.props.t('Product Details')} ({this.documentBadgeLink(this.props.docNum, this.props.doctype)})</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-bg'>
                <table class="table table-striped m-0">
                    <thead>
                        <tr class="">
                             <th width="6%">{this.props.t('prodcode')}</th>
                             <th width="10%">{this.props.t('Product')}</th>
                             <th width="6%">{this.props.t('qty')}</th>
                             <th width="6%">{this.props.t('UOM')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.products || []).map((product) => {

                            return (
                                <tr>
                                    <td width="6%">{ product.productCode}</td>
                                    <td width="10%">{ product.productName}</td>
                                    <td width="6%">{ product.quantity}</td>
                                    <td width="6%">{ product.uom}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <hr class="m-0 p-0" />
                {/* <h4>Skills : {this.props.skills}</h4> */}

                {(() => {
                    if (this.props.products.length <= 0) {
                        return (
                            <div class="col-md-12">
                                Products List is Empty
                            </div>
                        );
                    }
                })()}
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button className='button-custom' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(DisplayProducts);