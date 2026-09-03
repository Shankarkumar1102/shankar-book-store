import { useState } from "react";

import AdminProductsList from "../components/AdminProducts";

import products from "../data/products";
import notebooks from "../data/notebooks";
import pens from "../data/pens";
import resinFrames from "../data/resinFrames";
import photoFrames from "../data/photoFrames";
import keychains from "../data/keychains";

function AdminProducts() {
  // ==================================================
  // ALL PRODUCTS
  // ==================================================

  const initialProducts = [
    ...products,
    ...notebooks,
    ...pens,
    ...resinFrames,
    ...photoFrames,
    ...keychains,
  ];

  // ==================================================
  // PRODUCT LIST
  // ==================================================

  const [productList, setProductList] =
    useState(initialProducts);

  // ==================================================
  // ADD PRODUCT
  // ==================================================

  const handleAddProduct = () => {
    console.log("Add Product clicked");
  };

  // ==================================================
  // EDIT PRODUCT
  // ==================================================

  const handleEditProduct = (product) => {
    console.log("Edit product:", product);
  };

  // ==================================================
  // DELETE PRODUCT
  // ==================================================

  const handleDeleteProduct = (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmed) return;

    setProductList((currentProducts) =>
      currentProducts.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.category === product.category
          )
      )
    );
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <AdminProductsList
      products={productList}
      onAddProduct={handleAddProduct}
      onEdit={handleEditProduct}
      onDelete={handleDeleteProduct}
    />
  );
}

export default AdminProducts;