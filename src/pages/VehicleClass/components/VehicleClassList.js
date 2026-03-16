import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const VehicleClassList = ({ loader, currentItems, handleEditVehicle, handleDeleteClick }) => {

    const displayStatus = (enaFlag) => {
        if (enaFlag === 2)
            return "Active";
        else
            return "Inactive";
    };
    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
                        <tr className='font-bold text-center'>
                            <th className="px-6 py-4 font-semibold">Class Code</th>
                            <th className="px-6 py-4 font-semibold">Description</th>
                            <th className="px-6 py-4 font-semibold">Active</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                        {
                            loader
                                ? [...Array(currentItems?.length || 5)].map((_, idx) => (
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
                                        <td className="px-6 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                                        </td>

                                    </tr>
                                )) : currentItems?.map((order, index) => (
                                    <tr key={index}
                                        className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                                    >
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{order.className}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">{order.desc}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${order.enaFlag === 2 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                    }`}
                                            >
                                                {displayStatus(order.enaFlag)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">{order.typ === 1 ? "Single Unit" : "Multi Unit"}</td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <EditIcon
                                                style={{ color: "orange" }}
                                                className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                                                onClick={() => handleEditVehicle(order)}
                                            />
                                            <DeleteIcon
                                                className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                                                onClick={() => handleDeleteClick(order)}
                                            />
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default VehicleClassList;