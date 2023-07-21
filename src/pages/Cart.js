import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SingleCartItemView from "./users/SingleCartItemView";
import EmptyCartView from "../components/EmptyCartView";
import UserContext from "../context/User_Context";
import NotLoginPageShow from "../components/NotLoginPageShow";
import { toast } from "react-toastify";
import { createOrder } from "../services/Order_Service";
import { sendEmailToUser } from "../services/User_Service";

const Cart = () => {
	const { cart, setCart, addItemCart, removeItem, clearCart } = useContext(CartContext);
	const { userData, isLogin } = useContext(UserContext);

	const [orderPlacedClicked, setOrderPlacedClicked] = useState(false);

	const [orderDetails, setOrderDetails] = useState({
		billingAddress: "",
		billingName: "",
		billingPhone: "",
		cartId: "",
		orderStatus: "",
		paymentStatus: "",
		userId: "",
	});

	const getTotalCartAmount = () => {
		let amount = 0;
		cart.items.forEach((item) => {
			amount += item.totalPrice;
		});
		return amount;
	};

	const cartView = () => {
		return (
			<>
				<Card className="shadow mt-3">
					<Card.Body>
						<Row className="px-5">
							<Col>
								<h3>Cart</h3>
							</Col>
							<Col className="text-end">
								<h3>{cart.items.length} items</h3>
							</Col>
						</Row>

						<Row className="px-5 mt-3">
							<Col>
								{cart.items.map((item) => (
									<SingleCartItemView
										key={item.cartItemId}
										item={item}
										removeItemLocal={removeItemLocal}
									/>
								))}
							</Col>
						</Row>
						<Container className="px-4">
							<h3 className="text-end px-5">Total Amount : ₹{getTotalCartAmount()}</h3>
						</Container>

						<Container className="text-center">
							{!orderPlacedClicked && (
								<Button onClick={(event) => setOrderPlacedClicked(true)}>
									Place Order
								</Button>
							)}
						</Container>
					</Card.Body>
				</Card>
			</>
		);
	};

	const removeItemLocal = (itemId) => {
		removeItem(itemId);
	};

	//Placed Order Handle

	const handleOrderCreation = async () => {
		if (orderDetails.billingName === "") {
			toast.info("Invalid Billing Name");
			return;
		}
		if (orderDetails.billingPhone === "") {
			toast.info("Invalid Billing Phone");
			return;
		}
		if (orderDetails.billingAddress === "") {
			toast.info("Invalid Billing Address");
			return;
		}

		//Set required other details
		orderDetails.cartId = cart.cartId;
		orderDetails.orderStatus = "PENDING";
		orderDetails.paymentStatus = "NOTPAID";
		orderDetails.userId = userData.user.userId;
		console.log(orderDetails);

		try {
			const data = await createOrder(orderDetails);
			toast.success("Order Proceed Successfully !! Proceed for Payment");
			setCart({
				...data,
				items: [],
			});

			//const mailData = await sendEmailToUser(userData.user.email);
			setOrderDetails({
				billingAddress: "",
				billingName: "",
				billingPhone: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	const orderFormView = () => {
		return (
			<Form>
				{/* Billing Name */}
				<Form.Group className="mt-3">
					<Form.Label>Billing Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter here"
						value={orderDetails.billingName}
						onChange={(event) => {
							setOrderDetails({
								...orderDetails,
								billingName: event.target.value,
							});
						}}
					/>
				</Form.Group>

				{/* Billing Phone */}
				<Form.Group className="mt-3">
					<Form.Label>Billing Phone</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter here"
						value={orderDetails.billingPhone}
						onChange={(event) => {
							setOrderDetails({
								...orderDetails,
								billingPhone: event.target.value,
							});
						}}
					/>
				</Form.Group>

				{/* Billing Address */}
				<Form.Group className="mt-3">
					<Form.Label>Billing Address</Form.Label>
					<Form.Control
						rows={6}
						as={"textarea"}
						placeholder="Enter here"
						value={orderDetails.billingAddress}
						onChange={(event) => {
							setOrderDetails({
								...orderDetails,
								billingAddress: event.target.value,
							});
						}}
					/>
				</Form.Group>

				<Container className="mt-3 text-center">
					<Button
						onClick={(event) => {
							handleOrderCreation();
						}}
						variant="success"
					>
						Place Order
					</Button>
				</Container>
			</Form>
		);
	};

	return (
		<div>
			<Container fluid={orderPlacedClicked}>
				<Row>
					<Col className="animation" md={orderPlacedClicked ? 8 : 12}>
						{cart && cart.items.length > 0 ? (
							cartView()
						) : isLogin ? (
							<EmptyCartView />
						) : (
							<NotLoginPageShow />
						)}
					</Col>
					{orderPlacedClicked && (
						<Col md={4} className="mt-3">
							<Card className="shadow-sm">
								<Card.Body>
									<h4>Fill the form to complete order</h4>
									{orderFormView()}
								</Card.Body>
							</Card>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default Cart;
