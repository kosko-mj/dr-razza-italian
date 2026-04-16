import { useState } from 'react';
import './AdminLayout.css';

function AdminLayout({ children, activeTab, setActiveTab, onLogout }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-placeholder">
            <span>🍝</span>
          </div>
          <div className="welcome-text">
            <h2>Amunì, Jason</h2>
            <p>Dr. Razza Goul's</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <i className="ri-calendar-line"></i>
            <span>Events</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <i className="ri-mail-line"></i>
            <span>Inquiries</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="ri-bar-chart-line"></i>
            <span>Analytics</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={onLogout}>
            <i className="ri-logout-box-line"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-main-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;