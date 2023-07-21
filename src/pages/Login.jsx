import React, { useContext, useState } from "react";
import Base from "../components/Base";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/User_Service";
import UserContext from "../context/User_Context";
import loginIcon from "../assests/loginIcon.png";

const Login = () => {
	const redirect = useNavigate();
	const userContext = useContext(UserContext);

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [error, SetError] = useState({
		errorData: null,
		isError: false,
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (event, property) => {
		setData({
			...data,
			[property]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(data);
		if (data.email === undefined || data.email.trim() === "") {
			toast.error("Invalid email");
		}
		if (data.password === undefined || data.password.trim() === "") {
			toast.error("Password required");
		}

		setLoading(true);

		loginUser(data)
			.then((logindata) => {
				console.log(logindata);
				toast.success("Logged In");
				SetError({
					errorData: null,
					isError: false,
				});

				//Navigate to /user/home
				// userContext.setIsLogin(true)
				// userContext.setUserData(logindata)

				userContext.login(logindata);

				redirect(`/users/profile/${logindata.user.userId}`);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Invalid Username or Password");
				SetError({
					errorData: error,
					isError: true,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const loginForm = () => {
		return (
			// style={{ backgroundColor: "#b0bec5" }}
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card
						className="my-3 border-0 shadow"
						style={{
							position: "relative",
							top: -60,
						}}
					>
						<Card.Body style={{ fontFamily: "serif" }}>
							{/* {JSON.stringify(userContext)} */}
							<div className="d-flex justify-content-center">
								<div>
									{" "}
									<img src={loginIcon} style={{ width: "37px" }} alt="" />
								</div>
								<div className="ms-2">
									<h3 className="text-center">Login Here</h3>
								</div>
							</div>
							<Form onSubmit={handleSubmit} noValidate>
								<Form.Group className="mb-3">
									<Form.Label>
										Enter your email <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="enter your mail"
										onChange={(event) => handleChange(event, "email")}
										value={data.email}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>
										Enter your Password <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="enter your password"
										onChange={(event) => handleChange(event, "password")}
										value={data.password}
									/>
								</Form.Group>
								<Container className="text-center">
									{/* <p>Forgot Password !<a href="/">Click here</a> </p> */}
									<p>
										{" "}
										Register ! <NavLink to="/register">Click here</NavLink>{" "}
									</p>
								</Container>

								<Container className="text-center">
									<Button type="submit" variant="success">
										Login
									</Button>
									<Button className="ms-2" variant="danger">
										Reset
									</Button>
								</Container>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	};

	return (
		<Base title="Electronic Store / login" description={null}>
			{loginForm()}
		</Base>
	);
};

export default Login;
