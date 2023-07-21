import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { MdViewDay, MdOutlineAddShoppingCart, MdSpaceDashboard } from "react-icons/md";
import { BsMinecartLoaded } from "react-icons/bs";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useContext } from "react";
import UserContext from "../../context/User_Context";

const SideMenu = () => {
	const { logout } = useContext(UserContext);

	return (
		<ListGroup variant="flush" className="sticky-top">
			<ListGroup.Item as={NavLink} to="/admin/home" action>
				<LuHome size={20} />
				<span className="ms-2">Home</span>
			</ListGroup.Item>

			<ListGroup.Item as={NavLink} to="/admin/addCategory" action>
				<TbCategory size={20} />
				<span className="ms-2">Add Category</span>
			</ListGroup.Item>

			<ListGroup.Item as={NavLink} to="/admin/category" action>
				<MdOutlineCategory size={20} />
				<span className="ms-2">View Category</span>
			</ListGroup.Item>

			<ListGroup.Item as={NavLink} to="/admin/addProduct" action>
				<MdOutlineAddShoppingCart size={20} />
				<span className="ms-2">Add Product</span>
			</ListGroup.Item>

			<ListGroup.Item as={NavLink} to="/admin/products" action>
				<MdViewDay size={20} />
				<span className="ms-2">View Product</span>
			</ListGroup.Item>

			<ListGroup.Item as={NavLink} to="/admin/orders" action>
				<BsMinecartLoaded size={20} />
				<span className="ms-2">Order</span>
			</ListGroup.Item>

			<ListGroup.Item
				as={NavLink}
				to="/admin/users"
				className="d-flex justify-content-between align-items-start"
				action
			>
				<div>
					<PiUsersThreeFill size={20} />
					<span className="ms-2">User</span>
				</div>
				<Badge bg="warning" pill>
					14
				</Badge>
			</ListGroup.Item>
			{/* <ListGroup.Item as={NavLink} to="/users/home" action>
        <MdSpaceDashboard size={20} />
        <span className="ms-2">Dashboard</span>
      </ListGroup.Item> */}

			<ListGroup.Item
				action
				onClick={(event) => {
					logout();
				}}
			>
				<TbLogout size={20} />
				<span className="ms-2">Logout</span>
			</ListGroup.Item>
		</ListGroup>
	);
};

export default SideMenu;
