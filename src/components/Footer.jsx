import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
	return (
		<Container
			style={{
				backgroundColor: "white",
				fontFamily: "serif",
				color: "black",
			}}
			fluid
			className=" p-3 text-center"
		>
			<p>
				Copyright © 2023: <b>New_Technology</b> Pvt Ltd
			</p>

			<div style={{ display: "flex", justifyContent: "center" }}>
				<div className=" ms-3">All Rights Reserved</div>
				<div className=" ms-3">Refund Policy</div>
				<div className=" ms-3">Privacy Policy</div>
				<div className=" ms-3">Terms of Service</div>
			</div>
		</Container>
	);
};

export default Footer;
