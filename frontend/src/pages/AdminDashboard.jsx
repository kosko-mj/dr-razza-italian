import { useState, useEffect } from 'react';
import './AdminDashboard.css';

// Date parser - handles multiple formats
const parseDate = (dateString) => {
  // Already formatted as "April 14, 2026"
  if (dateString.match(/[A-Za-z]+\s\d{1,2},\s\d{4}/)) {
    return new Date(dateString);
  }
  // Handle MM/DD/YYYY
  if (dateString.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }
  // Handle YYYY-MM-DD
  if (dateString.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
    return new Date(dateString);
  }
  // Fallback
  return new Date(dateString);
};

// Format date for display
const formatDateForDisplay = (dateString) => {
  const date = parseDate(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    venueName: '',
    venueAddress: '',
    menuItems: ['']
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  };

  const addMenuItem = () => {
    setFormData({ ...formData, menuItems: [...formData.menuItems, ''] });
  };

  const removeMenuItem = (index) => {
    const newItems = formData.menuItems.filter((_, i) => i !== index);
    setFormData({ ...formData, menuItems: newItems });
  };

  const updateMenuItem = (index, value) => {
    const newItems = [...formData.menuItems];
    newItems[index] = value;
    setFormData({ ...formData, menuItems: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const notes = formData.menuItems.filter(item => item.trim() !== '').join('\n');
    const displayDate = formatDateForDisplay(formData.date);
    
    const eventData = {
      date: displayDate,
      time: formData.time,
      venue: formData.venueName,
      address: formData.venueAddress,
      notes: notes
    };
    
    const method = editingEvent ? 'PUT' : 'POST';
    const url = editingEvent 
      ? `http://localhost:5000/api/events/${editingEvent.id}`
      : 'http://localhost:5000/api/events';
    
    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }).then(() => {
      fetchEvents();
      setShowForm(false);
      setEditingEvent(null);
      setFormData({ date: '', time: '', venueName: '', venueAddress: '', menuItems: [''] });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this event?')) {
      fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' })
        .then(() => fetchEvents());
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    const menuItems = event.notes ? event.notes.split('\n') : [''];
    setFormData({
      date: event.date,
      time: event.time,
      venueName: event.venue,
      venueAddress: event.address,
      menuItems: menuItems
    });
    setShowForm(true);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Event Manager</h1>
        <button onClick={() => { 
          setEditingEvent(null); 
          setFormData({ date: '', time: '', venueName: '', venueAddress: '', menuItems: [''] }); 
          setShowForm(true); 
        }} className="btn-add-event">
          + Add Event
        </button>
      </div>

      {showForm && (
        <div className="admin-form-modal">
          <div className="admin-form">
            <h2>{editingEvent ? 'Edit Event' : 'New Event'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  placeholder="April 15, 2026 or 04/15/2026"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Time</label>
                <input
                  type="text"
                  placeholder="6pm - 10pm"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Venue Name</label>
                <input
                  type="text"
                  placeholder="The Richardson"
                  value={formData.venueName}
                  onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Venue Address</label>
                <input
                  type="text"
                  placeholder="Greenpoint, Brooklyn"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({...formData, venueAddress: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Menu Items</label>
                {formData.menuItems.map((item, index) => (
                  <div key={index} className="menu-item-row">
                    <input
                      type="text"
                      placeholder={`Item ${index + 1}`}
                      value={item}
                      onChange={(e) => updateMenuItem(index, e.target.value)}
                    />
                    {formData.menuItems.length > 1 && (
                      <button type="button" onClick={() => removeMenuItem(index)} className="btn-remove">×</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addMenuItem} className="btn-add-item">+ Add Menu Item</button>
              </div>
              
              <div className="form-buttons">
                <button type="submit">Save Event</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingEvent(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Venue</th>
            <th>Address</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.date}</td>
              <td>{event.venue}</td>
              <td>{event.address}</td>
              <td>{event.time}</td>
              <td>
                <button onClick={() => handleEdit(event)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;