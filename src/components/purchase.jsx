import { useState } from "react";
import "../styles/purchase.css";

function Purchase() {
  const [product, setProduct] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [purchases, setPurchases] = useState([]);

  const total = Number(quantity) * Number(price || 0);

  const handlePurchase = (e) => {
    e.preventDefault();

    if (!product || !supplier || !price || quantity <= 0) {
      alert("Please fill all fields!");
      return;
    }

    const newPurchase = {
      id: Date.now(),
      product,
      supplier,
      quantity: Number(quantity),
      price: Number(price),
      total,
      date: new Date().toLocaleDateString(),
    };

    setPurchases((prev) => [newPurchase, ...prev]);

    setProduct("");
    setSupplier("");
    setQuantity(1);
    setPrice("");
  };

  const deletePurchase = (id) => {
    setPurchases((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce((sum, item) => sum + item.total, 0);

  const totalProducts = purchases.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="purchase-page">
      {/* PAGE HEADER */}
      <div className="purchase-header">
        <div>
          <h1>Purchase Management</h1>
          <p>Manage your purchases and supplier transactions.</p>
        </div>

        <button className="purchase-export">↓ Export Report</button>
      </div>

      {/* STATISTICS */}
      <div className="purchase-stats">
        <div className="purchase-stat-card">
          <div className="stat-icon purple">🛒</div>
          <div>
            <p>Total Purchases</p>
            <h2>{totalPurchases}</h2>
          </div>
        </div>

        <div className="purchase-stat-card">
          <div className="stat-icon green">💰</div>
          <div>
            <p>Total Amount</p>
            <h2>Rs. {totalAmount.toLocaleString()}</h2>
          </div>
        </div>

        <div className="purchase-stat-card">
          <div className="stat-icon orange">📦</div>
          <div>
            <p>Total Products</p>
            <h2>{totalProducts}</h2>
          </div>
        </div>
      </div>

      {/* PURCHASE FORM */}
      <div className="purchase-form-card">
        <div className="purchase-section-title">
          <div>
            <h2>Add New Purchase</h2>
            <p>Enter the purchase and supplier information.</p>
          </div>
        </div>

        <form onSubmit={handlePurchase}>
          <div className="purchase-form-grid">
            <div className="purchase-input-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            <div className="purchase-input-group">
              <label>Supplier Name</label>
              <input
                type="text"
                placeholder="Enter supplier name"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>

            <div className="purchase-input-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="purchase-input-group">
              <label>Unit Price (Rs.)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter unit price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="purchase-total">
            <span>Purchase Total</span>
            <h2>Rs. {total.toLocaleString()}</h2>
          </div>

          <button type="submit" className="add-purchase-btn">
            + Add Purchase
          </button>
        </form>
      </div>

      {/* PURCHASE HISTORY */}
      <div className="purchase-history">
        <div className="purchase-history-header">
          <div>
            <h2>Recent Purchases</h2>
            <p>View and manage your purchase records.</p>
          </div>

          <span>{purchases.length} Records</span>
        </div>

        <div className="purchase-table-wrapper">
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {purchases.length > 0 ? (
                purchases.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product}</td>
                    <td>{item.supplier}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.price.toLocaleString()}</td>
                    <td className="purchase-price">
                      Rs. {item.total.toLocaleString()}
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className="delete-purchase"
                        onClick={() => deletePurchase(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-purchase">
                    <span>📦</span>
                    <p>No purchases found</p>
                    <small>Your purchase records will appear here.</small>
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

export default Purchase;
