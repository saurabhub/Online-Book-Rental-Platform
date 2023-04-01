import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import drawerSlice, { setVisible } from "../../features/cart/drawerSlice";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const imageStyle = {
    // width: "100%",
    // height: "90px",
    objectFit: "contain",
  };

  return (
    <Drawer
      title={`Cart / ${cart.length} Product`}
      placement="right"
      onClose={() => {
        dispatch(setVisible(false));
      }}
      open={drawer}
    >
      {cart.map((item) => (
        <Row key={item._id}>
          <Col>
            {item.images[0] ? (
              <>
                <Card className="mb-3" style={{ maxWidth: "540px" }}>
                  <Row className="g-0">
                    <Col md="2">
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        style={imageStyle}
                        className="img-fluid rounded-start"
                      />
                    </Col>
                    <Col md="10" className="my-auto">
                      <CardBody className="py-0">
                        <CardTitle tag="h6">{item.title}</CardTitle>
                        <CardText>Quantity: {item.count}</CardText>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </>
            ) : (
              <>
                <Card className="mb-3" style={{ maxWidth: "540px" }}>
                  <Row className="g-0">
                    <Col md="12">
                      <CardBody>
                        <CardTitle tag="h6">{item.title}</CardTitle>
                        <CardText>Quantity: {item.count}</CardText>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </>
            )}
          </Col>
        </Row>
      ))}

      <Link to="/cart">
        <Button
          color="primary"
          className="d-flex ms-auto align-items-center justify-content-center gap-2"
          onClick={() => {
            dispatch(setVisible(false));
          }}
        >
          Go to Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
