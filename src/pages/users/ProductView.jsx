import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/Product_Service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/Helper_Service";
import defaultProductImage from "../../assests/defaultProductImage.png";
import CartContext from "../../context/CartContext";

const ProductView = () => {
	const { addItemCart } = useContext(CartContext);
	const [product, setProduct] = useState(undefined);
	const { productId } = useParams();

	useEffect(() => {
		loadSingleProduct(productId);
	}, []);

	const loadSingleProduct = async (productId) => {
		try {
			const productData = await getSingleProduct(productId);
			console.log(productData);
			setProduct(productData.data);
		} catch (error) {
			console.log(error);
			toast.error("Unable to Fetch User Data");
		}
	};

	const handleAddItem = (quantity, productId) => {
		addItemCart(quantity, productId);
		// toast.info("Item added successfully");
	};

	const productView = () => {
		return (
			<Container className="py-4">
				<Row>
					<Col>
						<Card className="mt-4 shadow">
							<Card.Body>
								<Container className=" my-4">
									<Row>
										{/* Image Column */}
										<Col md={5}>
											<img
												style={{ width: "300px" }}
												src={getProductImageUrl(product.productId)}
												alt=""
												onError={(event) => {
													event.currentTarget.setAttribute("src", defaultProductImage);
												}}
											/>
										</Col>

										{/* Title and Price Column */}
										<Col md={7}>
											<h2>{product.title}</h2>
											<p>
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
												Architecto, quia.
											</p>
											<Container className="mt-4">
												<Badge className="me-4" pill bg="info">
													{product.category?.title}
												</Badge>
												<Badge pill bg={product.stock ? "success" : "danger"}>
													{product.stock ? "In Stock" : "Out Of Stock"}
												</Badge>
											</Container>
											<Container className="mt-5 text-center">
												<span className="h5 text-muted">
													<s className="me-4">Price : ₹{product.price}</s>
												</span>

												<span className=" h5 text-muted">
													Discounted Price: ₹{product.discountedPrice}
												</span>
											</Container>

											<Container className="d-grid mt-4">
												<Button
													disabled={!product.stock}
													variant="warning"
													size="sm"
													onClick={(event) => handleAddItem(1, productId)}
												>
													Add To Cart
												</Button>

												<Button
													as={Link}
													to="/store"
													className="mt-2"
													variant="info"
													size="sm"
												>
													Go To Store
												</Button>
											</Container>
										</Col>
									</Row>
								</Container>
								<Container>
									<div className="mt-4 mx-4">
										<ShowHtml HtmlText={product.description} />
									</div>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	};

	return product && productView();
};

export default ProductView;
