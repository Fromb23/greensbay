import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - My Shop",
      "/cart": "Your Shopping Cart",
      "/wishlist": "Your Wishlist",
      "/checkout": "Checkout - My Shop",
    };

    document.title = pageTitles[location.pathname] || "My Shop";
  }, [location.pathname]);

  return null;
};

export default PageTitleUpdater;