import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Alert, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
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
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="alert alert-secondary">
          <ShowPaymentInfo order={order} showStatus={false} />
          <Form>
            <FormGroup row>
              <Label sm={2} for="deliveryStatus" className="text-dark">
                <strong> Delivery Status : </strong>
              </Label>
              <Col sm={10}>
              <Input
                id="deliveryStatus"
                name="deliveryStatus"
                type="select"
                defaultValue={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </Input>
              </Col>
            </FormGroup>
          </Form>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
