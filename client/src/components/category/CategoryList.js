import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { getAllCategory } from "../../functions/category";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <Container className="" fluid>
      <div className="my-5 display-4 text-black bg-secondary">
        <h4 className="text-center py-3">Categories</h4>
      </div>
      <Row className="p-0 mt-4">
      <Container className="mb-4 d-flex justify-content-center flex-wrap gap-3">
          {categories.length &&
            categories.map((category) => (
              <Button key={category._id} color="primary" size="lg" outline>
                <Link to={`/category/${category.slug}`}>
                {category.name}
                </Link>
              </Button>
            ))}
        </Container>
      </Row>
    </Container>
  );
};

export default CategoryList;
