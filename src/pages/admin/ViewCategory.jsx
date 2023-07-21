import React, { useEffect, useState } from "react";
import CategoryView from "../../components/CategoryView";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../services/Category_Service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Modal, Button, Container, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  //View Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Update Model
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [category, setCategory] = useState({
    content: [],
  });

  useEffect(() => {
    getCategory()
      .then((data) => {
        //console.log(data);
        // toast.success("Category fetched successfully")
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in fetching category");
      });
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getCategory(currentPage)
        .then((data) => {
          console.log(data);
          // toast.success("Category fetched successfully")
          setCategory({
            content: [...category.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in fetching category");
        });
    }
  }, [currentPage]);

  //Delete category function here and pass by props to CategoryView
  const deleteCategoryMain = (categoryId) => {
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
        deleteCategory(categoryId)
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const updateCategory = category.content.filter((c) => {
              return c.categoryId !== categoryId;
            });

            setCategory({
              ...category,
              content: updateCategory,
            });
          })
          .catch((error) => {
            toast.error("Error in deleting Category Id");
          });
      }
    });
  };

  //View category function here and pass by props to CategoryView

  const handleView = (category) => {
    setSelectedCategory(category);
    handleShow();
  };

  //Update category function here and pass by props to CategoryView

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    handleShowUpdate();
  };

  const updateCategoryClicked = (event) => {
    event.preventDefault();
    if (selectedCategory.title === undefined || selectedCategory.title === "") {
      toast.error("Invalid Title");
      return;
    }

    updateCategory(selectedCategory)
      .then((data) => {
        toast.success("Category updated");
        const newCategory = category.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });

        setCategory({
          ...category,
          content: newCategory,
        });

        handleCloseUpdate();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update Category");
      });
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  //ModelView : View and Update

  const modelView = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                src={selectedCategory.coverImage}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                }}
                alt=""
              />
            </Container>
            <div className="mt-5">{selectedCategory.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const modelUpdate = () => {
    return (
      <>
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter here"
                  value={selectedCategory.title}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      title: event.target.value,
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Category description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  placeholder="enter here"
                  value={selectedCategory.description}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      description: event.target.value,
                    })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mt-3">
                <Container className="py-1">
                  <img
                    src={selectedCategory.coverImage}
                    className="img-fluid"
                    alt=""
                  />
                </Container>
                <Form.Label>Category Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter here"
                  value={selectedCategory.coverImage}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      coverImage: event.target.value,
                    })
                  }
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={updateCategoryClicked}>
              Save
            </Button>
            <Button
              className="ms-2"
              variant="secondary"
              onClick={handleCloseUpdate}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {category.content.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={category.content.length}
            next={loadNextPage}
            hasMore={!category.lastPage}
            loader={<h2 className="p-2 text-center">Loading</h2>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {category.content.map((cat) => {
              return (
                <CategoryView
                  key={cat.categoryId}
                  cat={cat}
                  deleteCat={deleteCategoryMain}
                  viewCat={handleView}
                  updateCat={handleUpdate}
                />
              );
            })}
          </InfiniteScroll>

          {selectedCategory ? modelView() : ""}

          {selectedCategory ? modelUpdate() : ""}
        </>
      ) : (
        <h5 className="text-center text-uppercase">
          <strong>No category In database</strong>
        </h5>
      )}
    </div>
  );
};

export default ViewCategory;
