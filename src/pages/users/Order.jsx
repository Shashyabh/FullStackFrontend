import React from "react";
import { getOrderOfUser } from "../../services/Order_Service";
import { useContext } from "react";
import UserContext from "../../context/User_Context";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import SingleOrderView from "../../components/SingleOrderView";
import { Card, Col, Container, Row, Modal, Button, Table, ListGroup, Form, Alert } from "react-bootstrap";
import { formateDate, getProductImageUrl } from "../../services/Helper_Service";

const Order = () => {
	const { isLogin, userData } = useContext(UserContext);
	const [orders, setOrders] = useState(undefined);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isLogin) {
			loadOrdersOfUser();
		}
	}, [isLogin]);

	//Load Order of Single User
	const loadOrdersOfUser = async () => {
		try {
			const data = await getOrderOfUser(userData.user.userId);
			console.log(data);
			setOrders(data);
		} catch (error) {
			console.log(error);
			toast.error("Error in loading Data of User's Data");
		}
	};

	const openViewOrderModal = (event, order) => {
		event.preventDefault();
		setSelectedOrder({ ...order });
		handleShow(true);
	};

	//load order modal

	const viewOrderModal = () => {
		return (
			selectedOrder && (
				<>
					<Modal show={show} onHide={handleClose} size="xl">
						<Modal.Header closeButton>
							<Modal.Title style={{ fontFamily: "times-new-roman" }}>
								<b>Orders Details</b>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Row>
								<Col>
									Order Id <b className="ms-2"> {selectedOrder.orderId}</b>
								</Col>

								<Col>
									Billing Name <b className="ms-2"> {selectedOrder.billingName}</b>
								</Col>
							</Row>

							<Row>
								<Col>
									<Table bordered striped className="mt-3">
										<tbody>
											<tr>
												<td>Billing Phone</td>
												<td className="fw-bold">{selectedOrder.billingPhone}</td>
											</tr>

											<tr>
												<td>Order Items</td>
												<td className="fw-bold">{selectedOrder.orderItems.length}</td>
											</tr>

											<tr className="fw-bold">
												<td>Order Amount</td>
												<td>₹ {selectedOrder.orderAmount}</td>
											</tr>

											<tr className={selectedOrder.paymentStatus === "NOTPAID" ? "table-danger" : "table-success"}>
												<td>Payment Status</td>
												<td className="fw-bold">{selectedOrder.paymentStatus}</td>
											</tr>

											<tr className={selectedOrder.orderStatus === "PENDING" ? "table-danger" : "table-success"}>
												<td>Order Status</td>
												<td className="fw-bold">{selectedOrder.orderStatus}</td>
											</tr>
											<tr>
												<td>Ordered Date</td>
												<td className="fw-bold">{formateDate(selectedOrder.orderedDate)}</td>
											</tr>

											<tr className="fw-bold">
												<td>Billing Address</td>
												<td>{selectedOrder.billingAddress}</td>
											</tr>

											<tr className="fw-bold">
												<td>Delivered Date</td>
												<td>{selectedOrder.deliveredDate ? formateDate(selectedOrder.deliveredDate) : ""}</td>
											</tr>
										</tbody>
									</Table>

									<Card>
										<Card.Body>
											<h3 className="text-center" style={{ fontFamily: "monospace" }}>
												<strong>Order Items</strong>
											</h3>
											<ListGroup>
												{selectedOrder.orderItems.map((item) => (
													<ListGroup.Item key={item.orderId} className="mt-3 ">
														<Container className="d-flex justify-content-center" style={{ fontFamily: "serif" }}>
															<Row>
																<Col>
																	<Card className="shadow-sm" style={{ width: "40rem" }}>
																		<Card.Body>
																			<Container className="d-flex">
																				<div>
																					<img
																						src={getProductImageUrl(item.product.productId)}
																						style={{
																							width: "100px",
																						}}
																						alt=""
																					/>
																				</div>

																				<div className="ms-4">
																					<h5>
																						<span className="text-muted me-4">Product Title</span>
																						{item.product.title}
																					</h5>
																					<h5>
																						<span className="text-muted me-4"> Quantity</span>
																						{item.quantity}
																					</h5>
																					<h5>
																						<span className="text-muted me-4">Total Price</span>₹ {item.totalPrice}
																					</h5>
																				</div>
																			</Container>
																		</Card.Body>
																	</Card>
																</Col>
															</Row>
														</Container>
													</ListGroup.Item>
												))}
											</ListGroup>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)
		);
	};

	const orderView = () => {
		return (
			orders && (
				<Card className="shadow mt-2">
					<Card.Header>
						<h3 className="text-center text-uppercase">
							<strong>Your Orders</strong>
						</h3>
					</Card.Header>
					<Card.Body>
						{orders.map((o) => {
							return (
								<SingleOrderView
									key={o.orderId}
									order={o}
									openViewOrderModal={openViewOrderModal}
									// openEditOrderModal={openEditOrderModal}
								/>
							);
						})}

						{orders.length <= 0 && (
							<Alert className="border border-0 text-center" variant="light">
								<h3 className="text-black">Your Orderlist is empty </h3>
							</Alert>
						)}
					</Card.Body>
				</Card>
			)
		);
	};

	return (
		<>
			<Row>
				<Col
					md={{
						span: 8,
						offset: 2,
					}}
				>
					{orderView()}
					{viewOrderModal()}
				</Col>
			</Row>
		</>
	);
};

export default Order;
