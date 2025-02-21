import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - My Shop",
      "/cart": "Your Shopping Cart",
      "/product/id": "Product Details",
      "/wishlist": "Your Wishlist",
      "/checkout/summary": "Checkout - Summary",
      "/auth/login": "Login to your account",
    };

    document.title = pageTitles[location.pathname] || "My Shop";
  }, [location.pathname]);

  return null;
};

export default PageTitleUpdater;