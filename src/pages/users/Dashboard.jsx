import React, { useContext } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import UserContext from '../../context/User_Context'
import {Button, Card, Col, Container, Row } from 'react-bootstrap'
import { isLoggedIn } from '../../auth/Helper.auth'

const Dashboard = () => {

  const userContext= useContext(UserContext);

  const dashboardView=()=>{
    return(
      <div>
      {/* <h1>This is a User Dashboard</h1> */}
      
      <Outlet></Outlet>
      </div>
    )  
  }
  //Not logged In view

  const notLoggedInView=()=>{
    return(
      <Container>
          
          <Row>
              <Col md={{span:8,offset:2}}>
                  <Card className='mt-3 border-0 shadow'>
                      <Card.Body className='text-center'>
                          <h3 >You are not Logged In !!</h3>
                          <p>Please do login now</p> 
                          <Button as={NavLink} to="/login" variant='success'>Login</Button>                      

                      </Card.Body>
                  </Card>
              </Col>
          </Row>
      </Container>
    )
  }

  return (
      //(userContext.isLogin)? dashboardView(): notLoggedInView()
      (isLoggedIn())? dashboardView(): <Navigate to="/login" />
  )
}

export default Dashboard