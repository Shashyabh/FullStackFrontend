import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addCategory } from '../../services/Category_Service'

const AddCategory = () => {


  const[category,setCategory]=useState({
    title:"",
    description:"",
    coverImage:""
  })

  const handleFieldChange=(event,property)=>{
    event.preventDefault();
    setCategory({
      ...category,
      [property]:event.target.value
    })
  }

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    if(category.title===undefined || category.title===''){
      toast.error("Title required");
      return
    }

    addCategory(category)
    .then((data)=>{
      console.log(data)
      toast.success("Category Added successfully")
      setCategory({
        title:"",
        description:"",
        coverImage:""
      })
    })
    .catch((error)=>{
      console.log(error)
      toast.error("Falied to add Category")
    })
  }


  const handleClearForm=(event)=>{
    event.preventDefault();
    setCategory({
      title:"",
      description:"",
      coverImage:""
    })
  }


  return (
    <>
      <Container fluid>
        <Card className='border border-0 shadow'>
          {/* {JSON.stringify(category)} */}
          <Card.Body>
            <h5 className='text-center text-uppercase'><strong>Add Your Category Here</strong></h5>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className='mt-3'>
                <Form.Label>Category title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category here'
                  onChange={(event)=>handleFieldChange(event,'title')}
                  value={category.title}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={'textarea'}
                  rows={6}
                  placeholder='Enter description here'
                  onChange={(event)=>handleFieldChange(event,'description')}
                  value={category.description}

                >
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Cover image Url</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter here'
                  onChange={(event)=>handleFieldChange(event,'coverImage')}
                  value={category.coverImage}
                >
                </Form.Control>
              </Form.Group>

              <Container className='text-center mt-4'>
                <Button type='submit' variant='success' size='md' >Add Category</Button>
                <Button onClick={handleClearForm} className='ms-2' variant='danger' size='md' >Clear</Button>

              </Container>

            </Form>
          </Card.Body>
        </Card>
      </Container>
    
    
    </>
  )
}

export default AddCategory