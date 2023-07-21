import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/Helper_Service";
import "../user/SingleProductCard.css";
import defaultProductImage from "../../assests/defaultProductImage.png";
import { Link } from "react-router-dom";

const SingleProductCard = ({ product }) => {
	return (
		<Card className="shadow m-3" style={{ borderRadius: "10px" }}>
			<Card.Body>
				<Container className="text-center">
					<img
						className="product-image"
						src={
							product.productImageName
								? getProductImageUrl(product.productId)
								: defaultProductImage
						}
						alt=""
					/>
				</Container>
				<h6>{product.title}</h6>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores!</p>
				<Badge pill bg="info">
					{product.category?.title}
				</Badge>

				<Badge className="ms-2" pill bg={product.stock ? "success" : "danger"}>
					{product.stock ? "In Stock" : "Out Of Stock"}
				</Badge>
				<Container className="text-end">
					<span className="h5 text-muted">
						<s>₹{product.price}</s>
					</span>

					<span className=" ms-3 h5 text-muted">₹{product.discountedPrice}</span>
				</Container>

				<Container className="d-grid mt-4">
					<Button
						as={Link}
						to={`/store/products/${product.productId}`}
						variant="info"
						size="sm"
						style={{ color: "black", fontSize: "20px" }}
					>
						View Product
					</Button>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default SingleProductCard;
