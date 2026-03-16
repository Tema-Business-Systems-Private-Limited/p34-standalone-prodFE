import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";   
import CloseIcon from "@mui/icons-material/Close";   
import { newDocumentClassObj } from "../index";


const DocumentList = ({
    documentList,
    handleEditRoute,
    handleDeleteClick,
    handleAddDocument,
    loader,
    isAdding,
    setIsAdding,
}) => {
    const [newDoc, setNewDoc] = React.useState({ ...newDocumentClassObj });

    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-sm tracking-wider shadow-sm">
                        <tr className="text-center font-semibold">
                            <th className="px-6 py-4">SR NO</th>
                            <th className="px-6 py-4">DOCUMENT TYPE</th>
                            <th className="px-6 py-4">ROUTE PLANNER LABEL (ENG)</th>
                            <th className="px-6 py-4">ROUTE PLANNER LABEL (FRA)</th>
                            <th className="px-6 py-4">ADDITIONAL SERVICE TIME (HRS)</th>
                            <th className="px-6 py-4">STYLE</th>
                            <th className="px-6 py-4">ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                        {/* Inline Add Row */}
                        {isAdding && (
                            <tr className="bg-yellow-50 text-center">
                                <td className="px-6 py-3">New</td>
                                <td className="px-6 py-3">
                                    <input
                                        value={newDoc.xdocTyp}
                                        onChange={(e) =>
                                            setNewDoc({ ...newDoc, xdocTyp: e.target.value })
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Type"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        value={newDoc.xroutag}
                                        onChange={(e) =>
                                            setNewDoc({ ...newDoc, xroutag: e.target.value })
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Eng Label"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        value={newDoc.xroutagFra}
                                        onChange={(e) =>
                                            setNewDoc({ ...newDoc, xroutagFra: e.target.value })
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Fra Label"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        value={newDoc.x10cServt}
                                        onChange={(e) =>
                                            setNewDoc({
                                                ...newDoc,
                                                x10cServt: e.target.value,
                                            })
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Hours"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        value={newDoc.xstyZon}
                                        onChange={(e) =>
                                            setNewDoc({ ...newDoc, xstyZon: e.target.value })
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                        placeholder="Style"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <div className="flex justify-center gap-2">
                                        <Tooltip title="Save">
                                            <IconButton
                                                style={{ color: "green" }}
                                                onClick={() => {
                                                    handleAddDocument(newDoc);
                                                    setNewDoc({ ...newDocumentClassObj });
                                                    setIsAdding(false);
                                                }}
                                            >
                                                <CheckIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancel">
                                            <IconButton
                                                style={{ color: "red" }}
                                                onClick={() => setIsAdding(false)}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Normal Rows */}
                        {loader
                            ? [...Array(documentList?.length || 6)].map((_, idx) => (
                                  <tr
                                      key={idx}
                                      className="animate-pulse text-center odd:bg-gray-50"
                                  >
                                      {[...Array(7)].map((__, i) => (
                                          <td key={i} className="px-6 py-3">
                                              <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                                          </td>
                                      ))}
                                  </tr>
                              ))
                            : documentList.map((route, index) => (
                                  <tr
                                      key={index}
                                      className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                                  >
                                      <td className="px-6 py-3">{index + 1}</td>
                                      <td className="px-6 py-3">{route.xdocTyp}</td>
                                      <td className="px-6 py-3">{route.xroutag}</td>
                                      <td className="px-6 py-3">{route.xroutagFra}</td>
                                      <td className="px-6 py-3">{route.x10cServt}</td>
                                      <td className="px-6 py-3">{route.xstyZon}</td>
                                      <td className="px-6 py-3">
                                          <div className="flex justify-center gap-2">
                                              <Tooltip title="Edit">
                                                  <IconButton
                                                      style={{ color: "orange" }}
                                                      onClick={() => handleEditRoute(route)}
                                                  >
                                                      <EditIcon fontSize="small" />
                                                  </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Delete">
                                                  <IconButton
                                                      style={{ color: "red" }}
                                                      onClick={() => handleDeleteClick(route)}
                                                  >
                                                      <DeleteIcon fontSize="small" />
                                                  </IconButton>
                                              </Tooltip>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentList;
