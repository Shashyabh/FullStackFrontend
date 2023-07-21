import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProductOfCategories } from "../../services/Product_Service";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Col, Container, ListGroup, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/user/SingleProductCard";
import CategorySideView from "../../components/user/CategorySideView";

const CategoryStorePage = () => {
	const { categoryId, categoryTitle } = useParams();

	const [products, setProducts] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		loadProductOfCategory(0, 24, "addedDate", "desc");
	}, [categoryId]);

	useEffect(() => {
		if (currentPage > 0) {
			loadProductOfCategory(currentPage, 6, "addedDate", "desc");
		}
	}, [currentPage]);

	const loadNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const loadProductOfCategory = async (pageNumber, pageSize, sortBy, sortDir) => {
		try {
			const productData = await getProductOfCategories(
				categoryId,
				pageNumber,
				pageSize,
				sortBy,
				sortDir
			);
			console.log("pdata ", productData);
			if (currentPage > 0) {
				setProducts({
					content: [...products.content, ...productData.data.content],
					lastPage: productData.lastPage,
					pageNumber: productData.pageNumber,
					pageSize: productData.pageSize,
					totalElements: productData.totalElements,
					totalPages: productData.totalPages,
				});
			} else {
				setProducts({ ...productData.data });
			}
		} catch (error) {
			console.log(error);
			toast.error("error in fetching categories");
		}
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

	return (
		products && (
			<>
				<Container fluid className="px-5 pt-5">
					<Row>
						{/* <Container className="d-flex justify-content-center">
							<Breadcrumb style={{ fontFamily: "serif", fontSize: "1.2rem", fontWeight: "bold" }}>
								<Breadcrumb.Item as={Link} to={"/store"}>
									Store
								</Breadcrumb.Item>
								<Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
							</Breadcrumb>
						</Container> */}
						<Col md={2}>
							<CategorySideView />
						</Col>

						<Col md={10}>
							{products.content.length > 0 ? (
								productView()
							) : (
								<h3>No Items In This Category</h3>
							)}
						</Col>
					</Row>
				</Container>
			</>
		)
	);
};

export default CategoryStorePage;
