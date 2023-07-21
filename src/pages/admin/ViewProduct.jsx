import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import {
	addProductImage,
	getAllProducts,
	searchProduct,
	updateProduct,
} from "../../services/Product_Service";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getProductImageUrl } from "../../services/Helper_Service";

import logo from "../../assests/logo.png";
import ShowHtml from "../../components/ShowHtml";

import { FormGroup } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { InputGroup } from "react-bootstrap";
import { useRef } from "react";
import { getCategory } from "../../services/Category_Service";

const ViewProduct = () => {
	const [products, setProducts] = useState(undefined);
	const [currentProduct, setCurrentProduct] = useState(undefined);

	//State management for Search
	const [searchQuery, setSearchQuery] = useState("");
	const [prevProductState, setPrevProductState] = useState(undefined);

	const editorRef = useRef();

	//State management for Editing the project

	const [showEditModal, setShowEditModal] = useState(undefined);

	//Statemanagment for updating image

	const [imageUpdate, setImageUpdate] = useState({
		image: undefined,
		imagePreview: undefined,
	});

	//Statemanagment for updating the category

	const [categoryUpdate, setCategoryUpdate] = useState("");

	//State management for viewing the product
	const [show, setShow] = useState(false);
	const handleViewClose = () => setShow(false);

	const handleViewShow = (event, product) => {
		setCurrentProduct(product);
		setShow(true);
	};

	//For category find
	const [categories, setCategories] = useState(undefined);

	const closeEditProductModal = (event, product) => {
		setShowEditModal(false);
	};

	const openEditProductModel = (event, product) => {
		setCurrentProduct(product);
		setShowEditModal(true);
	};

	useEffect(() => {
		getCategory()
			.then((data) => {
				setCategories({
					...data,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Unable to find Category");
			});
	}, []);

	//For getting the product from server

	useEffect(() => {
		getProducts();
	}, []);

	//Get products function

	const getProducts = (pageNumber = 0, pageSize = 10, sortBy = "addedDate", sortDir = "asc") => {
		//Calling services Api for get
		getAllProducts(pageNumber, pageSize, sortBy, sortDir)
			.then((data) => {
				console.log(data);
				setProducts({
					...data,
				});
			})
			.catch((error) => {
				toast.error("Error in adding product");
				console.log(error);
			});
	};

	const updateProductList = (productId) => {
		const updatedProduct = products.content.filter((p) => p.productId !== productId);
		setProducts({
			...products,
			content: updatedProduct,
		});
	};

	//Handle Update submit form

	const handleUpdateFormSubmit = (event) => {
		event.preventDefault();

		updateProduct(currentProduct, currentProduct.productId)
			.then((data) => {
				console.log(data);

				//Update image
				if (imageUpdate.image && imageUpdate.imagePreview) {
					addProductImage(imageUpdate.image, currentProduct.productId)
						.then((data) => {
							console.log(data);
							setCurrentProduct({
								...currentProduct,
								productImageName: data.imageName,
							});
						})
						.catch((error) => {
							console.log(error);
							toast.error("Error in updating image");
						});

					setImageUpdate({
						image: undefined,
						imagePreview: undefined,
					});
				}

				const newProduct = products.content.map((p) => {
					if (p.productId === currentProduct.productId) {
						return data;
					}
					return p;
				});

				setProducts({
					...products,
					content: newProduct,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error in updating product");
			});
	};

	//Button operation for View Products by Icon
	const ViewProductModalView = () => {
		return (
			currentProduct && (
				<>
					<Modal size="xl" show={show} onHide={handleViewClose}>
						<Modal.Header closeButton>
							<Modal.Title>{currentProduct.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Card className="shadow">
								<Card.Body>
									{/* Product image */}

									<Container className="text-center">
										<img
											src={
												currentProduct.productImageName
													? getProductImageUrl(currentProduct.productId)
													: logo
											}
											alt=""
											style={{
												width: "300px",
											}}
										/>
									</Container>

									{/* Information table */}

									<Table striped bordered responsive>
										<thead>
											<tr>
												<th>Info</th>
												<th>Value</th>
											</tr>
										</thead>

										<tbody>
											<tr>
												<td>Quantity</td>
												<td>{currentProduct.quantity}</td>
											</tr>

											<tr>
												<td>Price</td>
												<td>₹ {currentProduct.price}</td>
											</tr>

											<tr>
												<td>Discounted Price</td>
												<td>₹ {currentProduct.discountedPrice}</td>
											</tr>
										</tbody>
									</Table>

									{/* Description */}
									<div
										className="p-3 border-2"

										// dangerouslySetInnerHTML={{
										//   __html: currentProduct.description,
										// }}
									>
										<ShowHtml HtmlText={currentProduct.description} />
									</div>
								</Card.Body>
							</Card>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleViewClose}>
								Close
							</Button>
							{/* <Button variant="primary" onClick={handleViewClose}>
                Save Changes
              </Button> */}
						</Modal.Footer>
					</Modal>
				</>
			)
		);
	};

	//Editing image modal

	const handleUpdateFileChange = (event) => {
		if (
			event.target.files[0].type === "image/png" ||
			event.target.files[0].type === "image/jpeg"
		) {
			//Preview image
			const reader = new FileReader();

			reader.onload = (r) => {
				setImageUpdate({
					imagePreview: r.target.result,
					image: event.target.files[0],
				});
			};
			reader.readAsDataURL(event.target.files[0]);
		} else {
			toast.error("Invalid Image Type");
			setImageUpdate({
				image: undefined,
				imagePreview: undefined,
			});
		}
	};

	//For editing product

	const editProductModalView = () => {
		return (
			currentProduct && (
				<>
					<Modal
						show={showEditModal}
						onHide={closeEditProductModal}
						animation={false}
						size="xl"
					>
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleUpdateFormSubmit}>
								<FormGroup className="mt-4">
									<Form.Label>Product title</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter here"
										value={currentProduct.title}
										onChange={(event) =>
											setCurrentProduct({
												...currentProduct,
												title: event.target.value,
											})
										}
									/>
								</FormGroup>

								{/* Product Description */}

								<FormGroup className="mt-3">
									<Form.Label>Product Description</Form.Label>
									<Editor
										apiKey="vyvivmj4xvs0dzznywi04jr0z4w1b1porav9f7fa0d4lhthb"
										onInit={(evt, editor) => (editorRef.current = editor)}
										init={{
											height: 350,
											menubar: true,
											plugins: [
												"advlist",
												"autolink",
												"lists",
												"link",
												"image",
												"charmap",
												"preview",
												"anchor",
												"searchreplace",
												"visualblocks",
												"code",
												"fullscreen",
												"insertdatetime",
												"media",
												"table",
												"code",
												"help",
												"wordcount",
											],
											toolbar:
												"undo redo | blocks | " +
												"bold italic forecolor | alignleft aligncenter " +
												"alignright alignjustify | bullist numlist outdent indent | " +
												"removeformat | help",
											content_style:
												"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
										}}
										value={currentProduct.description}
										onEditorChange={(event) =>
											setCurrentProduct({
												...currentProduct,
												description: editorRef.current.getContent(),
											})
										}
									/>
								</FormGroup>

								<Row>
									<Col>
										<FormGroup className="mt-3">
											<Form.Label>Price</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter here"
												value={currentProduct.price}
												onChange={(event) =>
													setCurrentProduct({
														...currentProduct,
														price: event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>

									<Col>
										<FormGroup className="mt-3">
											<Form.Label>Discounted Price</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter here"
												value={currentProduct.discountedPrice}
												onChange={(event) =>
													setCurrentProduct({
														...currentProduct,
														discountedPrice: event.target.value,
													})
												}
											/>
										</FormGroup>
									</Col>
								</Row>

								<FormGroup className="mt-3">
									<Form.Label>Quantity</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter here"
										value={currentProduct.quantity}
										onChange={(event) =>
											setCurrentProduct({
												...currentProduct,
												quantity: event.target.value,
											})
										}
									/>
								</FormGroup>

								<Row className="mt-3 px-1">
									<Col>
										<Form.Check
											type="switch"
											label={"Live"}
											checked={currentProduct.live}
											onChange={(event) =>
												setCurrentProduct({
													...currentProduct,
													live: !currentProduct.live,
												})
											}
										/>
									</Col>

									<Col>
										<Form.Check
											type="switch"
											label={"Stock"}
											checked={currentProduct.stock}
											onChange={(event) =>
												setCurrentProduct({
													...currentProduct,
													stock: !currentProduct.stock,
												})
											}
										/>
									</Col>
								</Row>

								<Form.Group className="mt-3">
									<Container className="mt-3 text-center">
										<p className="text-muted">Image Preview</p>
										<img
											className="img-fluid"
											style={{
												maxHeight: "250px",
											}}
											alt=""
											src={
												imageUpdate.imagePreview
													? imageUpdate.imagePreview
													: getProductImageUrl(currentProduct.productId)
											}
										/>
									</Container>

									<Form.Label>Select Product Image</Form.Label>
									<InputGroup>
										<Form.Control
											type={"file"}
											onChange={(event) => handleUpdateFileChange(event)}
										/>
										<Button
											variant="outline-secondary"
											onClick={(event) => {
												setImageUpdate({
													image: undefined,
													imagePreview: undefined,
												});
											}}
											className=""
										>
											Clear
										</Button>
									</InputGroup>
								</Form.Group>

								<Form.Group className="mt-3">
									<Form.Label>Category</Form.Label>
									<Form.Select>
										<option value="none">None</option>
										{categories &&
											categories.content.map((cat) => {
												return (
													<option
														selected={
															cat.categoryId === currentProduct.category?.categoryId
														}
														value={cat.categoryId}
														key={cat.categoryId}
													>
														{cat.title}
													</option>
												);
											})}
									</Form.Select>
								</Form.Group>

								<Container className="text-center my-5">
									<Button type="submit" variant="success" className="">
										Save Details
									</Button>
								</Container>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={closeEditProductModal} variant="secondary">
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)
		);
	};

	//Search products
	const searchProducts = () => {
		if (searchQuery === undefined || searchQuery === "") {
			return;
		}

		searchProduct(searchQuery)
			.then((data) => {
				console.log(data);
				setProducts(data);
				setPrevProductState(products);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error in searching products");
			});
	};

	//Component For viewing the product

	const productsView = () => {
		return (
			<Card className="shadow">
				<Card.Body>
					<h5 className="mb-4 text-center text-uppercase">
						<strong>Products List</strong>
					</h5>

					<Form.Group className="mb-4">
						{/* <Form.Label>Search Products</Form.Label> */}
						<InputGroup>
							<Form.Control
								type="text"
								placeholder="Search your product here"
								onChange={(event) => {
									if (event.target.value === "") {
										if (prevProductState) {
											console.log("Product state ", prevProductState);
											setProducts(prevProductState);
										}
									}
									setSearchQuery(event.target.value);
								}}
								value={searchQuery}
							/>
							<Button onClick={searchProducts} variant="outline-secondary">
								<span style={{ color: "black" }}>Search</span>
							</Button>
						</InputGroup>
					</Form.Group>

					<Table className="text-center" striped hover size="sm">
						<thead>
							<tr>
								<th className="px-3 small">#SN</th>
								<th className="px-3 small">Title</th>
								<th className="px-3 small">Quantity</th>
								<th className="px-3 small">Price</th>
								<th className="px-3 small">Discounted Price</th>
								<th className="px-3 small">Live</th>
								<th className="px-3 small">Stock</th>
								<th className="px-3 small">Category</th>
								<th className="px-3 small">Date</th>
								<th className="px-3 small">Action</th>
							</tr>
						</thead>

						<tbody>
							{products.content.map((product, index) => (
								<SingleProductView
									key={index}
									product={product}
									index={index}
									updateProductList={updateProductList}
									handleViewShow={handleViewShow}
									openEditProductModel={openEditProductModel}
								/>
							))}
						</tbody>
					</Table>

					{/* Pagination */}

					<Container className="d-flex justify-content-center">
						<Pagination>
							{/* loop from 0 to totalPages-1 */}

							<Pagination.Prev
								className="me-2"
								onClick={(event) => {
									if (products.pageNumber - 1 < 0) {
										return;
									}
									getProducts(products.pageNumber - 1);
								}}
							/>

							{[...Array(products.totalPages - 1)]
								.map((value, index) => index)
								.map((item) => {
									return products.pageNumber === item ? (
										<Pagination.Item active key={item} className="ms-2">
											{item + 1}
										</Pagination.Item>
									) : (
										<Pagination.Item
											className="ms-2"
											onClick={(event) => {
												getProducts(item);
											}}
											key={item}
										>
											{item + 1}
										</Pagination.Item>
									);
								})}

							<Pagination.Next
								className="ms-2"
								onClick={(event) => {
									if (products.lastPage) {
										return;
									}
									getProducts(products.pageNumber + 1);
								}}
							/>
						</Pagination>
					</Container>
				</Card.Body>
			</Card>
		);
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col>{products ? productsView() : ""}</Col>
				</Row>
			</Container>

			{ViewProductModalView()}
			{editProductModalView()}
		</>
	);
};

export default ViewProduct;
