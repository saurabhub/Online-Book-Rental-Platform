import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "./features/auth/authSlice";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import ProtectedUserRoute from "./components/routes/ProtectedUserRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSub from "./pages/admin/sub/CreateSub";
import UpdateSub from "./pages/admin/sub/UpdateSub";
import CreateProduct from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import CreateAuthor from "./pages/admin/author/CreateAuthor";
import UpdateAuthor from "./pages/admin/author/UpdateAuthor";
import CreatePublisher from "./pages/admin/publisher/CreatePublisher";
import UpdatePublisher from "./pages/admin/publisher/UpdatePublisher";
import Product from "./pages/Product";
import ScrollToTop from "./components/routes/ScrollToTop";
import CategoryHome from "./components/category/CategoryHome";
import SubHome from "./components/sub/SubHome";
import Shop from "./pages/Shop";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user)

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              loggedInUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch((err) => {
            console.log("currentUser err: ", err);
          });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<CategoryHome />} />
          <Route path="/sub/:slug" element={<SubHome />} />
          <Route path="/shop" element={<Shop />} />

          {/* User Routes  */}
          <Route
            path="/user/history"
            element={
              <ProtectedUserRoute>
                <History />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/user/password"
            element={
              <ProtectedUserRoute>
                <Password />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <ProtectedUserRoute>
                <Wishlist />
              </ProtectedUserRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <ProtectedAdminRoute>
                <CreateCategory />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/category/:slug"
            element={
              <ProtectedAdminRoute>
                <UpdateCategory />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/author"
            element={
              <ProtectedAdminRoute>
                <CreateAuthor />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/author/:slug"
            element={
              <ProtectedAdminRoute>
                <UpdateAuthor />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/publisher"
            element={
              <ProtectedAdminRoute>
                <CreatePublisher />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/publisher/:slug"
            element={
              <ProtectedAdminRoute>
                <UpdatePublisher />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/sub"
            element={
              <ProtectedAdminRoute>
                <CreateSub />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/sub/:slug"
            element={
              <ProtectedAdminRoute>
                <UpdateSub />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedAdminRoute>
                <CreateProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <AllProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/product/:slug"
            element={
              <ProtectedAdminRoute>
                <ProductUpdate />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
