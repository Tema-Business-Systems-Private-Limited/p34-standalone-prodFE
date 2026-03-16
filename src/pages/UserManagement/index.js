// import React, { Component } from 'react';
// import "react-toastify/dist/ReactToastify.css";
// import LoadingOverlay from "react-loading-overlay";
// import UsersList from './Components/UsersList';
// import UserDetail from './Components/UserDetail';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchgetUserDetailsByID, fetchgetDataUserManagement } from '../../service';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   ButtonGroup,
//   Button,
//   Input,
//   Label,
//   FormGroup,
//   Table,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
// } from "reactstrap";

// const apiUrl = process.env.REACT_APP_API_URL;

// export default class UserManagement extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loader: false,
//       users: [],
//       addUser: false,
//       editUser: false,
//       selectedUser: '',
//       sites: [],
//       selectedUserDetails: {},
//       listusers: "block",
//       detailuser: "none",
//     }
//   }


//   componentDidMount() {
//     // Set loader to true before fetching
//     this.setState({
//       loader: true
//     });

//     // Fetch data and handle the response
//     fetchgetDataUserManagement()
//       .then(([res1, res2]) => {
//         // Once data is received, update the state
//         this.setState({
//           users: res1,
//           sites: res2,
//           loader: false
//         });
//       })
//       .catch((error) => {
//         // Handle any errors, and ensure loader is set to false
//         console.error('Error fetching data:', error);
//         this.setState({
//           loader: false
//         });
//       });
//   }


//   handleEditUser = (user) => {
//     this.setState({
//       loader: true
//     });
//     console.log("User details are", user);

//     fetchgetUserDetailsByID(user.xlogin)
//       .then(([res1]) => {
//         /*
//               if(status1 === 200 && status2 === 200 && status3 === 200){
//                        this.setState({loading: false})
//               }
//               */

//         console.log("result", res1)
//         this.setState({
//           selectedUser: user.xlogin,
//           selectedUserDetails: res1,
//           loader: false,
//           detailuser: "block",
//           listusers: "none"
//         });
//       })
//   }


//   handleAddUserClicked = () => {
//     console.log("AT index ")
//     this.setState({
//       selectedUser: '',
//       selectedUserDetails: {},
//       detailuser: "block",
//       listusers: "none"
//     })
//   }


//   handleDeleteUser = (user) => {
//     this.setState({
//       loader: true
//     })
//     let tempuser = user.xlogin;
//     console.log("User details are updating", user)
//     fetch(`${apiUrl}/api/v1/user/delete/${tempuser}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     }).then((response) => {
//       console.log("after allocation submit", response);
//       if (response.status === 200) {
//         this.notifySucess("User is deleted successfully");
//         this.refreshAllPanels();
//       } else {
//         this.notifyError("Deletion is Failed");
//         this.setState({
//           loader: false
//         })
//       }
//     });


//   }



//   onCancel = () => {

//     this.setState({
//       detailuser: "none",
//       listusers: "block",
//       selectedUser: '',
//       selectedUserDetails: {},
//     })
//   }


//   refreshAllPanels = () => {
//     this.setState({
//       loader: true
//     })


//     fetchgetDataUserManagement()
//       .then(([res1, res2]) => {
//         this.setState({
//           users: res1,
//           sites: res2,
//           loader: false,
//           detailuser: "none",
//           listusers: "block",

//         })
//       })

//   }



//   notifySucess = (message) => toast.success(message, { autoClose: 3000 });

//   notifyError = (message) => toast.error(message, { autoClose: 3000 });

//   SubmitUserDetails = (user) => {

//     if (this.state.selectedUser) {
//       let tempuser = user.xlogin;
//       console.log("User details are updating", user)
//       fetch(`${apiUrl}/api/v1/user/update/${this.state.selectedUser}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       }).then((response) => {
//         console.log("after allocation submit", response);
//         if (response.status === 200) {
//           this.notifySucess("User is updated successfully");
//           this.refreshAllPanels();
//         } else {
//           this.notifyError("Updating the user details are Failed");
//           this.setState({
//             loader: false
//           })
//         }

//       });
//     }
//     else {
//       console.log("User details are creating ", user);
//       fetch(`${apiUrl}/api/v1/transport/createuser`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       }).then((response) => {
//           response.json().then((res)=>{
//           if (response.status === 200) {
//           this.notifySucess("User Creation is successfull");
//           this.refreshAllPanels();
//         } else {
//           this.notifyError(res.Error || "User Creation failed");
//         }
//         }).catch((err)=>{
//           console.log("Error Parsing JSON:",err);
//           this.notifyError("Invalid Server Response");
//         })
//       });
//     }
//   }


//   render() {

