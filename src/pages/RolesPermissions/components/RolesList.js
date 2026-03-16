import React from "react";
import { withRouter } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    Table,
    Button,
} from "reactstrap";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function RolesList({ history }) {
    const roles = [
        {
            id: 1,
            name: "Admin",
            description: "Has access to all modules",
            status: "Active",
        },
        {
            id: 2,
            name: "Manager",
            description: "Can manage teams and approve requests",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Viewer",
            description: "Read-only access",
            status: "Active",
        },
    ];

    const statusColor = {
        Active: "bg-green-500 text-white",
        Inactive: "bg-gray-500 text-white",
        Pending: "bg-yellow-500 text-white",
    };

    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardBody>
                        {/* Header */}
                        <Row style={{ height: "60px" }} className="mb-4">
                            <Col md="10" className="d-flex align-items-center">
                                <h2 className="h1 mb-0 text-black text-3xl font-bold">
                                    Roles and Permissions
                                </h2>
                            </Col>
                            <Col
                                md="2"
                                className="d-flex justify-content-end align-items-center"
                            >
                                <Button
                                    color="success"
                                    onClick={() => history.push("/rolespermissions/create")}
                                >
                                    Create New Role
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
                                            <th className="px-6 py-4 font-semibold">Role</th>
                                            <th className="px-6 py-4 font-semibold">Description</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                                        {roles.map((role) => (
                                            <tr
                                                key={role.id}
                                                className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                                            >
                                                <td className="px-6 py-3">{role.name}</td>
                                                <td className="px-6 py-3">{role.description}</td>
                                                <td className="px-6 py-3">
                                                    <span
                                                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${statusColor[role.status]}`}
                                                    >
                                                        {role.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap">
                                                    <EditIcon
                                                        style={{ color: "orange" }}
                                                        className="cursor-pointer"
                                                        onClick={() => history.push(`/rolespermissions/edit/${role.id}`)}
                                                    />
                                                    <DeleteIcon
                                                        style={{ cursor: "pointer" }}
                                                        className="inline-flex items-center text-sm text-red-600 hover:text-red-800 transition"
                                                        onClick={() => console.log("Delete", role)}
                                                    />
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
    );
}

export default withRouter(RolesList);
