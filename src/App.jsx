import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import CategoryResults from "./components/CategoryResults";
import ProductSection from "./components/ProductSection";
import ProductDetails from "./components/ProductDetails";
import OfferBanner from "./components/OfferBanner";
import Footer from "./components/Footer";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import SearchResults from "./components/SearchResults";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

import notebooks from "./data/notebooks";
import pens from "./data/pens";
import keychains from "./data/keychains";
import resinFrames from "./data/resinFrames";
import photoFrames from "./data/photoFrames";
import schoolOffice from "./data/schoolOffice";
import artCraft from "./data/artCraft";
import pencilBoxes from "./data/pencilBoxes";
import bottlesTiffins from "./data/bottlesTiffins";
import otherStationery from "./data/otherStationery";
import giftingItems from "./data/giftingItems";
import trendingProducts from "./data/trendingProducts";

/* =====================================================
   API
===================================================== */

const API_URL =
  "https://shankar-book-store-2.onrender.com/api/products";

const ORDERS_API_URL =
  "https://shankar-book-store-2.onrender.com/api/orders";

function App() {
  const [cart, setCart] = useState([]);

  const [dbProducts, setDbProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [
    selectedProductSection,
    setSelectedProductSection,
  ] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartToast, setCartToast] = useState(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [orderConfirmation, setOrderConfirmation] =
    useState(null);

  const [adminLogin, setAdminLogin] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(false);

  /* =====================================================
     LOAD PRODUCTS FROM BACKEND
  ===================================================== */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setDbProducts(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error("Product API error:", error);

        setDbProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =====================================================
     LOCAL PRODUCTS
  ===================================================== */

  const localProducts = useMemo(
    () => [
      ...notebooks,
      ...pens,
      ...schoolOffice,
      ...artCraft,
      ...pencilBoxes,
      ...bottlesTiffins,
      ...keychains,
      ...otherStationery,
      ...giftingItems,
      ...photoFrames,
      ...resinFrames,
      ...trendingProducts,
    ],
    []
  );

  const websiteProducts =
    dbProducts.length > 0
      ? dbProducts
      : localProducts;

  const allProducts = websiteProducts;

  /* =====================================================
     HELPERS
  ===================================================== */

  const getProductId = (product) =>
    product?._id || product?.id;

  const normalizeValue = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  /* =====================================================
     NOTEBOOK SUBJECT CHECK

     Hindi / English / Maths notebooks with same
     price/pages/type/size should become one product.
  ===================================================== */

  const isSubjectNotebook = (product) => {
    const category = normalizeValue(
      product?.category
    );

    const name = normalizeValue(
      product?.name
    );

    return (
      category === "notebooks" &&
      (
        name === "hindi notebook" ||
        name === "english notebook" ||
        name === "maths notebook"
      )
    );
  };

  /* =====================================================
     PRODUCT GROUP KEY
  ===================================================== */

  const getProductGroupKey = (product) => {
    const category = normalizeValue(
      product?.category
    );

    const type = normalizeValue(
      product?.type
    );

    const size = normalizeValue(
      product?.size
    );

    const price = Number(
      product?.price || 0
    );

    /*
      SPECIAL NOTEBOOK GROUP

      Example:

      Hindi Notebook ₹10
      English Notebook ₹10
      Maths Notebook ₹10

      becomes:

      Notebook ₹10
    */

    if (isSubjectNotebook(product)) {
      return [
        category,
        "subject-notebook",
        price,
        size,
        type,
        product?.pages || "",
      ].join("|");
    }

    /*
      GENERIC GROUP

      Same:
      category
      name
      price
      size
      type

      = one product card
    */

    const name = normalizeValue(
      product?.name
    );

    return [
      category,
      name,
      price,
      size,
      type,
    ].join("|");
  };

  /* =====================================================
     GROUP PRODUCTS
  ===================================================== */

  const groupProducts = (products) => {
    const groups = new Map();

    products.forEach((product) => {
      const key =
        getProductGroupKey(product);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key).push(product);
    });

    return Array.from(
      groups.values()
    ).map((variants) => {
      const mainProduct = variants[0];

      const subjectNotebookGroup =
        variants.length > 1 &&
        variants.every((variant) =>
          isSubjectNotebook(variant)
        );

      return {
        ...mainProduct,

        name: subjectNotebookGroup
          ? "Notebook"
          : mainProduct.name,

        variants,

        variantCount:
          variants.length,

        hasVariants:
          variants.length > 1,
      };
    });
  };

  /* =====================================================
     GROUPED PRODUCTS
  ===================================================== */

  const groupedProducts = useMemo(
    () => groupProducts(allProducts),
    [allProducts]
  );

  /* =====================================================
     CATEGORY PRODUCTS
  ===================================================== */

  const getCategoryProducts = (
    category
  ) => {
    const selectedCategoryName =
      normalizeValue(category);

    const filtered =
      websiteProducts.filter(
        (product) => {
          const productCategory =
            normalizeValue(
              product?.category
            );

          const productType =
            normalizeValue(
              product?.type
            );

          return (
            productCategory ===
              selectedCategoryName ||
            productType ===
              selectedCategoryName
          );
        }
      );

    return groupProducts(filtered);
  };

  /* =====================================================
     TRENDING PRODUCTS
  ===================================================== */

  const websiteTrendingProducts =
    dbProducts.length > 0
      ? dbProducts.filter(
          (product) => {
            const category =
              normalizeValue(
                product?.category
              );

            const type =
              normalizeValue(
                product?.type
              );

            const name =
              normalizeValue(
                product?.name
              );

            return (
              category.includes("trending") ||
              type.includes("trending") ||
              name.includes("trending")
            );
          }
        )
      : trendingProducts;

  const groupedTrendingProducts =
    groupProducts(
      websiteTrendingProducts
    );

  /* =====================================================
     GO HOME
  ===================================================== */

  const goHome = (
    addHistory = true
  ) => {
    if (addHistory) {
      window.history.pushState(
        { page: "home" },
        "",
        window.location.pathname
      );
    }

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    setOrderConfirmation(null);

    setAdminLogin(false);
    setIsAdminLoggedIn(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     BROWSER BACK / FORWARD
  ===================================================== */

  useEffect(() => {
    const handlePopState = (event) => {
      const state =
        event.state || {};

      const page =
        state.page;

      if (
        !page ||
        page === "home"
      ) {
        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSelectedProduct(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        setOrderConfirmation(null);

        setAdminLogin(false);
        setIsAdminLoggedIn(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "category"
      ) {
        setSelectedCategory(
          state.category
        );

        setSelectedProductSection(null);
        setSelectedProduct(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "search"
      ) {
        setSearchTerm(
          state.searchTerm || ""
        );

        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSelectedProduct(null);

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "product-section"
      ) {
        setSelectedProductSection(
          state.productSection
        );

        setSelectedCategory(null);
        setSelectedProduct(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "product-details"
      ) {
        setSelectedProduct(
          state.product
        );

        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "cart"
      ) {
        setSelectedProduct(null);
        setIsCartOpen(true);
        setIsCheckoutOpen(false);

        return;
      }

      if (
        page === "checkout"
      ) {
        setSelectedProduct(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "order-confirmation"
      ) {
        setSelectedProduct(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        return;
      }

      if (
        page === "admin-login"
      ) {
        setAdminLogin(true);
        setIsAdminLoggedIn(false);

        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSelectedProduct(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      if (
        page === "admin"
      ) {
        setIsAdminLoggedIn(true);
        setAdminLogin(false);

        setSelectedCategory(null);
        setSelectedProductSection(null);
        setSelectedProduct(null);
        setSearchTerm("");

        setIsCartOpen(false);
        setIsCheckoutOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /* =====================================================
     OPEN PRODUCT DETAILS
  ===================================================== */

  const openProductDetails = (
    product
  ) => {
    if (!product) {
      return;
    }

    setSelectedProduct(product);

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSearchTerm("");

    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      {
        page: "product-details",
        product,
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     BACK FROM PRODUCT DETAILS
  ===================================================== */

  const backFromProductDetails =
    () => {
      if (
        window.history.state
          ?.page ===
        "product-details"
      ) {
        window.history.back();
      } else {
        goHome(true);
      }
    };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = (
    product,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    const productId =
      getProductId(product);

    const requestedQuantity =
      Number(quantity) || 1;

    setCart(
      (currentCart) => {
        const existingProduct =
          currentCart.find(
            (item) =>
              getProductId(item) ===
              productId
          );

        if (existingProduct) {
          return currentCart.map(
            (item) =>
              getProductId(item) ===
              productId
                ? {
                    ...item,
                    quantity:
                      Number(
                        item.quantity || 0
                      ) +
                      requestedQuantity,
                  }
                : item
          );
        }

        return [
          ...currentCart,
          {
            ...product,
            quantity:
              requestedQuantity,
          },
        ];
      }
    );
  };

  /* =====================================================
     COMMON ADD TO CART HANDLER
     
     SAME FUNCTION IS USED BY:
     HOME
     TRENDING
     CATEGORY
     SEARCH
     PRODUCT DETAILS
  ===================================================== */

  const handleProductAddToCart = (
    product,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    addToCart(
      product,
      quantity
    );

    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    setCartToast({
      product,
      quantity,
    });
  };

  /* =====================================================
     CART TOAST
  ===================================================== */

  useEffect(() => {
    if (!cartToast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCartToast(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [cartToast]);

  const closeCartToast = () => {
    setCartToast(null);
  };

  const handleToastViewCart = () => {
    setCartToast(null);
    openCart();
  };

  const renderCartToast = () => {
    if (!cartToast) {
      return null;
    }

    return (
      <div className="cart-toast">
        <div className="cart-toast__icon">
          ✓
        </div>

        <div className="cart-toast__content">
          <strong>Added to Cart</strong>
          <span>
            {cartToast.product?.name || "Product"} × {cartToast.quantity || 1}
          </span>
        </div>

        <button
          type="button"
          className="cart-toast__button"
          onClick={handleToastViewCart}
        >
          View Cart →
        </button>

        <button
          type="button"
          className="cart-toast__close"
          onClick={closeCartToast}
          aria-label="Close cart notification"
        >
          ×
        </button>
      </div>
    );
  };

  /* =====================================================
     OPEN CATEGORY
  ===================================================== */

  const openCategory = (
    category
  ) => {
    const products =
      getCategoryProducts(
        category
      );

    const categoryData = {
      name: category,
      products,
    };

    setSelectedCategory(
      categoryData
    );

    setSelectedProductSection(null);
    setSelectedProduct(null);
    setSearchTerm("");

    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    window.history.pushState(
      {
        page: "category",
        category:
          categoryData,
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CLEAR CATEGORY
  ===================================================== */

  const clearCategory = () => {
    window.history.back();
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (
    value
  ) => {
    setSearchTerm(value);

    setSelectedCategory(null);
    setSelectedProductSection(null);
    setSelectedProduct(null);

    if (value.trim()) {
      window.history.replaceState(
        {
          page: "search",
          searchTerm:
            value,
        },
        "",
        window.location.pathname
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CLEAR SEARCH
  ===================================================== */

  const clearSearch = () => {
    window.history.back();
  };

  /* =====================================================
     TRENDING VIEW ALL
  ===================================================== */

  const openTrendingProducts =
    () => {
      const productSection = {
        title:
          "Trending Products",

        eyebrow:
          "WHAT'S POPULAR",

        products:
          groupedTrendingProducts,

        isTrending: true,
      };

      setSelectedProductSection(
        productSection
      );

      setSelectedCategory(null);
      setSelectedProduct(null);
      setSearchTerm("");

      setIsCartOpen(false);
      setIsCheckoutOpen(false);

      window.history.pushState(
        {
          page:
            "product-section",

          productSection,
        },
        "",
        window.location.pathname
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =====================================================
     CLEAR PRODUCT SECTION
  ===================================================== */

  const clearProductSection =
    () => {
      window.history.back();
    };

  /* =====================================================
     OPEN CART
  ===================================================== */

  const openCart = () => {
    setSelectedProduct(null);

    setIsCartOpen(true);
    setIsCheckoutOpen(false);

    window.history.pushState(
      {
        page: "cart",
      },
      "",
      window.location.pathname
    );
  };

  /* =====================================================
     CLOSE CART
  ===================================================== */

  const closeCart = () => {
    if (
      window.history.state
        ?.page === "cart"
    ) {
      window.history.back();
    } else {
      setIsCartOpen(false);
    }
  };

  /* =====================================================
     OPEN CHECKOUT
  ===================================================== */

  const openCheckout = () => {
    setSelectedProduct(null);

    setIsCartOpen(false);
    setIsCheckoutOpen(true);

    window.history.pushState(
      {
        page: "checkout",
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     BACK TO CART
  ===================================================== */

  const backToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);

    window.history.back();
  };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = async (
    customer
  ) => {
    const subtotal =
      cart.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(item.quantity || 0),
        0
      );

    const area = String(
      customer.area || ""
    )
      .toLowerCase()
      .trim();

    let deliveryCharge = 0;

    if (subtotal < 99) {
      if (area.includes("mahilong")) {
        deliveryCharge = 10;
      } else if (
        area.includes("tatisilwai")
      ) {
        deliveryCharge = 20;
      } else if (
        area.includes("namkum")
      ) {
        deliveryCharge = 30;
      }
    }

    const totalAmount =
      subtotal + deliveryCharge;

    const newOrderId =
      "SB" +
      Date.now().toString().slice(-6);

    /* =====================================================
       ORDER ITEMS
    ===================================================== */

    const orderItems = cart.map(
      (item) => ({
        productId: String(
          item._id || item.id || ""
        ),
        name: item.name || "",
        image: item.image || "",
        price: Number(item.price || 0),
        quantity: Number(
          item.quantity || 0
        ),
      })
    );

    /* =====================================================
       SAVE ORDER TO MONGODB
    ===================================================== */

    try {
      console.log(
        "Sending order to:",
        ORDERS_API_URL
      );

      const response = await fetch(
        ORDERS_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            customer: {
              name: customer.name,
              mobile: customer.phone,
              address: customer.address,
              area: customer.area,
            },

            items: orderItems,

            subtotal,
            deliveryCharge,
            total: totalAmount,

            paymentMethod: "COD",
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Order API response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order"
        );
      }

      console.log(
        "Order saved successfully:",
        data.order
      );
    } catch (error) {
      console.error(
        "Order save error:",
        error
      );

      alert(
        "Order save nahi ho paya. Please try again."
      );

      return;
    }

    /* =====================================================
       WHATSAPP ORDER MESSAGE
    ===================================================== */

    const orderItemsMessage =
      cart
        .map(
          (item) =>
            `• ${item.name} x ${item.quantity} = ₹${
              Number(item.price || 0) *
              Number(item.quantity || 0)
            }`
        )
        .join("\n");

    const message = `
🛍️ *NEW ORDER - SHANKAR BOOK STORE*

📋 *Order ID:* #${newOrderId}

👤 *CUSTOMER DETAILS*

Name: ${customer.name}
Mobile: ${customer.phone}

📍 *DELIVERY DETAILS*

Area: ${customer.area}
Address: ${customer.address}

🛒 *ORDER ITEMS*

${orderItemsMessage}

💰 *SUBTOTAL:* ₹${subtotal}

🚚 *DELIVERY CHARGE:* ${
      deliveryCharge === 0
        ? "FREE"
        : `₹${deliveryCharge}`
    }

💰 *TOTAL AMOUNT:* ₹${totalAmount}

💵 Payment: Cash on Delivery

Thank you!
`;

    const whatsappURL =
      `https://wa.me/916239901052?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappURL,
      "_blank"
    );

    /* =====================================================
       ORDER CONFIRMATION
    ===================================================== */

    setOrderConfirmation({
      customer,
      cart,
      subtotal,
      deliveryCharge,
      totalAmount,
      orderId: newOrderId,
    });

    setCart([]);

    setIsCheckoutOpen(false);

    setSelectedProduct(null);

    window.history.pushState(
      {
        page:
          "order-confirmation",
      },
      "",
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     CONTINUE SHOPPING
  ===================================================== */

  const continueShopping =
    () => {
      goHome(true);
    };

  /* =====================================================
     ADMIN LOGIN
  ===================================================== */

  const openAdminLogin =
    () => {
      setAdminLogin(true);
      setIsAdminLoggedIn(false);

      setSelectedCategory(null);
      setSelectedProductSection(null);
      setSelectedProduct(null);
      setSearchTerm("");

      setIsCartOpen(false);
      setIsCheckoutOpen(false);

      window.history.pushState(
        {
          page:
            "admin-login",
        },
        "",
        window.location.pathname
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =====================================================
     ADMIN LOGIN SUCCESS
  ===================================================== */

  const handleAdminLogin =
    () => {
      setIsAdminLoggedIn(true);
      setAdminLogin(false);

      window.history.pushState(
        {
          page: "admin",
        },
        "",
        window.location.pathname
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =====================================================
     ADMIN LOGOUT
  ===================================================== */

  const handleAdminLogout =
    () => {
      setIsAdminLoggedIn(false);
      setAdminLogin(false);

      setSelectedCategory(null);
      setSelectedProductSection(null);
      setSelectedProduct(null);
      setSearchTerm("");

      setIsCartOpen(false);
      setIsCheckoutOpen(false);

      window.history.pushState(
        {
          page: "home",
        },
        "",
        window.location.pathname
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =====================================================
     ADMIN
  ===================================================== */

  if (isAdminLoggedIn) {
    return (
      <Admin
        onLogout={
          handleAdminLogout
        }
      />
    );
  }

  /* =====================================================
     ADMIN LOGIN
  ===================================================== */

  if (adminLogin) {
    return (
      <AdminLogin
        onLogin={
          handleAdminLogin
        }
      />
    );
  }

  /* =====================================================
     ORDER CONFIRMATION
  ===================================================== */

  if (orderConfirmation) {
    return (
      <OrderConfirmation
        customer={
          orderConfirmation.customer
        }
        cart={
          orderConfirmation.cart
        }
        totalAmount={
          orderConfirmation.totalAmount
        }
        orderId={
          orderConfirmation.orderId
        }
        onContinueShopping={
          continueShopping
        }
      />
    );
  }

  /* =====================================================
     PRODUCT DETAILS
  ===================================================== */

  if (selectedProduct) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={
            openCart
          }
          onSearch={
            handleSearch
          }
          searchTerm={
            searchTerm
          }
          onHomeClick={() =>
            goHome(true)
          }
        />

        <ProductDetails
          product={
            selectedProduct
          }
          onAddToCart={
            handleProductAddToCart
          }
          onBack={
            backFromProductDetails
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={
            closeCart
          }
          onCheckout={
            openCheckout
          }
        />

        {renderCartToast()}
      </div>
    );
  }

  /* =====================================================
     CHECKOUT
  ===================================================== */

  if (isCheckoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBackToCart={
          backToCart
        }
        onPlaceOrder={
          handlePlaceOrder
        }
      />
    );
  }

  /* =====================================================
     SEARCH RESULTS
  ===================================================== */

  if (searchTerm.trim()) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={
            openCart
          }
          onSearch={
            handleSearch
          }
          searchTerm={
            searchTerm
          }
          onHomeClick={() =>
            goHome(true)
          }
        />

        <SearchResults
          searchTerm={
            searchTerm
          }
          onProductClick={
            openProductDetails
          }
          onClearSearch={
            clearSearch
          }
          onAddToCart={
            handleProductAddToCart
          }
          products={
            groupProducts(
              allProducts
            )
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={
            closeCart
          }
          onCheckout={
            openCheckout
          }
        />

        {renderCartToast()}
      </div>
    );
  }

  /* =====================================================
     CATEGORY RESULTS
  ===================================================== */

  if (selectedCategory) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={
            openCart
          }
          onSearch={
            handleSearch
          }
          searchTerm={
            searchTerm
          }
          onHomeClick={() =>
            goHome(true)
          }
        />

        <CategoryResults
          category={
            selectedCategory.name
          }
          products={
            selectedCategory.products
          }
          onProductClick={
            openProductDetails
          }
          onClearCategory={
            clearCategory
          }
          onAddToCart={
            handleProductAddToCart
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={
            closeCart
          }
          onCheckout={
            openCheckout
          }
        />

        {renderCartToast()}
      </div>
    );
  }

  /* =====================================================
     PRODUCT SECTION / VIEW ALL
  ===================================================== */

  if (
    selectedProductSection
  ) {
    return (
      <div>
        <Navbar
          cart={cart}
          onCartClick={
            openCart
          }
          onSearch={
            handleSearch
          }
          searchTerm={
            searchTerm
          }
          onHomeClick={() =>
            goHome(true)
          }
        />

        <CategoryResults
          category={
            selectedProductSection.title
          }
          products={
            selectedProductSection.products
          }
          onProductClick={
            openProductDetails
          }
          onClearCategory={
            clearProductSection
          }
          onAddToCart={
            handleProductAddToCart
          }
        />

        <Cart
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={
            closeCart
          }
          onCheckout={
            openCheckout
          }
        />

        {renderCartToast()}
      </div>
    );
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={
          openCart
        }
        onSearch={
          handleSearch
        }
        searchTerm={
          searchTerm
        }
        onHomeClick={() =>
          goHome(true)
        }
      />

      <Hero />

      <CategorySection
        onCategoryClick={
          openCategory
        }
      />

      {productsLoading ? (
        <div
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading products...
        </div>
      ) : (
        <>
          {/* ================= TRENDING ================= */}

          <ProductSection
            title="Trending Products"
            eyebrow="WHAT'S POPULAR"
            products={
              groupedTrendingProducts
            }
            onProductClick={
              openProductDetails
            }
            onAddToCart={
              handleProductAddToCart
            }
            onViewAll={
              openTrendingProducts
            }
          />

          {/* ================= FRAMES ================= */}

          <ProductSection
            title="Frames"
            eyebrow="SPECIAL MOMENTS"
            products={groupProducts(
              websiteProducts.filter(
                (product) => {
                  const category =
                    normalizeValue(
                      product?.category
                    );

                  return (
                    category ===
                      "photo frames" ||
                    category ===
                      "resin frames"
                  );
                }
              )
            )}
            onProductClick={
              openProductDetails
            }
            onAddToCart={
              handleProductAddToCart
            }
          />

          {/* ================= KEYCHAINS ================= */}

          <ProductSection
            title="Keychains"
            eyebrow="SMALL & STYLISH"
            products={groupProducts(
              websiteProducts.filter(
                (product) =>
                  normalizeValue(
                    product?.category
                  ) ===
                  "keychains"
              )
            )}
            onProductClick={
              openProductDetails
            }
            onAddToCart={
              handleProductAddToCart
            }
          />

          {/* ================= DAILY ESSENTIALS ================= */}

          <ProductSection
            title="Daily Essentials"
            eyebrow="EVERYDAY ESSENTIALS"
            products={groupProducts(
              websiteProducts.filter(
                (product) => {
                  const category =
                    normalizeValue(
                      product?.category
                    );

                  return (
                    category ===
                      "bottles & tiffins" ||
                    category.includes(
                      "bottle"
                    ) ||
                    category ===
                      "school & office" ||
                    category ===
                      "other stationery"
                  );
                }
              )
            )}
            onProductClick={
              openProductDetails
            }
            onAddToCart={
              handleProductAddToCart
            }
          />
        </>
      )}

      <OfferBanner />

      <Footer
        onAdminLogin={
          openAdminLogin
        }
      />

      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        onClose={
          closeCart
        }
        onCheckout={
          openCheckout
        }
      />

        {renderCartToast()}
    </div>
  );
}

export default App;