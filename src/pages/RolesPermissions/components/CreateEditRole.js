import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEditRole() {
  const { roleId } = useParams(); // if present → edit mode
  const history = useHistory();

  const isEdit = Boolean(roleId);

  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // ✅ restored full modules list
  const [modules, setModules] = useState([
    { id: 1, name: "Dashboard", checked: false },
    { id: 2, name: "Users", checked: false },
    { id: 3, name: "Reports", checked: false },
    { id: 4, name: "Settings", checked: false },
    { id: 5, name: "Roles & Permissions", checked: false },
    { id: 6, name: "Site Configuration", checked: false },
    { id: 7, name: "Customer", checked: false },
    { id: 8, name: "Supplier", checked: false },
    { id: 9, name: "Product", checked: false },
    { id: 10, name: "Miscellaneous Stop", checked: false },
    { id: 11, name: "Document Configuration", checked: false },
    { id: 12, name: "Route Cancellation", checked: false },
    { id: 13, name: "Prerecipt", checked: false },
    { id: 14, name: "Sales Order", checked: false },
  ]);

  const [errors, setErrors] = useState({});

  // Prefill for edit
  useEffect(() => {
    if (isEdit) {
      // In real app fetch by id
      const existingRole = {
        role: "Admin",
        description: "Has access to everything",
        isActive: true,
        modules: [1, 2, 3, 5, 6, 7],
      };

      setRole(existingRole.role);
      setDescription(existingRole.description);
      setIsActive(existingRole.isActive);
      setModules((prev) =>
        prev.map((m) => ({
          ...m,
          checked: existingRole.modules.includes(m.id),
        }))
      );
    }
  }, [isEdit, roleId]);

  // Validation
  const validate = () => {
    let errs = {};
    if (!role.trim()) errs.role = "Role is required";
    if (!description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      role,
      description,
      isActive,
      modules: modules.filter((m) => m.checked).map((m) => m.id),
    };

    if (isEdit) {
      toast.success("Role updated successfully!");
      console.log("Updating role:", roleId, payload);
    } else {
      toast.success("Role created successfully!");
      console.log("Creating role:", payload);
    }

    history.push("/rolespermissions");
  };

  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Row>
          <Col xs="12">
            <Card className="shadow-lg rounded-2xl">
              <CardBody>
                {/* Header */}
                <Row className="mb-4">
                  <Col md="8" className="d-flex align-items-center">
                    <h2 className="h1 mb-0 text-black text-3xl font-bold">
                      {isEdit ? "Edit Role" : "Create Role"}
                    </h2>
                  </Col>
                  <Col
                    md="4"
                    className="d-flex justify-content-end align-items-center space-x-2"
                  >
                    {/* ✅ Save/Create first, Cancel second */}
                    <Button
                      color="success"
                      className="rounded-xl shadow-md mr-2"
                      onClick={handleSubmit}
                    >
                      {isEdit ? "Save" : "Create"}
                    </Button>
                    <Button
                      color="secondary"
                      className="rounded-xl shadow-md"
                      onClick={() => history.push("/rolespermissions")}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>

                {/* Form */}
                <Row>
                  <Col md="2">
                    <FormGroup>
                      <Label className="form-label font-semibold">Role</Label>
                      <Input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter role name"
                        className={`rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                          errors.role ? "border-red-500" : ""
                        }`}
                      />
                      {errors.role && (
                        <small className="text-red-500">{errors.role}</small>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="9">
                    <FormGroup>
                      <Label className="form-label font-semibold">
                        Description
                      </Label>
                      <Input
                        type="textarea"
                        rows="1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter role description"
                        className={`rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                          errors.description ? "border-red-500" : ""
                        }`}
                      />
                      {errors.description && (
                        <small className="text-red-500">
                          {errors.description}
                        </small>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="1" className="d-flex align-items-center">
                    <FormGroup check>
                      <Label check className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">
                          Active
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Modules */}
                <Row className="mt-4">
                  <Col>
                    <h5 className="font-bold mb-3">Modules</h5>
                    <Row>
                      {modules.map((mod) => (
                        <Col md="3" key={mod.id} className="mb-3">
                          <FormGroup check>
                            <Label check className="flex items-center space-x-2">
                              <Input
                                type="checkbox"
                                checked={mod.checked}
                                onChange={(e) =>
                                  setModules((prev) =>
                                    prev.map((m) =>
                                      m.id === mod.id
                                        ? { ...m, checked: e.target.checked }
                                        : m
                                    )
                                  )
                                }
                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-gray-700 font-medium">
                                {mod.name}
                              </span>
                            </Label>
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}
