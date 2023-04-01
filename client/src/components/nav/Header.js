import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../features/auth/authSlice";
import Search from "../forms/Search";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const [current, setCurrent] = useState(location.pathname);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "/shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: (
        <Link to="/cart">
          <Badge
            size="small"
            count={cart.length}
            offset={[5, -2]}
            className="text-white"
          >
            Cart
          </Badge>
        </Link>
      ),
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      className: "me-auto",
    },
    {
      label: <Search />,
      key: "/search/filters",
      className: "d-flex",
    },
    user && {
      // label: user.email && (user.email.split('@')[0]),
      label: user && user.name,
      key: `/dashboard`,
      icon: <SettingOutlined />,
      children: [
        {
          label:
            user && user.role === "admin" ? (
              <Link to="/admin/dashboard">Dashboard</Link>
            ) : (
              <Link to="/user/history">Dashboard</Link>
            ),
          key:
            user && user.role === "admin"
              ? "/admin/dashboard"
              : "/user/history",
        },
        {
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: function () {
            signOut(auth)
              .then(() => {
                dispatch(logout(null));
                navigate("/login");
                toast.success("Logout successful");
              })
              .catch((error) => {
                toast.error(error.message);
              });
          },
        },
      ],
    },
    !user && {
      label: <Link to="/login">Login</Link>,
      key: "/login",
      icon: <UserOutlined />,
    },
    !user && {
      label: <Link to="/register">Register</Link>,
      key: "/register",
      icon: <UserAddOutlined />,
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="bg-dark bg-gradient d-flex align-items-center"
      // onKeyDown={(e)=>{e.preventDefault()}}
      // tabIndex="0"
    />
  );
};

export default Header;
