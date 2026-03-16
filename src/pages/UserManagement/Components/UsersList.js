import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Input,
  Button,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import UserDetail from "./UserDetail";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    status: "Active",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    status: "Pending",
    role: "Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    status: "Inactive",
    role: "Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    status: "Missing",
    role: "Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lead Implementation Liaison",
    status: "Active",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Danny Williamson",
    email: "danny.williamson@example.com",
    title: "Internal Applications Engineer",
    status: "Pending",
    role: "Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    status: "Missing",
    role: "Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lead Implementation Liaison",
    status: "Active",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "Danny Williamson",
    email: "danny.williamson@example.com",
    title: "Internal Applications Engineer",
    status: "Pending",
    role: "Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },

  // Add more mock users here...
];

export default function Component(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(props.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Filter users based on search term
  const filteredUsers = props.users?.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayStatus = (xact) => {
    if (xact === 2) return "Active";
    else if (xact === 2) return "Inactive";
    else return "Inactive";
  };

  const statusColor = {
    2: "success",
    0: "warning",
    1: "danger",
    4: "info",
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    toggleDeleteModal();
  };

  const handleEditClick = (user) => {
    props.handleEditUser(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      console.log("deleted user details are", userToDelete);
      props.handleDeleteUser(userToDelete);
      // setUsers(users.filter(user => user.id !== userToDelete.id));
      toggleDeleteModal();
      setUserToDelete(null);
    }
  };

  /*
  const handleAddUser = () => {
    setUserToEdit(null);
    setShowForm(true);
  };

      const handleAddUser = () => {
                 props.handleAddUserClicked();
                  }
                  */

  const handleAddUser = () => {
    console.log("inside handleadduser");
    props.handleAddUserClicked();
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  const handleSaveUser = (user) => {
    if (userToEdit) {
      // Update existing user
      setUsers(users.map((u) => (u.userId === user.userId ? user : u)));
    } else {
      // Add new user
      setUsers([...users, user]);
    }
    setShowForm(false);
    setUserToEdit(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setUserToEdit(null);
  };

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  if (showForm) {
    return (
      <Container className="mt-5">
        <UserDetail
          user={userToEdit}
          onSave={handleSaveUser}
          onCancel={handleCancelForm}
        />
      </Container>
    );
  }
  const getUserRoleName = (roleCode) => {
    switch (roleCode) {
      case 1:
        return "Admin";
      case 2:
        return "Super User";
      case 3:
        return "User";
      case 4:
        return "Viewer";
      default:
        return "Unknown";
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case 1:
        return "bg-purple-500 text-white";
      case "user":
        return "bg-blue-100 text-blue-800";
      case "viewer":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-5">


      <div className="flex justify-end items-center gap-4 mb-6 w-full">
        {/* Search Bar with Icon inside */}
        <div className="relative flex-shrink-0" style={{ width: '600px' }}>
          <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
              <tr className='font-bold text-center'>
                <th cclassName="px-6 py-4 font-semibold">User ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Primary Language</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr
                  key={user.xlogin}
                  className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                >
                  <td className="px-6 py-3 font-medium whitespace-nowrap">
                    {user.xlogin}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {user.xusrname}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {user.lngmain}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${user.xact === 2
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {displayStatus(user.xact)}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-gray-600">Super User</td> */}
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {getUserRoleName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <EditIcon
                      style={{ color: "orange" }}
                      className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                      onClick={() => handleEditClick(user)}
                    ></EditIcon>
                    <DeleteIcon
                      className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                      onClick={() => handleDeleteClick(user)}
                    ></DeleteIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination className="flex justify-end mt-4">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
        </PaginationItem>
        {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map(
          (_, index) => (
            <PaginationItem key={index} active={index + 1 === currentPage}>
              <PaginationLink onClick={() => paginate(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem
          disabled={
            currentPage === Math.ceil(filteredUsers.length / usersPerPage)
          }
        >
          <PaginationLink next onClick={() => paginate(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the user: {userToDelete?.xlogin}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            No
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
