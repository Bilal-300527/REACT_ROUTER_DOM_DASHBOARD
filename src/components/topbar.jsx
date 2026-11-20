import "../styles/topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back! Here's your overview.</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <span>⌕</span>
          <input type="text" placeholder="Search anything..." />
        </div>

        <button className="notification-btn">
          ♧<span className="notification-dot"></span>
        </button>

        <div className="topbar-profile">
          <div className="profile-avatar">MB</div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
