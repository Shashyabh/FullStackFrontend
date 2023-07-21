import React, { useState } from "react";
import Base from "../components/Base";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { registerUser } from "../services/User_Service";
import { NavLink } from "react-router-dom";

const Register = () => {
	let [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		about: "",
		gender: "",
	});

	const [errorData, setErrorData] = useState({
		isError: false,
		errorData: null,
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (event, property) => {
		console.log(event);
		console.log(property);
		setData({
			...data,
			[property]: event.target.value,
		});
	};

	const clearData = () => {
		setData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			about: "",
			gender: "",
		});

		setErrorData({
			errorData: null,
			isError: false,
		});
	};

	const submitForm = (event) => {
		event.preventDefault();
		if (data.name === undefined || data.name.trim() === "") {
			toast.error("Invalid name");
			return;
		}
		if (data.email === undefined || data.email.trim() === "") {
			toast.error("Invalid email");
			return;
		}

		if (data.password === undefined || data.password.trim() === "") {
			toast.error("Invalid password");
			return;
		}
		if (data.confirmPassword === undefined || data.confirmPassword.trim() === "") {
			toast.error("Invalid password");
			return;
		}
		if (data.password !== data.confirmPassword) {
			toast.error("Password doesn't match");
			return;
		}

		setLoading(true);
		registerUser(data)
			.then((userdata) => {
				toast.success("User created successfully");
				console.log(userdata);
				clearData();
			})
			.catch((err) => {
				//Error handler
				setErrorData({
					errorData: true,
				});
				console.log(err);
				toast.error("Eroor in creating user ! Try again");
			})
			.finally(() => {
				setLoading(false);
			});
		console.log(data);
	};

	const registerForm = () => {
		return (
			<Row>
				{/* {JSON.stringify(data)}   style={{ backgroundColor: "#b0bec5" }}*/}
				<Col
					sm={{ span: 6, offset: 3 }}
					style={{
						position: "relative",
						top: -100,
						borderRadius: 10,
					}}
				>
					<Card className="my-5 border-0 shadow">
						<Card.Body>
							<h3 className="mb-4 text-center" style={{ fontFamily: "serif" }}>
								<b>Signup Here</b>
							</h3>

							<Form noValidate onSubmit={submitForm}>
								{/* Name field */}
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>
										Enter your name <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="enter name"
										onChange={(event) => handleChange(event, "name")}
										value={data.name}
										isInvalid={errorData.errorData?.response?.data?.name}
									/>
									<Form.Control.Feedback type="invalid">
										Invalid Name
									</Form.Control.Feedback>
								</Form.Group>

								{/* Email field */}
								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>
										Email address <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="name@example.com"
										onChange={(event) => handleChange(event, "email")}
										value={data.email}
										isInvalid={errorData.errorData?.response?.data?.email}
									/>
									<Form.Control.Feedback type="invalid">
										Invalid Email
									</Form.Control.Feedback>
								</Form.Group>

								{/* Password field */}
								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>
										Enter your Password <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="enter password"
										onChange={(event) => handleChange(event, "password")}
										value={data.password}
									/>
								</Form.Group>

								{/*Confirm Password field */}
								<Form.Group className="mb-3" controlId="formConfirmPassword">
									<Form.Label>
										Confirm your Password <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="confirm password"
										onChange={(event) => handleChange(event, "confirmPassword")}
										value={data.confirmPassword}
									/>
								</Form.Group>

								{/* Gender Radio field */}
								<Form.Group className="mb-3">
									<Form.Label>
										Select Gender <span style={{ color: "red" }}>*</span>
									</Form.Label>
									<div>
										<Form.Check
											inline
											name="gender"
											label="Male"
											type={"radio"}
											id={`gender`}
											value={"male"}
											onChange={(event) => handleChange(event, "gender")}
											checked={data.gender === "male"}
										/>

										<Form.Check
											inline
											name="gender"
											label="Female"
											type={"radio"}
											id={`gender`}
											value={"female"}
											onChange={(event) => handleChange(event, "gender")}
											checked={data.gender === "female"}
										/>
									</div>
								</Form.Group>

								{/* About field */}
								<Form.Group className="mb-4">
									<Form.Label>Write somthing about yourself </Form.Label>
									<Form.Control
										as="textarea"
										placeholder="Write here"
										rows="6"
										onChange={(event) => handleChange(event, "about")}
										value={data.about}
									/>
								</Form.Group>

								<Container className="text-center">
									<p>
										{" "}
										Already Register ! <NavLink to="/login">Click here</NavLink>{" "}
									</p>
								</Container>

								<Container className="text-center">
									<Button type="submit" variant="success">
										<Spinner
											animation="border"
											variant="success"
											size="sm"
											className="me-2"
											hidden={!loading}
										/>
										<span hidden={!loading}>Wait....</span>
										<span hidden={loading}>Register</span>
									</Button>
									<Button className="ms-2" onClick={clearData} variant="danger">
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
		<Base title="Electronic Store / Signup" description={null}>
			{registerForm()}
		</Base>
	);
};

export default Register;
