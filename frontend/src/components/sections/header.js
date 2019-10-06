import React from 'react'

// Partials
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { openModal } from "functions/modals"

// Deps
import { connect } from "react-redux"


// Assets
import logo from "assets/images/bespoke_logo.png"

const mapStateToProps = state => {
	return {
		currentPage: state.generic.currentPage,
		user: state.user.user,
		unreadMessageCount: state.user.unreadMessageCount,
	};
};

class Header extends React.Component {

	render() {
		let vm = this;
		let user = vm.props.user;

		let menuItems;
		if (!user) {
			menuItems =
				<Nav className="ml-auto">
					<Nav.Link as={Link} className="ml-2" to="/explore">Explore</Nav.Link>
					<Nav.Link as={Link} className="ml-2" to="/faq">FAQ</Nav.Link>
					<Nav.Link as={Link} className="ml-2" to="" onClick={(e) => { e.preventDefault(); openModal('login') }}>Login</Nav.Link>
					<Nav.Link as={Link} className="ml-2 btn btn-sm btn-outline-primary btn-orange text-white" to="" onClick={(e) => { e.preventDefault(); openModal('register') }}>Sign Up</Nav.Link>
				</Nav>
		} else {
			menuItems =
				<Nav className="ml-auto ">
					<Nav.Link className="ml-2" as={Link} to="/explore">Explore</Nav.Link>
					<Nav.Link className="ml-2" as={Link} to="/faq">FAQ</Nav.Link>
					<NavDropdown title={user.username} id="basic-nav-dropdown">
						<NavDropdown.Item as={Link} to={`/${user.username}/topics/created`}>My Topics</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={`/${user.username}/topics/enrolled`}>Following</NavDropdown.Item>
						<NavDropdown.Item as={Link} onClick={this.props.onLogout} to="/" >Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
		}

		return (
			<Navbar bg="white" className="myNavbar" variant="dark" expand="lg">
				<Navbar.Brand>
					<Link to="/" className="serif mainLogo " >
						<img src={logo} className="mr-2" alt="" width="200" />
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

export default connect(mapStateToProps)(Header);