import './App.css';

function App() {
  const todayEvent = {
    date: "April 11, 2026",
    time: "6pm - 10pm",
    venue: "CASSETTE",
    address: "Ridgewood, Queens",
    notes1: "Hot Calabrese w/ Chili Peppers",
    notes2: "Meatball Parm",
    notes3: "Eggplant Parm"
  };

  const upcomingEvents = [
    {
      date: "April 15, 2026",
      time: "5pm - 9pm",
      venue: "A-Bar",
      address: "Greenpoint, Brooklyn",
      notes: "Sausage & Peppers special"
    },
    {
      date: "May 1, 2026",
      time: "6pm - 10pm",
      venue: "Pokito",
      address: "Williamsburg, Brooklyn",
      notes: "Full menu + new sandwich drop"
    }
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
            <p className="featured-datetime">{todayEvent.date} • {todayEvent.time}</p>
            <p className="featured-notes">
              {todayEvent.notes1}<br />
              {todayEvent.notes2}<br />
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
              <p className="event-datetime">{event.date} • {event.time}</p>
              <p className="event-notes">{event.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>DR RAZZA GOUL'S ITALIAN SPECIALTIES</p>
        <p>Follow us for event announcements</p>
        <p>NYC • Brooklyn • Queens • Manhattan</p>
      </footer>
    </div>
  );
}

export default App;