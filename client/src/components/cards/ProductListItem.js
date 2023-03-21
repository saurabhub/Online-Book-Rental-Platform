import React from "react";
import { Link } from "react-router-dom";
import { List, ListGroup } from "reactstrap";

const ProductListItem = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    author,
    publisher,
    quantity,
    sold,
  } = product;
  return (
    <>
      <List type="unstyled" className="d-flex gap-2 flex-column mt-3">
        <li className="d-flex justify-content-between">
          Price <span>₹ {price}</span>
        </li>
        {category && (
          <li className="d-flex justify-content-between">
            Category
            <Link to={`/category/${category.slug}`}>
              <span>{category.name}</span>
            </Link>
          </li>
        )}
        {subs && (
          <li className="d-flex justify-content-between">
            Sub Categories
            {subs.map((sub) => (
              <Link key={sub._id} to={`/sub/${sub.slug}`}>
                <span>{sub.name}</span>
              </Link>
            ))}
          </li>
        )}

        <li className="d-flex justify-content-between">
          Shipping <span>{shipping}</span>
        </li>
        {author && (
          <li className="d-flex justify-content-between">
            Author
              <span>{author.name}</span>
          </li>
        )}
        {publisher && (
          <li className="d-flex justify-content-between">
            Publisher
              <span>{publisher.name}</span>
          </li>
        )}
        <li className="d-flex justify-content-between">
          Sold <span>{sold}</span>
        </li>
        <li className="d-flex justify-content-between">
          Quantity <span>{quantity}</span>
        </li>
      </List>
    </>
  );
};

export default ProductListItem;
