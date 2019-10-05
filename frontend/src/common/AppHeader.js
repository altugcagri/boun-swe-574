import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../img/bespoke_logo.png"

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let menuItems;
        if (!this.props.currentUser) {
            menuItems =
                <Nav className="ml-auto">
                    <Nav.Link as={Link} className="ml-2" to="/explore">Explore</Nav.Link>
                    <Nav.Link as={Link} className="ml-2" to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} className="ml-2 btn btn-sm btn-outline-primary btn-orange text-white" to="/signup">Sign Up</Nav.Link>
                </Nav>
        } else {
            menuItems =
                <Nav className="ml-auto ">
                    <Nav.Link className="ml-2" as={Link} to="/explore">Explore</Nav.Link>
                    <NavDropdown title={this.props.currentUser.username} id="basic-nav-dropdown">
                        {/* <NavDropdown.Item as={Link} to={`/${this.props.currentUser.username}`}>Profile</NavDropdown.Item> */}
                        <NavDropdown.Item as={Link} to={`/${this.props.currentUser.username}/topics/created`}>My Topics</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={`/${this.props.currentUser.username}/topics/enrolled`}>Following</NavDropdown.Item>
                        <NavDropdown.Item as={Link} onClick={this.props.onLogout} to="/" >Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
        }

        return (
            <Navbar bg="white" className="myNavbar" variant="dark" expand="lg">
                <Navbar.Brand>
                    <Link to="/" className="serif mainLogo " style={{ textDecoration: 'none', color: 'white', fontWeight: '400', fontSize: '25px' }}>
                        <img src={logo} className="mr-2" alt="" width="250" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {menuItems}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(AppHeader);