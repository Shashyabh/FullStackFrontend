import React from "react";
import { Card, Form, Button, Container } from "react-bootstrap";

const ContactUsView = () => {
	const contactForm = () => {
		return (
			<Container style={{ marginTop: "6rem" }}>
				<Card>
					<Card.Body>
						<div className="text-center">
							<h3>Contact Us</h3>
						</div>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Check me out" />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		);
	};
	return contactForm();
};

export default ContactUsView;
