import React from 'react'
import {withTranslation} from 'react-i18next';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  TabPane,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";

class ProductsDetailList extends React.Component {

constructor(props)
{
  super(props);
}




    render() {

           return (
             <Card>
                       <CardTitle className="float-left h4 mb-0 pt-2" style={{'color':'#5664d2', 'paddingLeft': '20px'}}>
                                                       <span>Product Details</span>

                                                     </CardTitle>

                                          <CardBody className="p-2">


                                     <div className="tablheight">
                      <table class="table table-striped m-0 tablewidth1200" id="diagnosis_list">
                                                                                           <thead style = {{textAlign: 'left'}}>
                                                                                               <tr>
                                                                                                   <th width="3%" class="pl-2"> {'Seq'}</th>

                                                                                                   <th width="6%"> {'Transaction No'}</th>
                                                                                                   <th width="auto"> {'ProductLists'}</th>
                                                                                                   <th width="6%"> {'Type'}</th>
                                                                                                   <th width="6%"> {'Client Code'}</th>
                                                                                                   <th width="6%"> {'Client'}</th>
                                                                                                   <th width="6%"> {'City'}</th>
                                                                                                   <th width="6%"> {'Capacity'}</th>
                                                                                                   <th width="6%"> {'Volume'}</th>
                                                                                               </tr>
                                                                                           </thead>
                                                                                           <tbody>
                                                                                               {(this.props.tripdetails && this.props.tripdetails.totalObject && this.props.tripdetails.totalObject.selectedTripData && this.props.tripdetails.totalObject.selectedTripData.length > 0 && this.props.tripdetails.totalObject.selectedTripData || []).map((data, i) => {
                                                                                                   return (
                                                                                                       <tr key={data.docnum} style={{  textAlign: 'left' }} >
                                                                                                           <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{i+1}</span></td>
                                                                                                           <td width="6%" name="docNum">
                                                                                                               {data.docnum}
                                                                                                           </td>

                                                                                                           <td style={{width : "100%" }} >
                                                                                                             <tr>
                                                                                                                <th>Prod code</th>
                                                                                                                <th>Prod Name</th>
                                                                                                                <th>Prod Category</th>
                                                                                                                <th>Qty</th>
                                                                                                              </tr>
                                                                                                            {data.products.map((prd) =>
                                                                                                           <tr>
                                                                                                              <td>{prd.productCode}</td>
                                                                                                              <td>{prd.productName}</td>
                                                                                                              <td>{prd.productCateg}</td>
                                                                                                              <td>{prd.quantity} {prd.uom}</td>
                                                                                                           </tr>
                                                                                                           )}</td>
                                                                                                           <td width="6%">{data.doctype ? data.doctype : data.movtype}</td>
                                                                                                           <td width="6%">{data.bpcode}</td>
                                                                                                           <td width="6%">{data.bpname}</td>
                                                                                                           <td width="6%">{ data.poscode} , {data.city}</td>
                                                                                                           <td width="6%">{data.netweight} {data.weightunit}</td>
                                                                                                           <td width="6%">{data.volume} {data.volume_unit}</td>
                                                                                                       </tr>
                                                                                                   );
                                                                                               })}
                                                                                           </tbody>
                                                                                       </table>

                       </div>
                                      </CardBody>
                                  </Card>
                );
        }

}
export default ProductsDetailList;