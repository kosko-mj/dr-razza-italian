import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InquiryForm from './Components/InquiryForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function PublicSite() {
  const [todayEvent, setTodayEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const todayFormatted = today.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const todaysEvent = data.find(event => event.date === todayFormatted);
        const upcoming = data
          .filter(event => event.date !== todayFormatted)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setTodayEvent(todaysEvent || null);
        setUpcomingEvents(upcoming);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="hero">
          <h1>DR RAZZA GOUL'S</h1>
          <p>Italian Specialties</p>
          <div className="hero-divider"></div>
        </header>
        <div style={{ textAlign: 'center', padding: '100px' }}>Loading events...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="hero">
        <h1>DR RAZZA GOUL'S</h1>
        <p>Italian Specialties</p>
        <div className="hero-divider"></div>
      </header>

      {todayEvent && (
        <section className="featured-section">
          <div className="featured-card">
            <h2 className="featured-venue">{todayEvent.venue}</h2>
            <p className="featured-address">{todayEvent.address}</p>
            <p className="featured-datetime">{todayEvent.date} • {todayEvent.time}</p>
            <p className="featured-notes">
              {todayEvent.notes?.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < todayEvent.notes.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>
      )}

      <section className="upcoming-section">
        <h2>Upcoming</h2>
        <div className="section-divider"></div>
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.venue}</h3>
              <p className="event-location">{event.address}</p>
              <p className="event-datetime">{event.date} • {event.time}</p>
              <p className="event-notes">{event.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="section-divider"></div>
        <div className="gallery-grid">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i => (
            <a key={i} href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
              <img src={`https://picsum.photos/id/${100 + i}/400/400`} alt="Italian food" className="gallery-image" />
            </a>
          ))}
        </div>
      </section>

      <InquiryForm />

      <footer className="footer">
        <div className="footer-brand">DR RAZZA GOUL'S ITALIAN SPECIALTIES</div>
        <div className="footer-location">NYC</div>
        <div className="footer-follow">
          <span>Follow for event announcements</span>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="instagram-link">
            <i className="ri-instagram-line"></i>
          </a>
        </div>
        <div className="kosko-footer">
          <a href="https://github.com/kosko-mj" target="_blank" rel="noopener noreferrer">
            <i className="ri-github-fill"></i> KOSKO
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={
          isLoggedIn ? 
            <AdminDashboard /> : 
            <AdminLogin onLogin={setIsLoggedIn} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;