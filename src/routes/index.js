import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivacyPolicy from "../pages/PrivacyPolicyPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductItemPage from "../pages/ProductItemPage";
import EachProductViewPage from "../pages/EachProductViewPage";
import OrderDeliveredPage from "../pages/OrderDeliveredPage";
import Logout from "../components/Registration/Logout/index";
import { TokenValidator } from "../utils/jwtTokenChecker";
import Profile from "../components/Profile/Profile";
import OrderDetails from "../pages/OrderDetails";

import ProtectRoute from "../utils/ProtectRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<TokenValidator />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} exact />
        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile />} />

          <Route path="/order" element={<OrderDetails />} />
          <Route path="/product" element={<ProductDetailsPage />}>
            <Route path="/product/:brand" element={<ProductItemPage />}>
              <Route
                path="/product/:brand/:model"
                element={<EachProductViewPage />}
              />
            </Route>
          </Route>

          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/orderdelivered" element={<OrderDeliveredPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Route>
  )
);
