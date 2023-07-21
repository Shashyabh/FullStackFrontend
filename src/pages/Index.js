import React from "react";
import Base from "../components/Base";
import { Card, Col, Row, Button, Container } from "react-bootstrap";

import productLogo from "../assests/productLogo.jpg";
import userImage from "../assests/userImage.png";
import categoryIcon from "../assests/categoryIcon.png";
import orderIcon from "../assests/orderIcon.png";
import backlogo4 from "../assests/logo/backlogo4.jpg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import watchProduct from "../assests/logo/watchProduct.png";
import follower from "../assests/logo/follower.jpg";

const index = () => {
	let styleCss1 = {
		position: "absolute",
		top: "45%",
		left: "33%",
		color: "black",
		fontSize: "80px",
		transform: "translate(-50%, -50%)",
		fontFamily: "serif",
	};
	let styleCss2 = {
		position: "absolute",
		top: "75%",
		left: "30%",
		color: "black",
		fontSize: "40px",
		transform: "translate(-50%, -50%)",
		fontFamily: "serif",
	};
	return (
		<>
			<div>
				<section className="text-center">
					<img
						src={backlogo4}
						style={{
							width: "99vw",
							height: "100vh",
							objectFit: "cover",
							position: "relative",
						}}
						alt=""
					/>
					<div className="">
						<div>
							<span style={styleCss1}>GET START YOUR FAVOURITE SHOPPING</span>
						</div>
						<div>
							<Button as={Link} to={"/store"} style={styleCss2}>
								SHOP NOW
							</Button>
						</div>
					</div>
				</section>
			</div>

			{/* 2nd Section */}
			<div style={{ marginTop: "4rem" }}>
				<section>
					<Container>
						<h1 className="text-center ">Glimpse of Our Story</h1>
						<Row className="my-4">
							<Row>
								<Col>
									<Card className="shadow bg-gradient">
										<Card.Body className="text-center">
											<img src={productLogo} alt="" />
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center"
											>
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
											<img
												src={categoryIcon}
												style={{
													width: "125px",
												}}
												alt=""
											/>
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center mt-3"
											>
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
											<img
												src={orderIcon}
												style={{
													width: "140px",
												}}
												alt=""
											/>
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center"
											>
												ORDERS
											</h3>

											<h5>Total Orders : 738393+</h5>
											<h5>Daily Orders : 739+</h5>
										</Card.Body>
									</Card>
								</Col>
							</Row>

							<Row className="mt-3">
								<Col>
									<Card className="shadow">
										<Card.Body className="text-center">
											<img
												src={userImage}
												style={{
													width: "135px",
												}}
												alt=""
											/>
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center mt-2"
											>
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
											<img
												style={{
													maxWidth: "142px",
													objectFit: "contain",
												}}
												src={follower}
												alt=""
											/>
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center"
											>
												SOCIAL CONNECTIONS
											</h3>

											<h5>Totol Followers : 10M+</h5>
											<h5>Review : 4.8+</h5>
										</Card.Body>
									</Card>
								</Col>
								<Col>
									<Card className="shadow">
										<Card.Body className="text-center">
											<img src={productLogo} alt="" />
											<h3
												style={{
													fontFamily: "serif",
												}}
												className="text-center"
											>
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
				</section>
			</div>

			{/* 3rd secrtion */}

			<div
				style={{
					marginTop: "5rem",
					fontFamily: "serif",
					fontSize: "50px",
				}}
			>
				<section>
					<div>
						<h2 className="text-center">
							<b>Create Free Account To Enjoy Our Products</b>
						</h2>
					</div>
					<div className=" my-4">
						<Row>
							<Col md={{ span: 3, offset: 1 }}>
								{/* 1st card */}
								<Card>
									<Card.Body>
										<div className="text-center">
											<img
												style={{
													objectFit: "cover",
													width: "200px",
												}}
												src={watchProduct}
												alt=""
											/>
											<h3 className="text-center mt-3">
												<b>Watch Our Product</b>
											</h3>
											<h6>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
												assumenda suscipit natus quaerat doloremque vero inventore,
												aperiam veritatis officia quasi?
											</h6>
										</div>
									</Card.Body>
								</Card>
							</Col>

							{/* 2nd Card */}
							<Col md={{ span: 3, offset: 1 }}>
								<Card>
									<Card.Body>
										<div className="text-center">
											<img
												style={{
													objectFit: "cover",
													width: "200px",
												}}
												src={watchProduct}
												alt=""
											/>
											<h3 className="text-center mt-3">
												<b>Watch Our Product</b>
											</h3>
											<h6>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
												assumenda suscipit natus quaerat doloremque vero inventore,
												aperiam veritatis officia quasi?
											</h6>
										</div>
									</Card.Body>
								</Card>
							</Col>

							{/* 2nd Card */}
							<Col md={{ span: 3, offset: 1 }}>
								<Card>
									<Card.Body>
										<div className="text-center">
											<img
												style={{
													objectFit: "cover",
													width: "200px",
												}}
												src={watchProduct}
												alt=""
											/>
											<h3 className="text-center mt-3">
												<b>Watch Our Product</b>
											</h3>
											<h6>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
												assumenda suscipit natus quaerat doloremque vero inventore,
												aperiam veritatis officia quasi?
											</h6>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
};

export default index;
