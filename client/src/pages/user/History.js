import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { listUserOrders } from "../../functions/user";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { CheckCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    listUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const showOrderInTable = (order) => (
    <Table responsive hover>
      <thead>
        <tr className="table-secondary">
          <th>Title</th>
          <th>Price</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Count</th>
          <th>Shipping</th>
        </tr>
      </thead>

      <tbody className="h-auto">
        {order.products.map((p, i) => (
          <tr key={i} className="h-auto">
            <th scope="row">
              <strong>{p.product.title}</strong>
            </th>
            <td>₹{p.product.price}</td>
            <td>{p.product.author?.name}</td>
            <td>{p.product.publisher?.name}</td>
            <td>{p.count}</td>
            <td className="text-center">
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined className="text-success" />
              ) : (
                <CheckCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const showDownloadLink = (order) => (
    <>
      <PDFDownloadLink document={<Invoice order={order} />} fileName="invoice.pdf">
        {({loading})=> (loading ? <Button size="sm" color="primary">
          Loading Document ...
        </Button> : <Button size="sm" color="primary">
          Download Invoice
        </Button>)}
        
      </PDFDownloadLink>
    </>
  );

  const showEachOrders = () => (
    <Col xs="12">
      {orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <Row>
            <Col>{showDownloadLink(order)}</Col>
          </Row>
        </div>
      ))}
    </Col>
  );

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <UserNav />
        </Col>
        <Col className="p-0" xs="10">
          <Container className="" fluid>
            {orders.length >= 1 ? (
              <h4 className="text-center mt-3">User Orders</h4>
            ) : (
              <h4 className="text-center mt-3">No Purchase History</h4>
            )}
            <Row className="p-0 mx-3 mt-4">{showEachOrders()}</Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default History;
