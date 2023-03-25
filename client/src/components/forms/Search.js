import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import { searchQuery } from "../../features/search/searchSlice";

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(searchQuery({ text: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex align-items-center"
    >
      <Label for="search" hidden>
        Search
      </Label>
      <Input
        id="search"
        name="search"
        placeholder="Search"
        type="search"
        value={text}
        onChange={handleChange}
        bsSize="sm"
        className="rounded-pill"
      />
    </Form>
  );
};

export default Search;
