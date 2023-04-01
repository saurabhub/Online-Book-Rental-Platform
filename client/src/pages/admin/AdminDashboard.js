import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { changeStatus, getOrders } from "../../functions/admin";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0" xs="10">
          <Container className="" fluid>
            <h4 className="text-center mt-3">Admin Dashboard</h4>
            <Row className="p-0 mx-3 mt-4">
              <Col xs="12" className="mb-4">
                <Orders
                  orders={orders}
                  handleStatusChange={handleStatusChange}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
