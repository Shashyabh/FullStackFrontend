import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import cartEmpty from "../assests/cartEmpty.png";
import { Link } from "react-router-dom";

const EmptyCartView = () => {
	return (
		<>
			<Container className="mt-5 d-flex justify-content-center">
				<Row>
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Container className="text-center">
										<img style={{ width: "300px" }} src={cartEmpty} alt="" />
									</Container>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col>
							<Container className="text-center mt-5">
								<Button as={Link} to="/store">
									Back To Store
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

export default EmptyCartView;
