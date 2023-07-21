import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import productLogo from "../../assests/productLogo.jpg";
import userImage from "../../assests/userImage.png";
import categoryIcon from "../../assests/categoryIcon.png";
import orderIcon from "../../assests/orderIcon.png";

const AdminHome = () => {
	return (
		<Container>
			<Row>
				<Col>
					<Card className="shadow-lg">
						<Card.Body>
							<h3 style={{ fontFamily: "serif", color: "black" }} className="text-center">
								Welcome To Admin Dashboard
							</h3>
							{/* <Container
                className="d-flex justify-content-center mt-4 border border-0"
                style={{ fontFamily: "serif" }}
              >
                <Button
                  as={Link}
                  to={"/admin/products"}
                  size="md"
                  className="ms-5 bg-secondary"
                >
                  Start Managing Products
                </Button>
                <Button
                  as={Link}
                  to={"/admin/category"}
                  size="md"
                  className="ms-5 bg-secondary"
                >
                  Start Managing Categories
                </Button>
                <Button
                  as={Link}
                  to={"/admin/orders"}
                  size="md"
                  className="ms-5 bg-secondary"
                >
                  Start Managing Orders
                </Button>
                <Button
                  as={Link}
                  to={"/admin/users"}
                  size="md"
                  className="ms-5 bg-secondary"
                >
                  Start Managing Users
                </Button>
              </Container> */}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Card details row wise */}

			<Row className="mt-4">
				<Row>
					<Col>
						<Card className="shadow bg-gradient">
							<Card.Body className="text-center">
								<img src={productLogo} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center">
									PRODUCTS
								</h3>

								<h5>Product Ordered : 36283+</h5>
								<h5>Total Products : 12M +</h5>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className="shadow">
							<Card.Body className="text-center">
								<img src={categoryIcon} style={{ width: "125px" }} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center mt-3">
									CATEGORIES
								</h3>

								<h5>Total Categories : 91273+</h5>
								<h5>Best Selling Categories : 7289+</h5>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className="shadow">
							<Card.Body className="text-center">
								<img src={orderIcon} style={{ width: "140px" }} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center">
									ORDERS
								</h3>

								<h5>Total Orders : 738393+</h5>
								<h5>Daily Orders : 739+</h5>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<Card className="shadow">
							<Card.Body className="text-center">
								<img src={userImage} style={{ width: "135px" }} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center mt-2">
									USERS
								</h3>

								<h5>User Register : 10M+</h5>
								<h5>User Active: 7M+</h5>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className="shadow">
							<Card.Body className="text-center">
								<img src={productLogo} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center">
									PRODUCTS
								</h3>

								<h5>Product Ordered : 36283+</h5>
								<h5>Total Products : 12M +</h5>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className="shadow">
							<Card.Body className="text-center">
								<img src={productLogo} alt="" />
								<h3 style={{ fontFamily: "serif" }} className="text-center">
									PRODUCTS
								</h3>

								<h5>Product Ordered : 36283+</h5>
								<h5>Total Products : 12M +</h5>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Row>
		</Container>
	);
};

export default AdminHome;
