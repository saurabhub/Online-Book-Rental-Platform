import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Spinner,
  Button,
  ListGroup,
  ListGroupItem,
  Table,
} from "reactstrap";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import {
  createCoupon,
  getAllCoupon,
  removeCoupon,
} from "../../../functions/coupon";
import { toast } from "react-toastify";
import LocalSearch from "../../../components/forms/LocalSearch";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(`${new Date()}`);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getAllCoupon()
      .then((res) => {
        setCoupons(res.data);
        // console.log(coupons);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} coupon created`);
        loadCoupons();
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Create coupon error: ", error);
      });
  };

  const searchResult = (keyword) => (coupon) =>
    coupon.name.toLowerCase().includes(keyword);

  const handleRemove = (couponId) => {
    if (window.confirm("Delete Coupon?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadCoupons();
          setLoading(false);
          toast.error(`Coupon ${res.data.name} deleted.`);
        })
        .catch((error) => {
          console.log("Coupon Delete error", error);
        });
    }
  };

  const showForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name" className="text-dark">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. BOOKNERD300"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
      </FormGroup>{" "}
      <FormGroup>
        <Label for="discount" className="text-dark">
          Discount
        </Label>
        <Input
          id="discount"
          name="discount"
          placeholder="give a number"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
      </FormGroup>{" "}
      <FormGroup>
        <Label for="" className="text-dark">
          Expiry Date:
        </Label>
        <br />
        <DatePicker
          value={expiry}
          selected={new Date()}
          onChange={(date) => setExpiry(date)}
          required
        />
      </FormGroup>{" "}
      {loading ? (
        <Button color="danger" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      ) : (
        <Button
          type="submit"
          color="success"
          disabled={name.length < 6 || name.length > 12 || discount > 100}
        >
          Create Coupon
        </Button>
      )}
    </Form>
  );

  const showCouponList = () => (
    <>
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <Table size="sm" responsive hover className="my-3">
        <thead>
          <tr className="table-secondary">
            <th>Name</th>
            <th>Expiry</th>
            <th>Discount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {coupons &&
            coupons.filter(searchResult(keyword)).map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.name}</td>
                <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                <td>{coupon.discount}</td>
                <td>
                  <DeleteOutlined
                    onClick={() => handleRemove(coupon._id)}
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0 py-3 mx-auto" xs="6">
          <Container className="m-0 p-0" fluid>
            <Col className="bg-light border p-3 mb-4" xs="12">
              <h4 className="mb-3">Create Coupons</h4>
              {showForm()}
            </Col>
            <h4>Coupons List</h4>
            {showCouponList()}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CreateCoupon;
