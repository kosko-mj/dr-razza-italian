import { useState, useEffect } from 'react';

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = () => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => setInquiries(data));
  };

  const handleMarkReplied = (id) => {
    fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'replied' })
    }).then(() => {
      fetchInquiries();
      setSelectedInquiry(null);
      setReplyText('');
      setReplyStatus('sent');
      setTimeout(() => setReplyStatus(''), 3000);
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'new') return <span className="badge-new">NEW</span>;
    if (status === 'replied') return <span className="badge-replied">REPLIED</span>;
    return <span className="badge-default">{status}</span>;
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Inquiries</h1>
      </div>

      <div className="inquiries-layout">
        {/* Inquiries List */}
        <div className="inquiries-list">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Venue</th>
                <th>Status</th>
               </tr>
            </thead>
            <tbody>
              {inquiries.map(inquiry => (
                <tr 
                  key={inquiry.id} 
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={selectedInquiry?.id === inquiry.id ? 'selected' : ''}
                >
                  <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.venue}</td>
                  <td>{getStatusBadge(inquiry.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inquiry Detail & Reply */}
        <div className="inquiry-detail">
          {selectedInquiry ? (
            <>
              <h3>Inquiry from {selectedInquiry.name}</h3>
              <div className="inquiry-info">
                <p><strong>Email:</strong> {selectedInquiry.email}</p>
                <p><strong>Venue:</strong> {selectedInquiry.venue}</p>
                <p><strong>Preferred Date:</strong> {selectedInquiry.preferred_date || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p className="inquiry-message">{selectedInquiry.message}</p>
              </div>
              
              <div className="reply-section">
                <label>Your Reply:</label>
                <textarea
                  rows="4"
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <button 
                  onClick={() => handleMarkReplied(selectedInquiry.id)}
                  disabled={!replyText.trim()}
                >
                  Send Reply & Mark Replied
                </button>
                {replyStatus === 'sent' && (
                  <p className="reply-success">Reply sent! (Email integration coming soon)</p>
                )}
                <p className="reply-note">
                  Note: Email sending will be activated after domain verification.
                  For now, the inquiry is marked as replied in the database.
                </p>
              </div>
            </>
          ) : (
            <div className="no-selection">Select an inquiry to view and reply</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inquiries;