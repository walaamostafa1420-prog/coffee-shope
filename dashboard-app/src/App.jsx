import { useEffect, useState } from "react";
import {
  Coffee, LayoutDashboard, Package, ShoppingCart,
  Users, ChartNoAxesCombined, Settings, Search,
  Bell, Menu, RefreshCw, CircleDollarSign,
  TrendingUp, CheckCircle, Clock, X
} from "lucide-react";

const API = "https://dummyjson.com/products/category/groceries";

const navItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Analytics", icon: ChartNoAxesCombined },
  { name: "Settings", icon: Settings },
];

const demoOrders = [
  { id: "#ORD-1001", customer: "Emma Wilson", product: "Arabic Coffee", amount: 20, status: "Completed" },
  { id: "#ORD-1002", customer: "James Brown", product: "Vanilla Coffee Shake", amount: 15, status: "Pending" },
  { id: "#ORD-1003", customer: "Olivia Davis", product: "Colombian Supremo", amount: 10.5, status: "Completed" },
  { id: "#ORD-1004", customer: "Noah Miller", product: "Arabic Coffee", amount: 20, status: "Cancelled" },
];

const demoCustomers = [
  { id: 1, name: "Emma Wilson", email: "emma@example.com", orders: 12 },
  { id: 2, name: "James Brown", email: "james@example.com", orders: 8 },
  { id: 3, name: "Olivia Davis", email: "olivia@example.com", orders: 15 },
  { id: 4, name: "Noah Miller", email: "noah@example.com", orders: 5 },
];

const money = (value) => `$${Number(value).toFixed(2)}`;

