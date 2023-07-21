import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllOrders, updateOrder } from "../../services/Order_Service";
import { toast } from "react-toastify";
import { Card, Col, Container, Row, Modal, Button, Table, ListGroup, Form, Badge } from "react-bootstrap";
import SingleOrderView from "../../components/SingleOrderView";
import { formateDate, getProductImageUrl } from "../../services/Helper_Service";
import InfiniteScroll from "react-infinite-scroll-component";

const AdminOrder = () => {
	const [ordersData, setOrdersData] = useState(undefined);
	// const [fakeOrders, setFakeOrders] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//State for updating the order field

	const [showUpdate, setShowUpdate] = useState(undefined);

	const handleUpdateClose = () => setShowUpdate(false);
	const handleUpdateShow = () => setShowUpdate(true);

	//State for viewing orders details
	const [selectedOrder, setSelectedOrder] = useState(undefined);

	//State for page

	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		if (currentPage > 0) {
			getOrdersLocally();
		}
	}, [currentPage]);

	useEffect(() => {
		getOrdersLocally();
	}, []);

	//Get order Function consist of Api Call
	const getOrdersLocally = async (pageNumber, pageSize, sortBy, sortDir) => {
		try {
			const data = await getAllOrders(currentPage, 3, "orderedDate", "desc");
			console.log(data);
			if (currentPage === 0) {
				setOrdersData(data);
			} else {
				setOrdersData({
					content: [...ordersData.content, ...data.content],
					lastPage: data.lastPage,
					pageNumber: data.pageNumber,
					pageSize: data.pageSize,
					totalElements: data.totalElements,
					totalPages: data.totalPages,
				});
			}
		} catch (e) {
			console.log(e);
			toast.error("Error in getting order");
		}
	};

	//Modal for Getting details of Each Order

	const openViewOrderModal = (event, order) => {
		setSelectedOrder({ ...order });
		handleShow(true);
	};

	//Modal for updating details for Order

	const openEditOrderModal = (event, order) => {
		updateOrderModal();
		handleUpdateShow(true);
		setSelectedOrder(order);
	};

	//Submit Update order

	const submitOrderUpdate = async (event) => {
		event.preventDefault();
		// console.log(selectedOrder);
		try {
			const data = await updateOrder(selectedOrder, selectedOrder.orderId);
			toast.success("Order Update Successfully");

			const newArray = ordersData.content.map((item) => {
				if (item.orderId === selectedOrder.orderId) {
					return data;
				} else return item;
			});

			setOrdersData({
				...ordersData,
				content: newArray,
			});
		} catch (error) {
			console.log(error);
			toast.error("Order Update failed");
		}
	};

	//Update order model for updating field

	const updateOrderModal = () => {
		console.log("Updated");
		return (
			selectedOrder && (
				<>
					<Modal show={showUpdate} onHide={handleUpdateClose} size="lg">
						<Modal.Header closeButton>
							<Modal.Title centered="true" style={{ fontFamily: "times-new-roman" }}>
								<span>
									<b>Update Order</b>
								</span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Card className="shadow-lg">
								<Card.Body>
									<Form onSubmit={submitOrderUpdate}>
										{/* Billing Name */}
										<Form.Group className="mt-3">
											<Form.Label>Billing Name</Form.Label>
											<Form.Control
												type="text"
												value={selectedOrder.billingName}
												onChange={(event) =>
													setSelectedOrder({
														...selectedOrder,
														billingName: event.target.value,
													})
												}
											/>
										</Form.Group>

										{/* Billing phone */}
										<Form.Group className="mt-3">
											<Form.Label>Billing Phone</Form.Label>
											<Form.Control
												type="text"
												value={selectedOrder.billingPhone}
												onChange={(event) =>
													setSelectedOrder({
														...selectedOrder,
														billingPhone: event.target.value,
													})
												}
											/>
										</Form.Group>

										{/* Billing Address */}
										<Form.Group className="mt-3">
											<Form.Label>Billing Address</Form.Label>
											<Form.Control
												as={"textarea"}
												rows={5}
												value={selectedOrder.billingAddress}
												onChange={(event) =>
													setSelectedOrder({
														...selectedOrder,
														billingAddress: event.target.value,
													})
												}
											/>
										</Form.Group>

										{/* Payment status */}

										<Form.Group className="mt-3">
											<Form.Label>Payment Status</Form.Label>
											<Form.Select
												onChange={(event) => {
													setSelectedOrder({
														...selectedOrder,
														paymentStatus: event.target.value,
													});
												}}
											>
												<option selected={selectedOrder.paymentStatus === "NOTPAID"} value={"NOTPAID"}>
													NOT PAID
												</option>
												<option selected={selectedOrder.paymentStatus === "PAID"} value={"PAID"}>
													PAID
												</option>
											</Form.Select>
										</Form.Group>

										{/* Order status */}

										<Form.Group className="mt-3">
											<Form.Label>Order Status</Form.Label>
											<Form.Select
												onChange={(event) => {
													setSelectedOrder({
														...selectedOrder,
														orderStatus: event.target.value,
													});
												}}
											>
												<option
													// selected={selectedOrder.orderStatus === "PENDING"}
													value={"PENDING"}
												>
													PENDING
												</option>
												<option
													//selected={selectedOrder.orderStatus === "DISPATCH"}
													value={"DISPATCH"}
												>
													DISPATCH
												</option>
												<option
													// selected={selectedOrder.orderStatus === "ONWAY"}
													value={"ONWAY"}
												>
													ONWAY
												</option>
												<option
													//selected={selectedOrder.orderStatus === "DELIVERED"}
													value={"DELIVERED"}
												>
													DELIVERED
												</option>
											</Form.Select>
										</Form.Group>

										<Form.Group className="mt-3">
											<Form.Label>Select Date</Form.Label>
											<Form.Control
												type="text"
												value={selectedOrder.deliveredDate}
												onChange={(event) => {
													setSelectedOrder({
														...selectedOrder,
														deliveredDate: event.target.value,
													});
												}}
											/>
											<p className="text-muted">Formate : YYYY-MM-DD</p>
										</Form.Group>

										<Container className="text-center">
											<Button type="submit" variant="success">
												Save
											</Button>
										</Container>
									</Form>
								</Card.Body>
							</Card>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleUpdateClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)
		);
	};

	//Load data for next Page
	const loadNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

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
			<Card className="shadow">
				<Card.Header>
					<h3 className="text-center text-uppercase">
						<strong>Orders</strong>
					</h3>
				</Card.Header>
				<Card.Body>
					{/* Pagination */}
					<InfiniteScroll
						dataLength={ordersData.content.length}
						next={loadNextPage}
						hasMore={!ordersData.lastPage}
						loader={<h2 className="p-2 text-center">Loading</h2>}
						endMessage={
							<p style={{ textAlign: "center" }}>
								<b>Yay! You have seen it all</b>
							</p>
						}
					>
						{ordersData.content.map((o) => (
							<SingleOrderView
								key={o.orderId} // Assuming `id` is a unique identifier for each order
								order={o}
								openViewOrderModal={openViewOrderModal}
								openEditOrderModal={openEditOrderModal}
							/>
						))}
						{/* {ordersData.content.map((o) => {
              return (
                <SingleOrderView
                  
                  //Passing props to SingleOrderView
                  order={o}
                  openViewOrderModal={openViewOrderModal}
                  openEditOrderModal={openEditOrderModal}
                />
              );
            })} */}
					</InfiniteScroll>
				</Card.Body>
			</Card>
		);
	};

	return (
		<>
			<Container>
				<Row>
					<Col>
						{ordersData && orderView()}
						{viewOrderModal()}
						{updateOrderModal()}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default AdminOrder;
