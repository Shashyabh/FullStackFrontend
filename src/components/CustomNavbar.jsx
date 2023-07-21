import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../assests/logo.png";
import { NavLink } from "react-router-dom";
import UserContext from "../context/User_Context";
import CartContext from "../context/CartContext";
import { Badge } from "react-bootstrap";

const CustomNavbar = () => {
	const userContext = useContext(UserContext);
	const { cart, setCart } = useContext(CartContext);

	const doLogout = () => {
		userContext.logout();
	};
	let navStyle = {
		backgroundColor: "#26a69a",
	};

	return (
		<Navbar collapseOnSelect expand="xl" style={navStyle}>
			{/* //<Navbar collapseOnSelect expand="lg" className="bg-dark" variant='dark'> */}
			<Container style={{ fontFamily: "sans-serif" }}>
				<Navbar.Brand as={NavLink} to="/">
					<img src={logo} alt="logo" height={35} width={35} style={{ borderRadius: 10 }} />
					{/* <i class="large material-icons">local_shipping</i> */}
					<span className="ms-2">Electronic Store</span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="m-auto">
						<Nav.Link as={NavLink} to="/services">
							Features
						</Nav.Link>
						<NavDropdown title="Products" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Phones</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Smart TVs</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={NavLink} to="/about">
							About
						</Nav.Link>
						<Nav.Link as={NavLink} to="/contact">
							Contact Us
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={NavLink} to="/store">
							Store
						</Nav.Link>
						<Nav.Link as={NavLink} to="/cart">
							Cart{" "}
							{userContext.isLogin && cart ? (
								<Badge style={{ color: "black", fontSize: "15px" }}>
									{cart.items.length}
								</Badge>
							) : (
								""
							)}
						</Nav.Link>
						{userContext.isLogin ? (
							<>
								{userContext.isAdminUser && (
									<>
										<Nav.Link as={NavLink} to="/admin/home">
											Admin Dashboard
										</Nav.Link>
									</>
								)}
								<Nav.Link
									as={NavLink}
									to={`/users/profile/${userContext.userData.user.userId}`}
								>
									{userContext.userData?.user?.name}
								</Nav.Link>
								<Nav.Link as={NavLink} to="/users/orders">
									Orders
								</Nav.Link>
								<Nav.Link onClick={doLogout} to="/logout">
									Logout
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to="/login">
									Login
								</Nav.Link>
								<Nav.Link as={NavLink} to="/register">
									Signup
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default CustomNavbar;
