import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";

const VehicleAllocationList = ({
  VehicleAllocationList,
  handleEditVehicle,
  handleDeleteClick,
  loader,
}) => {
  console.log(VehicleAllocationList, "this is list checking here 8");

  const activeStatus = (status) => {
    if (status === 1) {
      return { text: "Open", colorClass: "bg-blue-500" };
    } else if (status === 2) {
      return { text: "Allocated", colorClass: "bg-green-500" };
    } else if (status === 3) {
      return { text: "Deallocated", colorClass: "bg-yellow-500" };
    } else if (status === 4) {
      return { text: "Returned", colorClass: "bg-red-500" };
    } else {
      return { text: "Not Specified", colorClass: "bg-gray-500" };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
            <tr className="font-bold text-center">
              <th className="px-6 py-4 font-semibold">Vehicle</th>
              <th className="px-6 py-4 font-semibold">Driver</th>
              <th className="px-6 py-4 font-semibold">Start Date</th>
              <th className="px-6 py-4 font-semibold">End Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
            {loader
              ? [...Array(VehicleAllocationList?.length || 7)].map((_, idx) => (
                  <tr
                    key={idx}
                    className="animate-pulse text-center odd:bg-gray-50"
                  >
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
                    <td className="px-6 py-3">
                      <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                    </td>
                  </tr>
                ))
              : VehicleAllocationList?.map((veh, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-medium whitespace-nowrap">
                      {veh.vehicleNumber}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {veh.driverId}
                    </td>
                    {/* <td className="px-6 py-3 whitespace-nowrap">{veh.startDate
}</td> */}
                    <td>
                      {" "}
                      {veh.startDate !== "1753-01-01T00:00:00.000+00:00"
                        ? moment(veh.startDate).format("MM/DD/YY")
                        : ""}
                    </td>
                    {/* <td className="px-6 py-3 whitespace-nowrap">{veh.endDate
}</td>
 */}

                    <td>
                      {veh.endDate !== "1753-01-01T00:00:00.000+00:00"
                        ? moment(veh.endDate).format("MM/DD/YY")
                        : ""}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          activeStatus(veh.status).colorClass
                        } text-white`}
                      >
                        {activeStatus(veh.status).text}
                      </span>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      <EditIcon
                        style={{ color: "orange" }}
                        className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                        onClick={() => handleEditVehicle(veh)}
                      />
                      <DeleteIcon
                        className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                        onClick={() => handleDeleteClick(veh.transactionNumber)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleAllocationList;
