import React from "react";
import { Card, Col, Container, Row,Button } from "react-bootstrap";
import logo from '../assests/logo.png'

const CategoryView = ({cat,deleteCat,viewCat,updateCat}) => {

  return (
    <div className="mb-2">
      <Card className="shadow-lg">
        <Card.Body>
          <Row>
            <Col md={2}>
                <img src={cat.coverImage? cat.coverImage :logo} style={{
                    width:"120px",
                    height:"120px",
                    borderRadius:"20%",
                    objectFit:"cover"
                }}  alt=""/>
            </Col>
            <Col md={8}>
              <h5>{cat.title}</h5>
              <p>
                {cat.description}
              </p>
            </Col>

            <Col md={2}>
                <Container className="d-grid align-items-center">
                    <Button variant="danger" size="sm" onClick={(event)=>deleteCat(cat.categoryId)}>Delete</Button>
                    <Button variant="info" size="sm" className="mt-2" onClick={(event)=>viewCat(cat)}>View</Button>
                    <Button variant="warning" size="sm" className="mt-2" onClick={(event)=>updateCat(cat)}>Update</Button>
                </Container>
            </Col>

          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryView;
