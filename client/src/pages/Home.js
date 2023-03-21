import React, { useEffect, useState } from "react";
import {
  getAllProductsByCount,
  getProductsByCondition,
} from "../functions/product";
import { Col, Container, Row } from "reactstrap";
import HomeProductCard from "../components/cards/HomeProductCard";
import Jumbotron from "../components/cards/Typewriter";
import LoadingCard from "../components/cards/LoadingCard";
import NewBooks from "../components/home/NewBooks";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="p-2 py-3 mb-3 bg-secondary">
        <h1 className="text-center text-white mt-3 display-5 fw-bold ">
          <Jumbotron text={["Best Sellers", "Rent Books", "Resell Books"]} />
        </h1>
      </div>
      <NewBooks />
      <BestSellers />
    </>
  );
};

export default Home;
