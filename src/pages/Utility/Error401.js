// import React, { Component } from 'react';
// import { Container, Row, Col } from "reactstrap";
// import { Link } from "react-router-dom";

// //Import images
// import errorImg from "../../assets/images/error-img.png";

// class Error404 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           loginUser: "",
//           user: ""
//         };
//       }
//       componentDidMount() {
//         var user = JSON.parse(localStorage.getItem("authUser"));
//         this.setState({
//           userid: user.username,
//           user: user
//         });
    
//         user.rpflag = true
        
//       }
//     render() {
//       let {user} = this.state;

//       console.log(user, "this is inside error401 page")
//         return (
//             <React.Fragment>
//             <div className="my-5 pt-5">
//                 <Container>
//                     <Row>
//                         <Col lg={12}>
//                             <div className="text-center my-5">
//                                 <h1 className="font-weight-bold text-error">4 <span className="error-text">0<img src={errorImg} alt="" className="error-img"/></span> 1</h1>
//                                 <h3 className="text-uppercase">Unauthorized</h3>
                               
//                                 <div className="mt-5 text-center">
//                                     <Link to={`${user?.rpflag == false ? "/":"/scheduler2"}`} className="btn btn-primary waves-effect waves-light" >Back to {`${user.rpflag == false ? "Dashboard":"Scheduler"}`} </Link>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//             </React.Fragment>
//         );
//     }
// }

// export default Error404;




import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import images
import errorImg from "../../assets/images/error-img.png";

const Error401 = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("authUser"));
        setUser(user);
        user.rpflag = true; // Note: Directly mutating state like this is not recommended in React.
    }, []);

    console.log(user, "this is inside error401 page");

    return (
        <React.Fragment>
            <div className="my-5 pt-5">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center my-5">
                                <h1 className="font-weight-bold text-error">4 <span className="error-text">0<img src={errorImg} alt="" className="error-img"/></span> 1</h1>
                                <h3 className="text-uppercase">Unauthorized</h3>
                               
                                <div className="mt-5 text-center">
                                    {/* <Link to={`${user?.rpflag === false ? "/":"/scheduler2"}`} className="btn btn-primary waves-effect waves-light" >
                                        Back to {`${user.rpflag === false ? "Dashboard":"Scheduler"}`}
                                    </Link> */}

                                    {
                                      user && user.rpflag && <Link to="/" className="btn btn-primary waves-effect waves-light">Back to Dashboard</Link>
                                    }
                                       {
                                      user && !user.rpflag && <Link to="/scheduler2" className="btn btn-primary waves-effect waves-light">Back to Scheduler</Link>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Error401;
