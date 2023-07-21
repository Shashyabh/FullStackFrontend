import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/Helper.auth";
import UserContext from "../../context/User_Context";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";

const AdminDashboard = () => {
	useContext(UserContext);

	const dashboardView = () => {
		return (
			<div>
				<Container
					// style={{
					//   backgroundColor: "#e0e0e0",
					// }}
					fluid
					className="px-5 py-5"
				>
					<Row>
						<Col
							md={{
								span: 2,
								offset: 1,
							}}
							className=""
						>
							<SideMenu />
						</Col>

						<Col md={9} className=" ps-3 pt-2">
							<Outlet />
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	return isAdminUser() ? dashboardView() : <Navigate to="/users/home" />;
};

export default AdminDashboard;
