import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  const handleModal = () => {
    if(user && user.token){
      setIsModalOpen(true)
    } else {
      navigate("/login", {state:{from: location}})
    }
  }
  
  return (
    <>
      <div
        className="text-success"
        onClick={handleModal}
      >
        <StarOutlined />
        <br />
        {user ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          toast.success("Thanks for your review! 💜");
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
