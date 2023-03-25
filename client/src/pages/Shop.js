import { Checkbox, Menu, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import HomeProductCard from "../components/cards/HomeProductCard";
import {
  fetchProductsByFilter,
  getAllProductsByCount,
} from "../functions/product";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { searchQuery } from "../features/search/searchSlice";
import { getAllCategory } from "../functions/category";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const [price, setPrice] = useState([0, 0]);
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState([]);

  useEffect(() => {
    loadAllProducts();
    getAllCategory().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadAllProducts = () => {
    getAllProductsByCount(12).then((product) => {
      setProducts(product.data);
      setLoading(false);
    });
  };

  const handleSlider = (value) => {
    dispatch(searchQuery({ text: "" }));
    setCheckedCategoryIds([])
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    dispatch(searchQuery({ text: "" }));
    setPrice([0,0])
    let inTheState = [...checkedCategoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCheckedCategoryIds(inTheState);
    fetchProducts({category: inTheState})
  };
  // console.log("category ids", checkedCategoryIds);

  const showCategories = () =>
    categories.map((category) => ({
      label: (
        <Checkbox
          key={category._id}
          name="category"
          value={category._id}
          checked={checkedCategoryIds.includes(category._id)}
          onChange={handleCheck}
        >
          {category.name}
        </Checkbox>
      ),
      key: category._id,
      className: "ps-4",
    }));

  const items = [
    {
      label: "Price",
      key: "price",
      icon: <DollarOutlined />,
      children: [
        {
          label: (
            <div className="px-2">
              <Slider
                range
                value={price}
                tooltip={{ formatter: (value) => `₹${value}` }}
                max="4999"
                onChange={handleSlider}
              />
            </div>
          ),
          key: "1",
          className: "px-3",
        },
      ],
    },
    {
      label: "Category",
      key: "category",
      icon: <DownSquareOutlined />,
      children: showCategories(),
    },
  ];

  // submenu keys of first level
  const rootSubmenuKeys = ["price", "category"];
  const [openKeys, setOpenKeys] = useState(["price"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <div className="mb-3 text-black bg-secondary">
            <h4 className="text-center py-3 d-flex align-items-center justify-content-center">
              Apply Filters
            </h4>
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            // style={{
            //   width: 256,
            // }}
            items={items}
          />
        </Col>
        <Col className="p-0" xs="10">
          <Container className="" fluid>
            <div className="mb-5 display-4 text-black bg-secondary">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <h4 className="text-center py-3 text-uppercase fw-bold">
                  Buy Books
                </h4>
              )}
            </div>
            {products.length < 1 && <p>No product found with that keyword</p>}
            <Row className="p-0 mx-3 mt-4">
              {products.map((product) => (
                <Col key={product._id} xs="12" sm="6" lg="4" className="mb-4">
                  {<HomeProductCard product={product} />}
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Shop;
