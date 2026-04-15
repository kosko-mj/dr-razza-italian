import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Inquiries from './Inquiries';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
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
    const displayDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : '';
    
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
      setSelectedDate(null);
      setFormData({ time: '', venueName: '', venueAddress: '', menuItems: [''] });
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
    setSelectedDate(new Date(event.date));
    setFormData({
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
        <h1>Admin Dashboard</h1>
      </div>
      
      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="tab-content">
          <div className="events-header">
            <button onClick={() => { 
              setEditingEvent(null); 
              setSelectedDate(null);
              setFormData({ time: '', venueName: '', venueAddress: '', menuItems: [''] }); 
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
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select a date"
                      className="date-picker-input"
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
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="tab-content">
          <Inquiries />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;