function App() {
  const [page, setPage] = useState("Overview");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data.products)) {
          throw new Error("Unexpected API response");
        }

        setProducts(
          data.products.slice(0,15).map((item, index) => ({
            id: item.id,
            name: [
              "Clove Coffee Cappuccino",
              "Turkish Coffee",
              "Hot Chocolate",
              "Coffee Cake",
              "Vanilla Coffee Shake",
              "Chocolate Mocha Frappe",
              "Mint Lemonade Coffee",
              "Chocolate Cake",
              "Iced caramal Latte",
              "Hot Chocolate Coffee",
              "Caramel cheesecake",
              "Cappuccino Coffee", 
              "Espresso Coffee",
              "Coffee Croissant",
              "Turkish COffee With Chocolate"
          
            ][index],

            price: [
              10,
              20,
              15,
              25,
              30,
              18,
              22,
              28,
              12,
              16,
              14,
              19,
              24,
              26,
              21
            ] [index],
            image:[
              "/images/WhatsApp Image 2026-10-26 at 6.09.03 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.09.23 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.12.59 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.13.00 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 4.47.05 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.13.01 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.13.03 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.13.04 PM.jpeg",
              "images/WhatsApp Image 2026-10-26 at 6.13.05 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.15.32 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.16.11 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.16.37 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.17.04 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 6.17.31 PM.jpeg",
              "/images/WhatsApp Image 2026-10-26 at 10.07.08 PM.jpeg",
            ] [index % 15],
            category: item.category,
            stock: item.stock,
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Couldn't load API products. Check your internet and try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, [refresh]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function renderProducts() {
    return (
      <>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="section-heading">Product Collection</h2>
            <p className="muted mb-0">Products fetched from a public API</p>
          </div>
          <button className="btn btn-coffee" onClick={() => setRefresh((n) => n + 1)}>
            <RefreshCw size={16} className="me-2" /> Refresh API
          </button>
        </div>

        <div className="search-box mb-4">
          <Search size={18} />
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {loading && <div className="alert alert-light">Loading products from API...</div>}
        {error && (
          <div className="alert alert-warning d-flex justify-content-between align-items-center">
            {error}
            <button className="btn btn-sm btn-outline-dark" onClick={() => setRefresh((n) => n + 1)}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
                <div className="card product-card h-100">
                  <img src={product.image} className="product-image" alt={product.name} />
                  <div className="card-body">
                    <span className="product-category">{product.category}</span>
                    <h5 className="mt-2">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <strong className="product-price">{money(product.price)}</strong>
                      <span className="stock-label">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-12"><p>No matching products found.</p></div>
            )}
          </div>
        )}
      </>
    );
  }

  function renderOrders() {
    return (
      <>
        <h2 className="section-heading mb-4">Recent Orders</h2>
        <div className="table-responsive content-card">
          <table className="table align-middle mb-0">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {demoOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td><td>{order.customer}</td><td>{order.product}</td>
                  <td>{money(order.amount)}</td>
                  <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted small p-3 mb-0">Demo data only — connect a real orders API to display actual orders.</p>
        </div>
      </>
    );
  }

  function renderCustomers() {
    return (
      <>
        <h2 className="section-heading mb-4">Customer Directory</h2>
        <div className="content-card table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>Customer</th><th>Email</th><th>Total Orders</th></tr></thead>
            <tbody>
              {demoCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td><span className="avatar me-2">{customer.name[0]}</span>{customer.name}</td>
                  <td>{customer.email}</td><td>{customer.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted small p-3 mb-0">Demo data only — no real customer records are connected.</p>
        </div>
      </>
    );
  }

  function renderAnalytics() {
    const bars = [42, 68, 52, 88, 61, 95, 73];
    return (
      <>
        <h2 className="section-heading mb-4">Sales Analytics</h2>
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="content-card p-4">
              <h5>Weekly performance</h5>
              <div className="bar-chart">
                {bars.map((height, index) => (
                  <div className="bar-column" key={index}>
                    <div className="bar" style={{ height: `${height}%` }} title={`${height}%`} />
                    <small>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</small>
                  </div>
                ))}
              </div>
              <p className="muted small mb-0 mt-3">Illustrative chart — not real sales figures.</p>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="content-card p-4">
              <h5>Business insights</h5>
              <div className="insight-row"><TrendingUp /><span>Track your daily sales trends</span></div>
              <div className="insight-row"><Package /><span>Monitor product availability</span></div>
              <div className="insight-row"><Users /><span>Understand customer activity</span></div>
              <p className="muted small mb-0 mt-3">Connect a sales API to calculate real metrics.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderSettings() {
    return (
      <>
        <h2 className="section-heading mb-4">Settings</h2>
        <div className="content-card p-4">
          <h5>Store information</h5>
          <p className="muted">Étoile Coffee — Dashboard preferences</p>
          <label className="form-label mt-3">Store name</label>
          <input className="form-control mb-3" defaultValue="Étoile Coffee" />
          <label className="form-label">Currency</label>
          <select className="form-select mb-3" defaultValue="USD">
            <option value="USD">USD — US Dollar</option>
            <option value="EGP">EGP — Egyptian Pound</option>
          </select>
          <button className="btn btn-coffee" onClick={() => window.alert("Settings are a frontend demo; no data has been saved.")}>Save preferences</button>
          <p className="muted small mt-3 mb-0">Settings are not saved to a server.</p>
        </div>
      </>
    );
  }

  function renderOverview() {
    return (
      <>
        <div className="welcome-banner mb-4">
          <div>
            <p className="eyebrow">YOUR COFFEE BUSINESS</p>
            <h2>Good day, Admin ☕</h2>
            <p className="mb-0">A little overview of your store activity.</p>
          </div>
          <Coffee size={60} strokeWidth={1.2} />
        </div>

        <div className="row g-3 mb-4">
          {[
            { label: "API Products", value: loading ? "..." : products.length, icon: Package },
            { label: "Demo Orders", value: "124", icon: ShoppingCart },
            { label: "Demo Customers", value: "86", icon: Users },
            { label: "Demo Revenue", value: "$2,840", icon: CircleDollarSign },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
                <div className="stat-card">
                  <div className="stat-top"><span>{stat.label}</span><Icon size={20} /></div>
                  <h3>{stat.value}</h3>
                  <span className="stat-foot"><TrendingUp size={14} /> Store snapshot</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row g-4">
          <div className="col-12 col-xl-7">
            <div className="content-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Latest Orders</h5>
                <button className="btn btn-sm btn-outline-coffee" onClick={() => setPage("Orders")}>View all</button>
              </div>
              {demoOrders.slice(0, 3).map((order) => (
                <div className="order-row" key={order.id}>
                  <div><strong>{order.id}</strong><p className="muted small mb-0">{order.customer}</p></div>
                  <div className="text-end"><strong>{money(order.amount)}</strong><div><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></div></div>
                </div>
              ))}
              <p className="muted small mt-3 mb-0">Example orders only, not live store orders.</p>
            </div>
          </div>
          <div className="col-12 col-xl-5">
            <div className="content-card p-4 h-100">
              <h5>API connection</h5>
              <div className={`api-status ${error ? "api-error" : loading ? "" : "api-ok"}`}>
                {loading ? <Clock size={19} /> : error ? <X size={19} /> : <CheckCircle size={19} />}
                <span>{loading ? "Loading API..." : error ? "API request failed" : "API connected"}</span>
              </div>
              <p className="muted small mt-3">Product data comes from DummyJSON, a public demo API. It is not your private coffee-shop inventory.</p>
              <button className="btn btn-coffee w-100 mt-2" onClick={() => setRefresh((n) => n + 1)}><RefreshCw size={16} className="me-2" /> Test API again</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderPage() {
    if (page === "Overview") return renderOverview();
    if (page === "Products") return renderProducts();
    if (page === "Orders") return renderOrders();
    if (page === "Customers") return renderCustomers();
    if (page === "Analytics") return renderAnalytics();
    return renderSettings();
  }

  return (
    <div className="dashboard-shell">
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Coffee size={24} /></div>
          <div><strong>Étoile Coffee</strong><small>ADMIN PANEL</small></div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <p className="nav-caption">WORKSPACE</p>
        <nav className="nav flex-column">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-link dashboard-link ${page === item.name ? "active" : ""}`}
                onClick={() => { setPage(item.name); setSidebarOpen(false); setSearch(""); }}
              >
                <Icon size={19} /><span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="avatar admin-avatar">A</div>
          <div><strong>Administrator</strong><small>Store manager</small></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="breadcrumb-text">Workspace <span>/</span> <strong>{page}</strong></div>
          <div className="topbar-actions">
            <span className="live-label"><span /> Live preview</span>
            <button className="notification-btn" aria-label="Notifications"><Bell size={19} /></button>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="page-content container-fluid">
          {renderPage()}
          <footer className="dashboard-footer">© 2026 Étoile Coffee · Crafted with care <Coffee size={14} /></footer>
        </div>
      </main>
    </div>
  );
}

export default App;