import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formateDate } from "../services/Helper_Service";
import { Link } from "react-router-dom";

const SingleOrderView = ({ order, openViewOrderModal, openEditOrderModal }) => {
	return (
		<Card className=" shadow mb-5" border="info" style={{ fontFamily: "serif" }}>
			<Card.Body>
				<Row>
					<Col>
						Order Id <b className="ms-2"> {order.orderId}</b>
					</Col>

					<Col>
						Order By:{" "}
						<Button as={Link} variant="outline-secondary" to={`/users/profile/${order.user.userId}`} className="ms-2">
							<span className="text-black">{order.user.name}</span>
						</Button>
					</Col>
				</Row>

				<Row>
					<Col>
						<Table bordered striped className="mt-3">
							<tbody>
								<tr>
									<td>Billing Name</td>
									<td className="fw-bold">{order.billingName}</td>
								</tr>
								<tr>
									<td>Billing Phone</td>
									<td className="fw-bold">{order.billingPhone}</td>
								</tr>

								<tr>
									<td>Order Items</td>
									<td className="fw-bold">{order.orderItems.length}</td>
								</tr>

								<tr className={order.paymentStatus === "NOTPAID" ? "table-danger" : "table-success"}>
									<td>Payment Status</td>
									<td className="fw-bold">{order.paymentStatus}</td>
								</tr>

								<tr className={order.orderStatus === "PENDING" ? "table-danger" : "table-success"}>
									<td>Order Status</td>
									<td className="fw-bold">{order.orderStatus}</td>
								</tr>
								<tr>
									<td>Ordered Date</td>
									<td className="fw-bold">{formateDate(order.orderedDate)}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>

				<Container className="text-center">
					<Button onClick={(event) => openViewOrderModal(event, order)} variant="info">
						View Details
					</Button>

					{openEditOrderModal && (
						<Button className="ms-3" onClick={(event) => openEditOrderModal(event, order)} variant="secondary">
							Update
						</Button>
					)}

					{!openEditOrderModal && order.paymentStatus === "NOTPAID" && (
						<Button className="ms-3" onClick={(event) => {}} variant="success">
							Proceed To Payment
						</Button>
					)}
				</Container>
			</Card.Body>
		</Card>
	);
};

export default SingleOrderView;