//     console.log("User loader are", this.state.loader)
//     return (<React.Fragment>
//       <div className="page-content pb-0">
//         <ToastContainer />
//         <Container fluid>
//           <LoadingOverlay
//             active={this.state.loader}
//             spinner
//             text="Loading please wait..."
//           >
//             <Row>
//               <Col xs="12">
//                 <Card>
//                   <CardBody>
//                     <Row style={{ backgroundColor: "currentcolor", height: "50px" }}>
//                       <Col md="6" className="d-flex align-items-center">
//                         <CardTitle className="h1 mb-0 " style={{ color: "white" }}>
//                           User Management
//                         </CardTitle>
//                       </Col>
//                     </Row>
//                     <section style={{ display: this.state.listusers }}>
//                       <UsersList
//                         users={this.state.users}
//                         handleAddUserClicked={this.handleAddUserClicked}
//                         handleEditUser={this.handleEditUser}
//                         handleDeleteUser={this.handleDeleteUser}
//                       />
//                     </section>
//                     <section style={{ display: this.state.detailuser }}>
//                       <UserDetail
//                         selectedUser={this.state.selectedUser}
//                         selectedUserDetails={this.state.selectedUserDetails}
//                         editUser={this.state.editUser}
//                         onSave={this.SubmitUserDetails}
//                         onCancel={this.onCancel}
//                         availableSites={this.state.sites}


//                       />
//                     </section>

//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>
//           </LoadingOverlay>
//         </Container>
//       </div>
//     </React.Fragment>



//     )
//   }
// }
import React, { Component } from 'react';
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import UsersList from './Components/UsersList';
import UserDetail from './Components/UserDetail';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchgetUserDetailsByID, fetchgetDataUserManagement } from '../../service';
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const apiUrl = process.env.REACT_APP_API_URL;

export default class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      users: [],
      sites: [],
      selectedUser: '',
      selectedUserDetails: {},
      listusers: "block",
      detailuser: "none",
      headingText: "User Management",
    };
  }

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    this.setState({ loader: true });
    fetchgetDataUserManagement()
      .then(([res1, res2]) => {
        this.setState({ users: res1, sites: res2, loader: false });
      })
      .catch(() => this.setState({ loader: false }));
  };

  handleEditUser = (user) => {
    this.setState({ loader: true });
    console.log("user login", user.xlogin);
    fetchgetUserDetailsByID(user.xlogin)
      .then(([res1]) => {
        console.log("response 1", res1);
        this.setState({
          selectedUser: user.xlogin,
          selectedUserDetails: res1,
          loader: false,
          detailuser: "block",
          listusers: "none",
          headingText: "Update User Management"
        });
      })
      .catch(() => this.setState({ loader: false }));
  };

  handleAddUserClicked = () => {
    this.setState({
      selectedUser: '',
      selectedUserDetails: {},
      detailuser: "block",
      listusers: "none",
      headingText: "Create User Management"
    });
  };

  handleDeleteUser = (user) => {
    this.setState({ loader: true });
    fetch(`${apiUrl}/api/v1/user/delete/${user.xlogin}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          this.notifySuccess("User deleted successfully");
          this.loadUserData();
        } else {
          this.notifyError("Failed to delete user");
          this.setState({ loader: false });
        }
      });                      
  };

  onCancel = () => {         
    this.setState({                                         
      detailuser: "none",
      listusers: "block",
      selectedUser: '',
      selectedUserDetails: {},
      headingText: "User Management"
    });
  };

  notifySuccess = (msg) => toast.success(msg, { autoClose: 3000 });
  notifyError = (msg) => toast.error(msg, { autoClose: 3000 });

  SubmitUserDetails = (user) => {
    const apiEndpoint = this.state.selectedUser
      ? `${apiUrl}/api/v1/user/update/${this.state.selectedUser}`
      : `${apiUrl}/api/v1/transport/createuser`;
    const method = this.state.selectedUser ? "PUT" : "POST";

    this.setState({ loader: true });
    fetch(apiEndpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          this.notifySuccess(this.state.selectedUser ? "User updated successfully" : "User created successfully");
          this.loadUserData();
          this.setState({ detailuser: "none", listusers: "block" });
        } else {
          this.notifyError(data.Error || "Operation failed");
          this.setState({ loader: false });
        }
      })
      .catch(() => {
        this.notifyError("Server error");
        this.setState({ loader: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    {/* <Row style={{ height: "60px" }} className='mb-4'>
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle className="h1 mb-0 text-black text-3xl font-bold">{this.state.headingText}</CardTitle>
                      </Col>
                      <Col md="6" className="d-flex justify-content-end align-items-center">
                        <button
                          onClick={this.handleAddUserClicked}
                          className="w-full md:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition text-sm font-semibold"
                        >
                          Add New User
                        </button>
                      </Col>
                    </Row> */}
                    <Row style={{ height: "60px" }} className="mb-4">
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle className="h1 mb-0 text-black text-3xl font-bold">
                          {this.state.headingText}
                        </CardTitle>
                      </Col>

                      {this.state.listusers === "block" && (
                        <Col md="6" className="d-flex justify-content-end align-items-center">
                          <button
                            onClick={this.handleAddUserClicked}
                            className="w-full md:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition text-sm font-semibold"
                          >
                            Add New User
                          </button>
                        </Col>
                      )}
                    </Row>
                    <section style={{ display: this.state.listusers }}>
                      <UsersList
                        users={this.state.users}
                        handleAddUserClicked={this.handleAddUserClicked}
                        handleEditUser={this.handleEditUser}
                        handleDeleteUser={this.handleDeleteUser}
                      />
                    </section>
                    <section style={{ display: this.state.detailuser }}>
                      <UserDetail
                        selectedUser={this.state.selectedUser}
                        selectedUserDetails={this.state.selectedUserDetails}
                        onSave={this.SubmitUserDetails}
                        onCancel={this.onCancel}
                        availableSites={this.state.sites}
                      />
                    </section>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

