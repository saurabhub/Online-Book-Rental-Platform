import React from "react";
import { Col, Row } from "reactstrap";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <div className="col">Admin Dashboard page</div>
      </Row>
    </>
  );
};

export default AdminDashboard;
