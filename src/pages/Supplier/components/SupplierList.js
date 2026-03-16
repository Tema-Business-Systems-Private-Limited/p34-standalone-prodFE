import React from "react";


import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideNav_Test from "pages/Scheduler2/Nav1/SideNav_Test";



const SupplierList = ({ supplierList, handleEditSupplier, handleDeleteClick, loader }) => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
                        <tr className="font-bold text-center">
                           
                            <th className="px-6 py-4 font-semibold">Site</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody
                       className="text-gray-800 text-sm divide-y divide-gray-200">

                        {
                            loader
                                ? [...Array(supplierList?.length || 7)].map((_, idx) => (
                                    <tr key={idx} className="animate-pulse text-center odd:bg-gray-50">
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                                        </td>

                                    </tr>
                                ))
                                :

                                supplierList.map((site, index) => (
                                    <tr key={index} className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50">
                                        
                                        <td className="px-6 py-3 whitespace-nowrap">{SideNav_Test.fcy}</td>
                            
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex justify-center gap-2">
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        style={{ color: "orange" }}
                                                        className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                                                        onClick={() => handleEditSupplier(site)}

                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon
                                                        className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                                                        onClick={() => handleDeleteClick(site)}
                                                    />

                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default SupplierList;
