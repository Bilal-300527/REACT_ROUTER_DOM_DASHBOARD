import { useState } from "react";
import "../styles/stock.css";

function Stock() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Mouse",
      category: "Electronics",
      quantity: 25,
      price: 1200,
    },
    {
      id: 2,
      name: "Keyboard",
      category: "Accessories",
      quantity: 8,
      price: 2500,
    },
    {
      id: 3,
      name: "USB Cable",
      category: "Accessories",
      quantity: 0,
      price: 500,
    },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  // ADD PRODUCT
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !category.trim() ||
      quantity === "" ||
      price === "" ||
      Number(quantity) < 0 ||
      Number(price) < 0
    ) {
      alert("Please enter valid product details!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      quantity: Number(quantity),
      price: Number(price),
    };

    setProducts((prev) => [...prev, newProduct]);

    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // UPDATE STOCK
  const updateStock = (id, amount) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + amount),
            }
          : product,
      ),
    );
  };

  // SEARCH PRODUCT
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // DYNAMIC STATISTICS
  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const lowStock = products.filter(
    (product) => product.quantity > 0 && product.quantity <= 10,
  ).length;

  const outOfStock = products.filter(
    (product) => product.quantity === 0,
  ).length;

  const stockValue = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0,
  );

  return (
    <div className="stock-page">
      {/* HEADER */}
      <div className="stock-header">
        <div>
          <h1>Stock Management</h1>
          <p>Monitor products, inventory and stock levels.</p>
        </div>

        <span className="stock-header-badge">Inventory Overview</span>
      </div>

      {/* STATISTICS */}
      <div className="stock-stats">
        <div className="stock-stat-card">
          <div className="stock-stat-icon purple">📦</div>
          <div>
            <p>Total Products</p>
            <h2>{totalProducts}</h2>
          </div>
        </div>

        <div className="stock-stat-card">
          <div className="stock-stat-icon blue">🗃️</div>
          <div>
            <p>Total Quantity</p>
            <h2>{totalQuantity}</h2>
          </div>
        </div>

        <div className="stock-stat-card">
          <div className="stock-stat-icon orange">⚠️</div>
          <div>
            <p>Low Stock</p>
            <h2>{lowStock}</h2>
          </div>
        </div>

        <div className="stock-stat-card">
          <div className="stock-stat-icon red">❌</div>
          <div>
            <p>Out of Stock</p>
            <h2>{outOfStock}</h2>
          </div>
        </div>
      </div>

      {/* STOCK VALUE */}
      <div className="stock-value-card">
        <div>
          <p>Total Inventory Value</p>
          <h2>Rs. {stockValue.toLocaleString()}</h2>
          <small>Based on current quantity × unit price</small>
        </div>

        <div className="stock-value-icon">💰</div>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="stock-form-card">
        <div className="stock-section-heading">
          <div>
            <h2>Add New Product</h2>
            <p>Add a product to your inventory.</p>
          </div>
        </div>

        <form onSubmit={handleAddProduct}>
          <div className="stock-form-grid">
            <div className="stock-input-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="stock-input-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="stock-input-group">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="stock-input-group">
              <label>Unit Price (Rs.)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="stock-add-btn">
            + Add Product
          </button>
        </form>
      </div>

      {/* PRODUCT TABLE */}
      <div className="stock-table-card">
        <div className="stock-table-heading">
          <div>
            <h2>Inventory List</h2>
            <p>Manage your available products and quantities.</p>
          </div>

          <input
            type="search"
            className="stock-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="stock-table-wrapper">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Stock Value</th>
                <th>Status</th>
                <th>Manage</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="stock-product-name">{product.name}</td>

                    <td>{product.category}</td>

                    <td>{product.quantity}</td>

                    <td>Rs. {product.price.toLocaleString()}</td>

                    <td className="stock-value">
                      Rs. {(product.quantity * product.price).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`stock-status ${
                          product.quantity === 0
                            ? "out"
                            : product.quantity <= 10
                              ? "low"
                              : "available"
                        }`}
                      >
                        {product.quantity === 0
                          ? "Out of Stock"
                          : product.quantity <= 10
                            ? "Low Stock"
                            : "Available"}
                      </span>
                    </td>

                    <td>
                      <div className="stock-quantity-controls">
                        <button
                          type="button"
                          onClick={() => updateStock(product.id, -1)}
                          disabled={product.quantity === 0}
                        >
                          -
                        </button>

                        <span>{product.quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateStock(product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="stock-delete-btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="stock-empty">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stock;
