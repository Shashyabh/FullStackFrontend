import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { getCategory } from "../../services/Category_Service";
import { toast } from "react-toastify";
import categoryIcon from "../../assests/categoryIcon.png";
import { Link } from "react-router-dom";
const CategorySideView = () => {
	const [categories, setCategories] = useState(undefined);
	useEffect(() => {
		loadCategories(0, 15);
	}, []);

	const loadCategories = async (pageNumber, pageSize) => {
		try {
			const categoryData = await getCategory(pageNumber, pageSize);
			setCategories(categoryData);
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
						<ListGroup.Item action as={Link} to={"/store"}>
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
	return categories && categoryView();
};

export default CategorySideView;
