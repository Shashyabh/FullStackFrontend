import React, { useEffect } from "react";
import { getAllUsers } from "../../services/User_Service";
import { toast } from "react-toastify";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";

const AdminUser = () => {
  const [userData, setUserData] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getUsers(0, 5, "name", "asc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, 5, "name", "asc");
    }
  }, [currentPage]);

  const getUsers = async (pageNumber, pageSize, sortBy, sortDir) => {
    try {
      const data = await getAllUsers(pageNumber, pageSize, sortBy, sortDir);
      //toast.success("User fetched successfully");
      if (currentPage === 0) {
        setUserData({
          ...data,
        });
      } else {
        setUserData({
          content: [...userData.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting User Data");
    }
  };

  //Load next page

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="shadow">
              <Card.Body>
                <h3
                  style={{
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                  className="text-center text-uppercase"
                >
                  Users List
                </h3>
                <InfiniteScroll
                  dataLength={userData.content.length}
                  next={loadNextPage}
                  hasMore={!userData.lastPage}
                  loader={<h2 className="p-2 text-center">Loading</h2>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {userData.content.map((user) => (
                    <SingleUserView user={user} />
                  ))}
                </InfiniteScroll>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{userData && userView()}</>;
};

export default AdminUser;
