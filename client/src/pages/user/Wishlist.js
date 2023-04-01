import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      // console.log(res.data);
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <UserNav />
        </Col>
        <Col className="p-0" xs="10">
          <Container className="" fluid>
            <h4 className="text-center mt-3">Wishlist</h4>
            <Row className="p-0 mx-3 mt-4">
              <Col xs="12" className="mb-4">
              {wishlist.map((p) => (
              <ListGroup className="my-1" key={p._id}>
                <ListGroupItem
                  className="d-flex align-items-center"
                  color="info"
                >
                  <Link to={`/product/${p.slug}`} className="me-auto">
                  <span>{p.title}</span>
                  </Link>
                  <span>
                    <DeleteOutlined
                      onClick={() => handleRemove(p._id)}
                      className="px-1 text-danger"
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            ))}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Wishlist;
