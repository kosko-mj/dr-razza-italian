import { useState } from 'react';

function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    venue: '',
    preferred_date: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', venue: '', preferred_date: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="inquiry-section">
      <h2>Book Us</h2>
      <div className="section-divider"></div>
      <p className="inquiry-intro">
        Want Dr. Razza Goul's at your bar, brewery, or event?<br />
        Fill out the form and we'll be in touch within 24 hours.
      </p>
      
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <input
            type="text"
            name="venue"
            placeholder="Bar / Venue name"
            value={formData.venue}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="preferred_date"
            placeholder="Preferred date (e.g., June 2026)"
            value={formData.preferred_date}
            onChange={handleChange}
          />
        </div>
        
        <textarea
          name="message"
          placeholder="Tell us about your event (guest count, budget, special requests...)"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        
        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Inquiry →'}
        </button>
        
        {status === 'success' && (
          <p className="form-success">Thanks! We'll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="form-error">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
}

export default InquiryForm;