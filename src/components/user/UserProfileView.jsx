import React, { useContext } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import profilepic from "./../../assests/profilepic.jpg";
import { BASE_URL } from "../../services/Helper_Service";
import UserContext from "../../context/User_Context";
import { Link } from "react-router-dom";

const UserProfileView = ({ user = null, handleShowModal }) => {
	const { userData, isLogin } = useContext(UserContext);

	const profileStyle = {
		maxHeight: "200px",
		maxWidth: "200px",
		borderRadius: "50%",
	};

	return (
		<>
			{user && (
				<Card className="my-4 shadow">
					<Card.Body>
						<Container className="text-center mb-3">
							<img
								style={profileStyle}
								src={
									user.imageName
										? BASE_URL +
										  "/users/image/" +
										  user.userId +
										  "?" +
										  new Date().getTime()
										: profilepic
								}
								alt=""
							/>
							{/* <img style={profileStyle} src={profilepic} alt="" /> */}
						</Container>
						<h1 className="text-center text-uppercase fw-bold text-primary">{user.name}</h1>
						<div className="mt-3">
							<Table className="text-center" bordered hover responsive>
								<tbody>
									<tr className="my-1">
										<td>Name</td>
										<td>{user.name}</td>
									</tr>
									<tr className="my-1">
										<td>Email</td>
										<td>{user.email}</td>
									</tr>

									<tr className="my-1">
										<td>Gender</td>
										<td>{user.gender}</td>
									</tr>

									<tr className="my-1">
										<td>About</td>
										<td>{user.about}</td>
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

						{isLogin && userData.user.userId === user.userId ? (
							<Container className="text-center mt-3">
								<Button as={Link} to={`/users/orders`} variant="success" size="lg">
									Orders
								</Button>
								<Button
									onClick={handleShowModal}
									className="ms-2"
									variant="warning"
									size="lg"
								>
									Update
								</Button>
							</Container>
						) : (
							<div className="text-center text-uppercase">
								<strong>You are seeing as Guest</strong>
							</div>
						)}
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default UserProfileView;
