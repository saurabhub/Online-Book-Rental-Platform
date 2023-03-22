import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllSub } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllSub()
      .then((res) => {
          setSubs(res.data);
          setLoading(false)
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false)
      });
  }, []);

  return (
    <Container className="" fluid>
      <div className="my-5 display-4 text-black bg-secondary">
        <h4 className="text-center py-3">Sub Categories</h4>
      </div>
      <Row className="p-0 mt-4">

        <Container className="mb-4 d-flex justify-content-center flex-wrap gap-3">
        {subs.length &&
            subs.map((sub) => (
              <Button key={sub._id} color="primary" size="lg" outline>
                <Link to={`/sub/${sub.slug}`}>
                {sub.name}
                </Link>
              </Button>
            ))}
        </Container>
      </Row>
    </Container>
  );
};

export default SubList;
