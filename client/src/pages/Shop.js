import { Checkbox, Menu, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Col, Container, Row } from "reactstrap";
import HomeProductCard from "../components/cards/HomeProductCard";
import {
  fetchProductsByFilter,
  getAllProductsByCount,
} from "../functions/product";
import { BookOutlined, DollarOutlined, DownSquareOutlined, ReadOutlined, StarOutlined, TagOutlined } from "@ant-design/icons";
import { searchQuery } from "../features/search/searchSlice";
import { getAllCategory } from "../functions/category";
import StarFilter from "../components/forms/StarFilter";
import { getAllSub } from "../functions/sub";
import { getAllAuthor } from "../functions/author";
import { getAllPublisher } from "../functions/publisher";

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
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    loadAllProducts();
    getAllCategory().then((res) => setCategories(res.data));
    getAllSub().then((res) => setSubs(res.data));
    getAllAuthor().then((res) => setAuthors(res.data));
    getAllPublisher().then((res) => setPublishers(res.data));
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if(!text)
        loadAllProducts()
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
    setCheckedCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setAuthor("");
    setPublisher("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    dispatch(searchQuery({ text: "" }));
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setAuthor("");
    setPublisher("");
    let inTheState = [...checkedCategoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCheckedCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
    if(inTheState == ""){
      loadAllProducts()
    }
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

  const handleStarClick = (num) => {
    // console.log(num)
    dispatch(searchQuery({ text: "" }));
    setPrice([0, 0]);
    setCheckedCategoryIds([]);
    setSub("");
    setAuthor("");
    setPublisher("");
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => {
    let stars = [];
    for (let i = 5; i > 0; i--) {
      stars.push({
        label: <StarFilter starClick={handleStarClick} numberOfStars={i} />,
        key: `${i}star`,
        className: "ps-4 px-0 ms-0 me-0",
      });
    }
    return stars;
  };

  const handleSub = (sub) => {
    setSub(sub);
    dispatch(searchQuery({ text: "" }));
    setPrice([0, 0]);
    setCheckedCategoryIds([]);
    setStar("");
    setAuthor("");
    setPublisher("");
    fetchProducts({ sub });
  };
  const handleAuthor = (author) => {
    setAuthor(author);
    dispatch(searchQuery({ text: "" }));
    setPrice([0, 0]);
    setCheckedCategoryIds([]);
    setStar("");
    setPublisher("");
    fetchProducts({ author });
  };
  const handlePublisher = (publisher) => {
    setPublisher(publisher);
    dispatch(searchQuery({ text: "" }));
    setPrice([0, 0]);
    setCheckedCategoryIds([]);
    setStar("");
    setAuthor("");
    fetchProducts({ publisher });
  };

  const showSubs = () =>
    subs.map((sub) => ({
      label: (
        <Badge key={sub._id} onClick={() => handleSub(sub)} color="dark">
          {sub.name}
        </Badge>
      ),
      key: sub._id,
      className: "p-0 px-1 m-0 w-auto h-auto d-inline-block",
    }));
  const showAuthor = () =>
    authors.map((author) => ({
      label: (
        <Badge
          key={author._id}
          onClick={() => handleAuthor(author)}
          color="dark"
        >
          {author.name}
        </Badge>
      ),
      key: author._id,
      className: "p-0 px-1 m-0 w-auto h-auto d-inline-block",
    }));
  const showPublisher = () =>
    publishers.map((publisher) => ({
      label: (
        <Badge
          key={publisher._id}
          onClick={() => handlePublisher(publisher)}
          color="dark"
        >
          {publisher.name}
        </Badge>
      ),
      key: publisher._id,
      className: "p-0 px-1 m-0 w-auto h-auto d-inline-block",
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
          key: "slider",
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
    {
      label: "Rating",
      key: "rating",
      icon: <StarOutlined />,
      children: showStars(),
    },
    {
      label: "Sub Categories",
      key: "subs",
      icon: <TagOutlined />,
      children: showSubs(),
    },
    {
      label: "Author",
      key: "author",
      icon: <BookOutlined />,
      children: showAuthor(),
    },
    {
      label: "Publisher",
      key: "publisher",
      icon: <ReadOutlined  />,
      children: showPublisher(),
    },
  ];

  // submenu keys of first level
  const rootSubmenuKeys = [
    "price",
    "category",
    "rating",
    "subs",
    "author",
    "publisher",
  ];
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
            {products.length < 1 && <p>No product found with that filter!</p>}
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
