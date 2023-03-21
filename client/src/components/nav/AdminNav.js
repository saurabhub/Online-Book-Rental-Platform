import { AppstoreOutlined, EditOutlined, EyeOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to="/admin/dashboard">Dashboard</Link>, '/admin/dashboard', <AppstoreOutlined />),
  getItem(<Link to="/admin/products">Show Products</Link>, '/admin/products', <EyeOutlined />),
  getItem(<Link to="/admin/product">Create Product</Link>, '/admin/product', <EditOutlined />),
  getItem(<Link to="/admin/publisher">Create Publisher</Link>, '/admin/publisher', <EditOutlined />),
  getItem(<Link to="/admin/author">Create Author</Link>, '/admin/author', <EditOutlined />),
  getItem(<Link to="/admin/category">Create Category</Link>, '/admin/category', <EditOutlined />),
  getItem(<Link to="/admin/sub">Create Sub-Category</Link>, '/admin/sub', <EditOutlined />),
  getItem(<Link to="/admin/coupon">Coupons</Link>, '/admin/coupon', <HeartOutlined />),
  getItem(<Link to="/admin/password">Password</Link>, '/admin/password', <SettingOutlined />),
];

const AdminNav = () => {
    let location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

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
      theme='dark'
      mode="inline"
      onClick={onClick}
      selectedKeys={[current]}
      items={items}
      className="bg-dark bg-gradient"
    />
  );
};
export default AdminNav;