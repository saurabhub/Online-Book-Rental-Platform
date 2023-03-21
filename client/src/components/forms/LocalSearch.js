import React from "react";
import { Input } from "reactstrap";

const LocalSearch = ({keyword, setKeyword}) => {
  return (
    <Input
      id="keyword"
      name="keyword"
      placeholder="Filter Category by Name"
      type="search"
      value={keyword}
      onChange={(e) => {
        e.preventDefault();
        setKeyword(e.target.value).toLowerCase();
      }}
    />
  );
};

export default LocalSearch;
