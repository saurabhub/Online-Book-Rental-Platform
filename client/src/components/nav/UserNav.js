import { AppstoreOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
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
  getItem(<Link to="/user/history">History</Link>, '/user/history', <AppstoreOutlined />),
  getItem(<Link to="/user/password">Password</Link>, '/user/password', <SettingOutlined />),
  getItem(<Link to="/user/wishlist">Wishlist</Link>, '/user/wishlist', <HeartOutlined />),
];

const UserNav = () => {
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
      mode="inline"
      theme='dark'
      // style={{
      //   width: 256,
      // }}
      onClick={onClick}
      selectedKeys={[current]}
      items={items}
      className="bg-dark bg-gradient"
    />
  );
};
export default UserNav;