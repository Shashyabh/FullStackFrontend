import React from "react";
import notLogin from "../assests/notLogin.jpg";
import { Link } from "react-router-dom";
import { Container, Card, Button, Col, Row } from "react-bootstrap";

const NotLoginPageShow = () => {
	return (
		<>
			<Container className="mt-5 d-flex justify-content-center">
				<Row>
					<Row>
						<Col>
							<Card>
								<Card.Title style={{ fontFamily: "serif" }} className="text-center mt-3">
									<b>You Have Not Logged In !!</b>
								</Card.Title>
								<Card.Body>
									<Container className="text-center">
										<img style={{ width: "300px" }} src={notLogin} alt="" />
									</Container>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col>
							<Container className="text-center mt-5">
								<Button size="lg" variant="warning" as={Link} to="/login">
									Back To Login
								</Button>
							</Container>
						</Col>
					</Row>
				</Row>
				{/* <Row>
					<Col>
						<Container className="text-center">
							<Button>Back To Store</Button>
						</Container>
					</Col>
				</Row> */}
			</Container>
		</>
	);
};

export default NotLoginPageShow;
