import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { } from "../../store/actions";

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./SidebarContent";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    

    render() {
        const sidebarStyle = {
            transition: 'all 0.3s ease-in-out',
            // backgroundColor:"red"
            
          };
          
        return (
            <React.Fragment>
                <div className="vertical-menu" style={sidebarStyle}>
                    <div data-simplebar >
                        {this.props.type !== "condensed" ? (
                            <SimpleBar  style={{height:"100vh",overflowY:"auto"}}>
                                <SidebarContent
                                />
                            </SimpleBar>
                        ) : <SidebarContent />}
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        layout: state.Layout
    };
};
export default connect(mapStatetoProps, {})(withRouter(Sidebar));
