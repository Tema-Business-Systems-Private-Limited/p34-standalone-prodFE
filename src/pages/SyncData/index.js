import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchSyncAllData,
  fetchSyncProductData,
  fetchSyncCategoryData,
  fetchSyncCustomerData,
  fetchSyncCustomerAddressData,
  fetchSyncSiteData,
} from "../../service";

export default function SyncData() {
  const [syncData, setSyncData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Load all sync status
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchSyncAllData();
      const data = response.data;

      const rows = [
        {
          id: "customerAddress",
          item: "Customer Address",
          erp: data.customerAddress.erp,
          tms: data.customerAddress.tms,
        },
        {
          id: "site",
          item: "Site",
          erp: data.site.erp,
          tms: data.site.tms,
        },
        {
          id: "product",
          item: "Product",
          erp: data.product.erp,
          tms: data.product.tms,
        },
        {
          id: "category",
          item: "Category",
          erp: data.category.erp,
          tms: data.category.tms,
        },
        {
          id: "customer",
          item: "Customer",
          erp: data.customer.erp,
          tms: data.customer.tms,
        },
      ];

      setSyncData(rows);
    } catch (error) {
      toast.error("Failed to fetch sync data");
    } finally {
      setLoading(false);
    }
  };

  // Map item -> API function
  const syncApiMap = {
    product: fetchSyncProductData,
    category: fetchSyncCategoryData,
    customer: fetchSyncCustomerData,
    customerAddress: fetchSyncCustomerAddressData,
    site: fetchSyncSiteData,
  };

  // Handle Sync (for individual row)
  const handleSync = async (record) => {
    const apiFunc = syncApiMap[record.id];
    if (!apiFunc) {
      toast.warn(`No API available for ${record.item}`);
      return;
    }

    setLoading(true);
    try {
      await apiFunc();
      toast.success(`${record.item} synced successfully!`);
      await loadData();
    } catch (error) {
      toast.error(`Failed to sync ${record.item}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Sync All for parellel calls
  // const handleSyncAll = async () => {
  //   setLoading(true);
  //   try {
  //     const promises = syncData.map(async (record) => {
  //       const apiFunc = syncApiMap[record.id];
  //       if (!apiFunc) return;

  //       try {
  //         await apiFunc();
  //         toast.info(`${record.item} synced`);
  //       } catch {
  //         toast.error(`Failed to sync ${record.item}`);
  //       }
  //     });

  //     await Promise.all(promises);
  //     toast.success("All data sync attempt completed!");
  //     await loadData();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle Sync All for sequential calls
  const handleSyncAll = async () => {
    setLoading(true);
    try {
      for (let record of syncData) {
        const apiFunc = syncApiMap[record.id];
        if (apiFunc) {
          try {
            await apiFunc();
            toast.info(`${record.item} synced`);
          } catch (err) {
            toast.error(`Failed to sync ${record.item}`);
          }
        }
      }
      toast.success("All data sync attempt completed!");
      await loadData();
    } finally {
      setLoading(false);
    }
  };



  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {/* Header */}
                  <Row style={{ height: "60px" }} className="mb-4">
                    <Col md="6" className="d-flex align-items-center">
                      <h2 className="h1 mb-0 text-black text-3xl font-bold">
                        Sync Data from ERP
                      </h2>
                    </Col>
                    <Col
                      md="6"
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        color="success"
                        onClick={handleSyncAll}
                        disabled={loading}
                      >
                        Sync All
                      </Button>
                    </Col>
                  </Row>

                  {/* Table */}
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table
                        className="min-w-full text-left border-collapse"
                        bordered
                      >
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
                          <tr className="font-bold text-center">
                            <th className="px-6 py-4 font-semibold">Item</th>
                            <th className="px-6 py-4 font-semibold">ERP</th>
                            <th className="px-6 py-4 font-semibold">TMS</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                          {syncData.map((record) => (
                            <tr
                              key={record.id}
                              className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                            >
                              {/* <td className="px-6 py-3">{record.item}</td> */}
                              <td className="px-6 py-3">
                                <Link
                                  to={`/syncdata/${record.id}`}
                                  className="text-blue-600 hover:underline font-medium"
                                >
                                  {record.item}
                                </Link>
                              </td>
                              <td className="px-6 py-3">{record.erp}</td>
                              <td className="px-6 py-3">{record.tms}</td>
                              <td className="px-6 py-3">
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() => handleSync(record)}
                                  disabled={loading}
                                >
                                  Sync
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
