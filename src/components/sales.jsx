import { useState } from "react";
import "../styles/sales.css";

function Sales() {
  const [product, setProduct] = useState("");
  const [customer, setCustomer] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [sales, setSales] = useState([]);

  // DYNAMIC TOTAL
  const total = Number(quantity) * Number(price || 0);

  // ADD SALE
  const handleSale = (e) => {
    e.preventDefault();

    if (
      !product.trim() ||
      !customer.trim() ||
      quantity === "" ||
      price === "" ||
      Number(quantity) <= 0 ||
      Number(price) < 0
    ) {
      alert("Please enter valid sales details!");
      return;
    }

    const newSale = {
      id: Date.now(),
      product: product.trim(),
      customer: customer.trim(),
      quantity: Number(quantity),
      price: Number(price),
      total,
      payment,
      date: new Date().toLocaleDateString(),
    };

    setSales((prev) => [newSale, ...prev]);

    setProduct("");
    setCustomer("");
    setQuantity(1);
    setPrice("");
    setPayment("Cash");
  };

  // DELETE SALE
  const deleteSale = (id) => {
    setSales((prev) => prev.filter((sale) => sale.id !== id));
  };

  // DYNAMIC STATISTICS
  const totalSales = sales.length;

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  const cashSales = sales
    .filter((sale) => sale.payment === "Cash")
    .reduce((sum, sale) => sum + sale.total, 0);

  const filteredSales = sales;

  return (
    <div className="sales-page">
      {/* HEADER */}
      <div className="sales-header">
        <div>
          <h1>Sales Management</h1>
          <p>Manage your sales, customers and revenue.</p>
        </div>

        <span className="sales-header-badge">Sales Overview</span>
      </div>

      {/* STATISTICS */}
      <div className="sales-stats">
        <div className="sales-stat-card">
          <div className="sales-stat-icon purple">🛍️</div>
          <div>
            <p>Total Sales</p>
            <h2>{totalSales}</h2>
          </div>
        </div>

        <div className="sales-stat-card">
          <div className="sales-stat-icon green">💰</div>
          <div>
            <p>Total Revenue</p>
            <h2>Rs. {totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        <div className="sales-stat-card">
          <div className="sales-stat-icon blue">📦</div>
          <div>
            <p>Items Sold</p>
            <h2>{totalItems}</h2>
          </div>
        </div>

        <div className="sales-stat-card">
          <div className="sales-stat-icon orange">💵</div>
          <div>
            <p>Cash Revenue</p>
            <h2>Rs. {cashSales.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* REVENUE CARD */}
      <div className="sales-revenue-card">
        <div>
          <p>Overall Sales Revenue</p>
          <h2>Rs. {totalRevenue.toLocaleString()}</h2>
          <small>Total amount from all recorded sales</small>
        </div>

        <div className="sales-revenue-icon">📈</div>
      </div>

      {/* ADD SALE FORM */}
      <div className="sales-form-card">
        <div className="sales-section-heading">
          <div>
            <h2>Create New Sale</h2>
            <p>Enter customer and product information.</p>
          </div>
        </div>

        <form onSubmit={handleSale}>
          <div className="sales-form-grid">
            <div className="sales-input-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            <div className="sales-input-group">
              <label>Customer Name</label>
              <input
                type="text"
                placeholder="Enter customer name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>

            <div className="sales-input-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="sales-input-group">
              <label>Unit Price (Rs.)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter unit price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="sales-input-group">
              <label>Payment Method</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>

          {/* TOTAL */}
          <div className="sales-total">
            <span>Sales Total</span>
            <h2>Rs. {total.toLocaleString()}</h2>
          </div>

          <button type="submit" className="sales-add-btn">
            + Complete Sale
          </button>
        </form>
      </div>

      {/* SALES HISTORY */}
      <div className="sales-history-card">
        <div className="sales-history-heading">
          <div>
            <h2>Recent Sales</h2>
            <p>View and manage your sales transactions.</p>
          </div>

          <span>{sales.length} Records</span>
        </div>

        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="sales-product-name">{sale.product}</td>

                    <td>{sale.customer}</td>

                    <td>{sale.quantity}</td>

                    <td>Rs. {sale.price.toLocaleString()}</td>

                    <td className="sales-price">
                      Rs. {sale.total.toLocaleString()}
                    </td>

                    <td>
                      <span className="sales-payment">{sale.payment}</span>
                    </td>

                    <td>{sale.date}</td>

                    <td>
                      <button
                        type="button"
                        className="sales-delete-btn"
                        onClick={() => deleteSale(sale.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="sales-empty">
                    <span>🛍️</span>
                    <p>No sales found</p>
                    <small>Your sales records will appear here.</small>
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

export default Sales;
