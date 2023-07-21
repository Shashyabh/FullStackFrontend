import React, { useEffect, useState } from "react";
import UserProfileView from "../../components/user/UserProfileView";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
// import UserContext from "../../context/User_Context";
import { toast } from "react-toastify";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/User_Service";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Table } from "react-bootstrap";
import profilepic from "../../assests/profilepic.jpg";

const Profile = () => {
	//const userContext = useContext(UserContext);
	const [user, setUser] = useState(null);

	const { userId } = useParams();
	const [show, setShow] = useState(false);

	//State to handle image
	const [image, setImage] = useState({
		placeholder: profilepic,
		file: null,
	});

	const handleClose = () => setShow(false);
	const handleShowModal = () => setShow(true);

	useEffect(() => {
		// if (userContext.userData) {
		//   getUserDataFromServer();
		// }
		getUserDataFromServer();
	}, []);

	const getUserDataFromServer = () => {
		// const userId = userContext.userData.user.userId;
		getUser(userId)
			.then((data) => {
				console.log(data);
				setUser(data);
			})
			.catch((error) => {
				setUser(null);
				console.log(error);
				toast.error("Error in loading user data");
			});
	};

	const updateFieldHandler = (event, property) => {
		setUser({
			...user,
			[property]: event.target.value,
		});
	};

	//Update user data by calling put api

	const updateUserData = () => {
		if (user.name === undefined || user.name === "") {
			toast.error("Username required");
			return;
		}
		updateUser(user)
			.then((updatedUser) => {
				console.log(updatedUser);
				toast.success("User updated successfully");
				//Update image
				updateUserProfilePicture(image.file, user.userId)
					.then((data) => {
						console.log(data);
						toast.success(data.message);
						handleClose();
					})
					.catch((error) => {
						console.log(error);
						toast.error("Image not uploaded");
					});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Unable to update");
			});
	};

	//Function for image change
	const handleProfileImageChange = (event) => {
		if (
			event.target.files[0].type === "image/png" ||
			event.target.files[0].type === "image/jpeg"
		) {
			//Preview image
			const reader = new FileReader();

			reader.onload = (r) => {
				setImage({
					placeholder: r.target.result,
					file: event.target.files[0],
				});
			};

			reader.readAsDataURL(event.target.files[0]);
		} else {
			toast.error("Invalid Image Type");
			image.file = null;
		}
	};

	//Clear image

	const clearImage = () => {
		setImage({
			placeholder: profilepic,
			file: null,
		});
	};

	const updateViewModal = () => {
		return (
			<div>
				<Modal show={show} onHide={handleClose} size="lg">
					<Modal.Header closeButton>
						<Modal.Title>Update Your Information</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Card className="my-4 shadow">
							<Card.Body>
								<Container className="text-center mb-3">
									{/* <img style={profileStyle} src={user.imageName ? BASE_URL+'/users/image/'+user.userId :profilepic} alt="" /> */}
									{/* <img style={profileStyle} src={profilepic} alt="" /> */}
								</Container>
								<div className="mt-3">
									<Table
										className="text-center"
										bordered
										hover
										responsive
										variant="secondary"
									>
										<tbody>
											<tr className="my-1">
												<td>Profile Image</td>
												<td>
													{/* Image tag for preview */}
													<Container className="text-center mb-3">
														<img
															style={{ borderRadius: "50%" }}
															height={150}
															width={150}
															src={image.placeholder}
															alt=""
														/>
													</Container>
													<InputGroup>
														<Form.Control
															type="file"
															onChange={handleProfileImageChange}
														/>
														<Button onClick={clearImage} variant="outline-secondary">
															Clear
														</Button>
													</InputGroup>
												</td>
											</tr>

											<tr className="my-1">
												<td>Name</td>
												<td>
													<Form.Control
														className="text-center"
														type="text"
														value={user.name}
														onChange={(event) => updateFieldHandler(event, "name")}
													/>
												</td>
											</tr>
											<tr className="my-1">
												<td>Email</td>
												<td>{user.email}</td>
											</tr>

											<tr className="my-1">
												<td>New Password</td>
												<td>
													<Form.Control
														type="password"
														placeholder="enter your new password here"
														onChange={(event) =>
															updateFieldHandler(event, "password")
														}
													/>
												</td>
											</tr>

											<tr className="my-1">
												<td>Gender</td>
												<td>{user.gender}</td>
											</tr>

											<tr className="my-1">
												<td>About</td>
												<td>
													<Form.Control
														as={"textarea"}
														rows={5}
														value={user.about}
														onChange={(event) => updateFieldHandler(event, "about")}
													/>
												</td>
											</tr>

											<tr className="my-1">
												<td>Roles</td>
												<td>
													{user.roles.map((role) => (
														<div key={role.roleId}>{role.roleName}</div>
													))}
												</td>
											</tr>
										</tbody>
									</Table>
								</div>
							</Card.Body>
						</Card>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={updateUserData}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	};

	return (
		<Container className="mt-3">
			<Row>
				<Col
					md={{
						span: 10,
						offset: 1,
					}}
				>
					<div>
						{user ? (
							<>
								<UserProfileView user={user} handleShowModal={handleShowModal} />
								{updateViewModal()}
							</>
						) : (
							<div>You have to login</div>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
