import "./App.css";
import Footer from "./Components/Footer";

function App() {
  const todayEvent = {
    date: "April 11, 2026",
    time: "6pm - 10pm",
    venue: "CASSETTE",
    address: "Ridgewood, Queens",
    notes1: "Hot Calabrese w/ Chili Peppers",
    notes2: "Meatball Parm",
    notes3: "Eggplant Parm",
  };

  const upcomingEvents = [
    {
      date: "April 15, 2026",
      time: "5pm - 9pm",
      venue: "A-Bar",
      address: "Greenpoint, Brooklyn",
      notes: "Sausage & Peppers special",
    },
    {
      date: "May 1, 2026",
      time: "6pm - 10pm",
      venue: "Pokito",
      address: "Williamsburg, Brooklyn",
      notes: "Full menu + new sandwich drop",
    },
  ];

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
            <p className="featured-datetime">
              {todayEvent.date} • {todayEvent.time}
            </p>
            <p className="featured-notes">
              {todayEvent.notes1}
              <br />
              {todayEvent.notes2}
              <br />
              {todayEvent.notes3}
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
              <p className="event-datetime">
                {event.date} • {event.time}
              </p>
              <p className="event-notes">{event.notes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="section-divider"></div>
        <div className="gallery-grid">
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/106/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/127/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/158/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/245/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/286/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/395/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/455/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/569/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/611/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/666/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/718/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/825/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/856/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/977/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/104/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/169/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/29/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/30/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/37/400/400" alt="Italian food" className="gallery-image" />
          </a>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="gallery-item">
            <img src="https://picsum.photos/id/48/400/400" alt="Italian food" className="gallery-image" />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">DR RAZZA GOUL'S ITALIAN SPECIALTIES</div>
        <div className="footer-location">NYC</div>
        <div className="footer-follow">
          <span>Follow for event announcements</span>
          <a href="https://www.instagram.com/dr_razza_goul/" target="_blank" rel="noopener noreferrer" className="instagram-link">
            <i className="ri-instagram-line"></i>
          </a>
        </div>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
