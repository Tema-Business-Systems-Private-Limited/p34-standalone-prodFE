import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  Label,
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { fetchAllSites, getUsername, updateSite } from "../../../service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SiteDetail() {
  const { siteId } = useParams();
  const history = useHistory();

  const [site, setSite] = useState(null);
  const [formData, setFormData] = useState({
    siteId: "",
    siteName: "",
    xtmsfcy: 0,
    bpaadd: "",
    xadd: "",
    fcysho: "",
    xadddes: "",
    // state: "",
    cry: "",
    // pincode: "",
    xx10cGeox: "",
    xx10cGeoy: "",
    locategeoby: "Manual",
    updusr: "",
    xupdusr: "",
    upddat: "",
    xupdate: "",
    credattim: "",
    upddattim: "",
    x1cgeoso: 0,
    rowid: 0
  });

  // Fetch sites
  useEffect(() => {
    const loadSite = async () => {
      try {
        const allSites = await fetchAllSites();
        const foundSite = allSites.data.find((s) => s.siteId === siteId);
        setSite(foundSite);
      } catch (err) {
        toast.error("Failed to load sites");
        console.error(err);
      }
    };
    loadSite();
  }, [siteId]);

  // Map backend object to formData
  useEffect(() => {
    if (site) {
      setFormData({
        siteId: site.siteId || "",
        siteName: site.siteName || "",
        xtmsfcy: site.xtmsfcy || 0,
        xadd: site.xadd || "",
        bpaadd: site.bpaadd || "",
        fcysho: site.fcysho || "",
        xadddes: site.xadddes || "",
        // state: "", // not in API
        cry: site.cry || "",
        // pincode: "", // not in API
        xx10cGeox: site.xx10cGeox || "",
        xx10cGeoy: site.xx10cGeoy || "",
        locategeoby: site.locategeoby || "Manual",
        updusr: site.updusr || getUsername(),
        xupdusr: site.xupdusr || getUsername(),
        upddat: site.upddat || "",
        xupdate: site.xupdate || "",
        credattim: site.credattim || "",
        upddattim: site.upddattim || "",
        x1cgeoso: site.x1cgeoso || 0,
        rowid: site.rowid || 0
      });
    }
  }, [site]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        updusr: getUsername(),
        xupdusr: getUsername(),
        upddat: new Date(),
      };
      await updateSite(payload);
      toast.success("Site updated successfully!");
      history.goBack();
    } catch (err) {
      toast.error("Failed to update site");
      console.error(err);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            xx10cGeox: pos.coords.latitude,
            xx10cGeoy: pos.coords.longitude,
            locategeoby: "Auto",
            updusr: getUsername(),
            xupdusr: getUsername(),
            upddat: new Date(),
          }));
          toast.info("Location updated automatically");
        },
        (err) => {
          toast.error("Failed to get location");
          console.error(err);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card className="shadow-2xl rounded-2xl">
                <CardHeader className="d-flex justify-content-between items-center bg-gradient-to-r from-gray-100 to-gray-200">
                  <h2 className="h4 font-bold text-black mb-0">
                    Site Detail - {formData.siteId}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      color="success"
                      className="px-4 py-2 rounded-full font-semibold"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      color="secondary"
                      className="px-4 py-2 rounded-full font-semibold"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="info"
                      className="px-4 py-2 rounded-full font-semibold"
                      onClick={handleLocate}
                    >
                      Locate
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  {/* Row 1: Site ID, Description + TMS Flag */}
                  <Row className="mb-4">
                    <Col md="2">
                      <Label>Site ID</Label>
                      <Input
                        type="text"
                        value={formData.siteId}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="6">
                      <Label>Site Description</Label>
                      <Input
                        type="text"
                        value={formData.siteName}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="1"></Col>
                    <Col md="3" className="d-flex align-items-center">
                      <Label className="me-2 mb-0">TMS Flag</Label>
                      <Input
                        type="checkbox"
                        checked={formData.xtmsfcy === 2}
                        onChange={(e) =>
                          handleChange("xtmsfcy", e.target.checked ? 2 : 0)
                        }
                      />
                    </Col>
                  </Row>

                  {/* Row 2: Address details (read-only) */}
                  <Row className="mb-4">
                    <Col md="2">
                      <Label>Address 1</Label>
                      <Input
                        type="text"
                        value={formData.bpaadd}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Address 2</Label>
                      <Input
                        type="text"
                        value={formData.xadd}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>City</Label>
                      <Input
                        type="text"
                        // value={formData.cry}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>State</Label>
                      <Input
                        type="text"
                        // value={formData.state}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Country</Label>
                      <Input
                        type="text"
                        value={formData.cry}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Pincode</Label>
                      <Input
                        type="text"
                        // value={formData.pincode}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                  </Row>

                  {/* Row 3: Latitude, Longitude, Locate Type, Updated Info */}
                  <Row className="mb-4">
                    <Col md="2">
                      <Label>Latitude</Label>
                      <Input
                        type="text"
                        value={formData.xx10cGeox}
                        onChange={(e) =>
                          handleChange("xx10cGeox", e.target.value)
                        }
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Longitude</Label>
                      <Input
                        type="text"
                        value={formData.xx10cGeoy}
                        onChange={(e) =>
                          handleChange("xx10cGeoy", e.target.value)
                        }
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Locate (Auto / Manual)</Label>
                      <Input
                        type="text"
                        value={formData.locategeoby}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Updated By</Label>
                      <Input
                        type="text"
                        value={formData.updusr}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Updated By User</Label>
                      <Input
                        type="text"
                        value={formData.xupdusr}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                    <Col md="2">
                      <Label>Updated Date</Label>
                      <Input
                        type="text"
                        value={formData.upddat ? moment(formData.upddat).format("MM-DD-YYYY") : ""}
                        readOnly
                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
