import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DriverListComp = ({ driverList, handleEditDriver, handleDeleteClick, loader }) => {
  const displayStatus = (activeFlag) => {
    return activeFlag === 2 ? "Active" : "Inactive";
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
            <tr className="font-bold text-center">
              <th className="px-6 py-4 font-semibold">Driver ID</th>
              <th className="px-6 py-4 font-semibold">Driver Name</th>
              <th className="px-6 py-4 font-semibold">Carrier</th>
              <th className="px-6 py-4 font-semibold">Site</th>
              <th className="px-6 py-4 font-semibold">Active</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
            {loader
              ? [...Array(driverList?.length || 7)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse text-center odd:bg-gray-50">
                    {Array.from({ length: 6 }).map((__, i) => (
                      <td key={i} className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : driverList?.map((driver, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-medium whitespace-nowrap">{driver.driverId}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{driver.driver}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{driver.bptnum}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{driver.fcy}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          driver.active === 2
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {displayStatus(driver.active)}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <EditIcon
                        style={{ color: "orange" }}
                        className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                        onClick={() => handleEditDriver(driver)}
                      />
                      <DeleteIcon
                        className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                        onClick={() => handleDeleteClick(driver)}
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

export default DriverListComp;
