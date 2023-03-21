import { Skeleton } from "antd";
import React from "react";
import { Col, Row } from "reactstrap";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col xs="4" className="mb-4">
          <Skeleton active></Skeleton>
        </Col>
      );
    }
    return totalCards;
  };
  return <Row className="p-0 mx-3 mt-4">{cards()}</Row>;
};

export default LoadingCard;
