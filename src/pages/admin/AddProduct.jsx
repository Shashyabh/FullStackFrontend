import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  FormGroup,
  Container,
  Button,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {addProductImage,createProductWithCategory,createProductWithoutCategory,} from "../../services/Product_Service";
import { getCategory } from "../../services/Category_Service";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";



const AddProduct = () => {
  const [category, setCategory] = useState(undefined);

  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });



    //Clear form
    const clearForm=()=>{
      editorRef.current.setContent('');
      setProduct({
        title: "",
        description: "",
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: undefined,
      });
    }



  //For rich text editor

  const editorRef=useRef()


  useEffect(() => {
    getCategory(0)
      .then((data) => {
        console.log(data);
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Category fetching failed");
      });
  }, []);

  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //Preview image
      const reader = new FileReader();

      reader.onload = (r) => {
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid Image Type");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };






  //Submit form

  const submitAddProductForm = (event) => {
    event.preventDefault();
    if (product.title === undefined || product.title === "") {
      toast.error("Invalid title");
      return;
    }

    if (product.description === undefined || product.description === "") {
      toast.error("Invalid description");
      return;
    }

    if (product.price < 0) {
      toast.error("Product price shold be positive");
      return;
    }
    // if (product.price < product.discountedPrice) {
    //   toast.error(
    //     "Discounted Price should be less than Price"
    //   );
    //   return;
    // }

    if (selectedCategoryId === "none") {
      createProductWithoutCategory(product)
        .then((data) => {
          console.log(data);
          toast.success("Product created successfully");


          if(!product.image){
            clearForm()
            return
          }

          //Image upload

          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);

              //Clear all filed after submit
              clearForm()
            })
            .catch((error) => {
              console.log(error);
              toast.error("Image upload failed");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Product creation failed");
        });
    } else {
      createProductWithCategory(product, selectedCategoryId)
        .then((data) => {
          console.log(data);
          toast.success("Product created successfully");

          if(!product.image){
            clearForm()
            return
          }

          //Image upload

          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);
              //Clear all filed after submit
              clearForm();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Image upload failed");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Product creation failed");
        });
    }
  };




  const formView = () => {
    return (
      <>
        <Card className="border border-0 shadow">
          <Card.Body>
            <h2 className="text-center">Add Your Product Here</h2>
            <Form onSubmit={submitAddProductForm}>
              <FormGroup className="mt-4">
                <Form.Label>Product title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={product.title}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      title: event.target.value,
                    })
                  }
                />
              </FormGroup>

              {/* Product Description */}

              <FormGroup className="mt-3">
                <Form.Label>Product Description</Form.Label>
                {/* <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter here"
                  value={product.description}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      description: event.target.value,
                    })
                  }
                /> */}
                <Editor
                  apiKey=""
                  onInit={(evt,editor)=>editorRef.current=editor}
                  init={{
                    height: 350,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}

                  onEditorChange={()=>setProduct({
                    ...product,
                    description:editorRef.current.getContent()
                  })}
                />
              </FormGroup>

              <Row>
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      value={product.price}
                      onChange={(event) =>
                        setProduct({
                          ...product,
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
                      value={product.discountedPrice}
                      onChange={(event) =>
                        setProduct({
                          ...product,
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
                  value={product.quantity}
                  onChange={(event) =>
                    setProduct({
                      ...product,
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
                    checked={product.live}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        live: !product.live,
                      });
                    }}
                  />
                </Col>

                <Col>
                  <Form.Check
                    type="switch"
                    label={"Stock"}
                    checked={product.stock}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      });
                    }}
                  />
                </Col>
              </Row>

              <Form.Group className="mt-3">
                <Container
                  hidden={!product.imagePreview}
                  className="mt-3 text-center"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    src={product.imagePreview}
                    style={{
                      maxHeight: "150px",
                    }}
                    className="image-fluid"
                    alt=""
                  />
                </Container>

                <Form.Label>Select Product Image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={"file"}
                    onChange={(event) => handleFileChange(event)}
                  />
                  <Button
                    onClick={(event) => {
                      setProduct({
                        ...product,
                        image: undefined,
                        imagePreview: undefined,
                      });
                    }}
                    variant="outline-secondary"
                  >
                    Clear
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setSelectedCategoryId(event.target.value);
                  }}
                >
                  <option value="none">None</option>
                  {category ? (
                    <>
                      {category.content.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.title}
                        </option>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Select>
              </Form.Group>

              <Container className="text-center mt-3">
                <Button type="submit" variant="success" className="">
                  Add Product
                </Button>
                <Button onClick={clearForm} variant="danger" className="ms-3">
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
