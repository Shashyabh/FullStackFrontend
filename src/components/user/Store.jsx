import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategory } from "../../services/Category_Service";
import { toast } from "react-toastify";
import { getAllLiveProducts } from "../../services/Product_Service";
import categoryIcon from "../../assests/categoryIcon.png";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Store = () => {
	const [categories, setCategories] = useState(undefined);
	const [products, setProducts] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		loadCategories(0, 15);
		loadProducts(0, 9, "addedDate", "desc");
	}, []);

	useEffect(() => {
		if (currentPage > 0) {
			loadProducts(currentPage, 9, "addedDate", "desc");
		}
	}, [currentPage]);

	//Loading next page

	const loadNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const loadCategories = async (pageNumber, pageSize) => {
		try {
			const categoryData = await getCategory(pageNumber, pageSize);
			setCategories(categoryData);
		} catch (error) {
			console.log(error);
			toast.error("error in fetching categories");
		}
	};

	const loadProducts = async (pageNumber, pageSize, sortBy, sortDir) => {
		try {
			const productData = await getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir);
			if (currentPage > 0) {
				setProducts({
					content: [...products.content, ...productData.content],
					lastPage: productData.lastPage,
					pageNumber: productData.pageNumber,
					pageSize: productData.pageSize,
					totalElements: productData.totalElements,
					totalPages: productData.totalPages,
				});
			} else {
				setProducts({ ...productData });
			}
		} catch (error) {
			console.log(error);
			toast.error("error in fetching categories");
		}
	};

	const categoryView = () => {
		return (
			categories && (
				<>
					<ListGroup variant="flush" className="sticky-top">
						<ListGroup.Item action>
							<img
								className="rounded-circle"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
								src={categoryIcon}
								alt=""
								onError={(event) => {
									event.currentTarget.setAttribute("src", categoryIcon);
								}}
							/>
							<span className="ms-2">All Categories</span>
						</ListGroup.Item>

						{categories.content.map((cat) => (
							<ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} action>
								<img
									className="rounded-circle"
									style={{ width: "40px", height: "40px", objectFit: "cover" }}
									src={cat.coverImage}
									alt="cat.title"
									onError={(event) => {
										event.currentTarget.setAttribute("src", categoryIcon);
									}}
								/>
								<span className="ms-2" key={cat.categoryId}>
									{cat.title}
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</>
			)
		);
	};

	const productView = () => {
		return (
			products && (
				<InfiniteScroll
					dataLength={products.content.length}
					next={loadNextPage}
					hasMore={!products.lastPage}
					loader={<h2 className="p-2 text-center">Loading</h2>}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					<Container>
						<Row>
							{products.content.map((p) => (
								<Col key={p.productId} md={4}>
									<SingleProductCard product={p} />
								</Col>
							))}
						</Row>
					</Container>
				</InfiniteScroll>
			)
		);
	};

	//Return
	return (
		<Container fluid className="px-5 mt-5">
			<Row>
				<Col md={2}>{categoryView()}</Col>
				<Col md={10}>{productView()}</Col>
			</Row>
		</Container>
	);
};

export default Store;
