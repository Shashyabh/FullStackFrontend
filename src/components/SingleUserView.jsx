import React from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { getUserImageUrl } from "../services/Helper_Service";
import virat from "../assests/virat.jpg";
import { Link } from "react-router-dom";

const SingleUserView = ({ user }) => {
	return (
		<>
			<Card className="mt-3 shadow-sm">
				<Card.Body>
					<Row>
						<Col md={2} className="d-flex align-items-center">
							<img
								src={user.imageName ? getUserImageUrl(user.userId) : virat}
								onError={(event) => event.currentTarget.setAttribute("src", virat)}
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
								}}
								className="rounded"
								alt=""
							/>
						</Col>
						<Col md={3}>
							<h5 className="text-uppercase">
								<Link to={"/users/profile/" + user.userId}>{user.name}</Link>
							</h5>
							<p className="text-muted">{user.about}</p>
							<p className="text-muted">{user.email}</p>
							{user.roles.map((role) => {
								return (
									<Badge bg={role.roleName === "ROLE_ADMIN" ? "primary" : "info"} key={role.roleId} pill className="me-2">
										{role.roleName}
									</Badge>
								);
							})}
						</Col>

						<Col md={7}>
							<Container>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatibus, nihil dolorem at praesentium hic libero
								esse numquam aliquid veniam impedit, dolor consectetur id illum ratione explicabo est ducimus harum!{" "}
							</Container>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	);
};

export default SingleUserView;
