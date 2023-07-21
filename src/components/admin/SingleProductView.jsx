import React from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { PiPencil } from "react-icons/pi";
import { deleteProduct } from "../../services/Product_Service";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SingleProductView = ({
	product,
	index,
	updateProductList,
	handleViewShow,
	openEditProductModel,
}) => {
	//Delete product

	const deleteProductMain = (productId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				//Call api
				deleteProduct(product.productId)
					.then((data) => {
						console.log(data);
						Swal.fire("Deleted!", "Your file has been deleted.", "success");
						updateProductList();
					})
					.catch((error) => {
						toast.error("Error in deleting Category Id");
						console.log(error);
					});
			}
		});
	};

	const formateDate = (time) => {
		return new Date(time).toLocaleDateString();
	};

	const getBackgroundForProduct = () => {
		//Live + Stock->> green
		if (product.live && product.stock) {
			return "table-success";
		}

		//Not live---> Red
		else if (!product.live) {
			return "table-danger";
		}

		//Live but not in stock--->yellow
		else if (product.live && !product.stock) {
			return "table-war";
		}
	};

	return (
		<tr className={getBackgroundForProduct()}>
			<td className="px-3 small">{index + 1}</td>
			<td className="px-3 small">{product.title}</td>
			<td className="px-3 small">{product.quantity}</td>
			<td className="px-3 small">₹ {product.price}</td>
			<td className="px-3 small">₹ {product.discountedPrice}</td>
			<td className="px-3 small">{product.live ? "True" : "False"}</td>
			<td className="px-3 small">{product.stock ? "True" : "False"}</td>
			<td className="px-3 small">{product.category ? product.category.title : "Null"}</td>
			<td className="px-3 small">{formateDate(product.addedDate)}</td>
			<td className="px-3 small w-100 d-flex table-light">
				<Button
					variant="danger"
					size="sm"
					onClick={(event) => deleteProductMain(product.productId)}
				>
					<MdDelete />
				</Button>

				{/* delete button */}
				<Button
					onClick={(event) => handleViewShow(event, product)}
					className="ms-1"
					size="sm"
					variant="warning"
				>
					<GrView />
				</Button>

				{/* update button */}
				<Button
					onClick={(event) => openEditProductModel(event, product)}
					className="ms-1"
					size="sm"
					variant="info"
				>
					<PiPencil />
				</Button>
			</td>
		</tr>
	);
};

export default SingleProductView;
