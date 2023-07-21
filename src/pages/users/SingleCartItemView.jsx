import React, { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../services/Helper_Service";
import { toast } from "react-toastify";
import CartContext from "../../context/CartContext";

const SingleCartItemView = ({ item, removeItemLocal }) => {
	const { addItemCart } = useContext(CartContext);
	return (
		<Card className="shadow-sm mb-5 border">
			<Card.Body>
				<Row className="text-center justify-content-center align-items-center">
					{/* Image */}
					<Col md={1}>
						<Container>
							<img src={getProductImageUrl(item.product.productId)} alt="" style={{ width: "60px", objectFit: "contain" }} />
						</Container>
					</Col>
					<Col md={9}>
						<h5>{item.product.title}</h5>
						<p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<Row>
							<Col>
								<p>
									<span className="text-muted">Quantity:</span>
									<b> {item.quantity}</b>
								</p>
							</Col>
							<Col>
								<p>
									<span className="text-muted">Price:</span>
									<b> ₹{item.product.discountedPrice}</b>
								</p>
							</Col>
							<Col>
								<p>
									<span className="text-muted">Total Price:</span>
									<b> ₹{item.totalPrice}</b>
								</p>
							</Col>
						</Row>
					</Col>
					<Col md={2} className="justify-content-center align-item-center">
						<div>
							<div className="d-grid">
								<Button onClick={(event) => removeItemLocal(item.cartItemId)} variant="danger" size="sm">
									Remove
								</Button>
							</div>

							<div className="mt-3">
								<Row>
									<Col className="d-grid">
										<Button
											variant="success"
											size="sm"
											onClick={(event) => {
												const increasedQuantity = item.quantity + 1;
												addItemCart(increasedQuantity, item.product.productId);
											}}
										>
											+
										</Button>
									</Col>
									<Col className="d-grid">
										<Button
											variant="info"
											size="sm"
											onClick={(event) => {
												const decreasedQuantity = item.quantity - 1;
												if (decreasedQuantity > 0) {
													addItemCart(decreasedQuantity, item.product.productId);
												} else {
													toast.info("Quantity Cant't be 0");
												}
											}}
										>
											-
										</Button>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default SingleCartItemView;
