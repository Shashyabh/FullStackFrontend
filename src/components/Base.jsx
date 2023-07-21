import React from "react";
import { Button, Container } from "react-bootstrap";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const Base = ({
	title = "Page title",
	description = "Welcome to dynamic store",
	buttonEnabled = false,
	buttonText = "Shop Now",
	buttonType = "primary",
	buttonLink = "/",
	children,
}) => {
	let styleContainer = {
		height: "200px",
		// background: "#b0bec5",
		// backgroundColor: "#b0bec5",
	};

	return (
		<div>
			<Container
				fluid
				style={styleContainer}
				className="p-5 text-center d-flex justify-content-center"
			>
				<div>
					<h3 className="text-center">{title}</h3>
					<p className="text-center">{description && description}</p>
					{buttonEnabled && (
						<Button as={NavLink} to={buttonLink} variant={buttonType}>
							{buttonText}
						</Button>
					)}
				</div>
			</Container>
			{children}
			<Footer />
		</div>
	);
};

export default Base;
