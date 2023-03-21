import React from "react";
import { Input, FormGroup, Label, Row, Col } from "reactstrap";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const FileUpload = ({ values, setValues, setLoading, loading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image upload data: ", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((error) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR: ", error);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(
          (image) => image.public_id !== public_id
        );
        setValues({ ...values, images: filteredImages });
      })
      .catch((error) => {
        setLoading(false);
        console.log("IMAGE REMOVE ERR: ", error);
      });
  };

  return (
    <FormGroup>
      <Row>
        {values.images &&
          values.images.map((image) => (
            <Col xs="auto" className="mb-3" key={image.public_id}>
              <Badge
                count={<CloseCircleFilled />}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar size={60} shape="square" src={image.url} />
              </Badge>
            </Col>
          ))}
      </Row>
      {loading ? (
        <h5 className="text-danger">Loading...</h5>
      ) : (
        <Label for="images">Upload Image</Label>
      )}

      <Input
        id="images"
        name="file"
        type="file"
        onChange={fileUploadAndResize}
        multiple
        accept="images/*"
      />
    </FormGroup>
  );
};

export default FileUpload;
