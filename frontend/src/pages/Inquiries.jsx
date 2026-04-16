import { useState, useEffect } from 'react';

function Inquiries({ onReply, onMarkRead }) {
  const [inquiries, setInquiries] = useState([]);
  const [archivedInquiries, setArchivedInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchInquiries();
    fetchArchivedInquiries();
  }, []);

  const fetchInquiries = () => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => setInquiries(data));
  };

  const fetchArchivedInquiries = () => {
    fetch('http://localhost:5000/api/contacts/archived')
      .then(res => res.json())
      .then(data => setArchivedInquiries(data));
  };

  const handleMarkRead = (id) => {
    fetch(`http://localhost:5000/api/contacts/${id}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      fetchInquiries();
      if (onMarkRead) onMarkRead();
    });
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
      if (onReply) onReply();
      setTimeout(() => setReplyStatus(''), 3000);
    });
  };

  const handleArchive = (id) => {
    if (window.confirm('Archive this inquiry?')) {
      fetch(`http://localhost:5000/api/contacts/${id}`, { method: 'DELETE' })
        .then(() => {
          fetchInquiries();
          fetchArchivedInquiries();
          setSelectedInquiry(null);
          if (onReply) onReply();
        });
    }
  };

  const handleRestore = (id) => {
    fetch(`http://localhost:5000/api/contacts/${id}/restore`, { method: 'PUT' })
      .then(() => {
        fetchInquiries();
        fetchArchivedInquiries();
        setSelectedInquiry(null);
        if (onReply) onReply();
      });
  };

  const getStatusIcon = (inquiry) => {
    if (inquiry.status === 'replied') {
      return <i className="ri-mail-check-line" style={{ color: '#2D4A2D', fontSize: '18px' }} title="Replied"></i>;
    }
    if (inquiry.read_at) {
      return <i className="ri-mail-open-line" style={{ color: '#888', fontSize: '18px' }} title="Read"></i>;
    }
    return <i className="ri-mail-unread-line" style={{ color: '#A52A2A', fontSize: '18px' }} title="Unread"></i>;
  };

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.read_at && inquiry.status !== 'replied') {
      handleMarkRead(inquiry.id);
    }
  };

  const currentInquiries = showArchived ? archivedInquiries : inquiries;
  const title = showArchived ? 'Archived Inquiries' : 'Active Inquiries';

  return (
    <div className="inquiries-container">
      <div className="inquiries-header">
        <div className="inquiries-tabs">
          <button 
            className={`inquiries-tab ${!showArchived ? 'active' : ''}`}
            onClick={() => setShowArchived(false)}
          >
            Active ({inquiries.length})
          </button>
          <button 
            className={`inquiries-tab ${showArchived ? 'active' : ''}`}
            onClick={() => setShowArchived(true)}
          >
            Archived ({archivedInquiries.length})
          </button>
        </div>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries.map(inquiry => (
                <tr 
                  key={inquiry.id} 
                  onClick={() => handleSelectInquiry(inquiry)}
                  className={`${selectedInquiry?.id === inquiry.id ? 'selected' : ''} ${!inquiry.read_at && inquiry.status !== 'replied' && !showArchived ? 'unread' : ''}`}
                >
                  <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.venue}</td>
                  <td style={{ textAlign: 'center' }}>{getStatusIcon(inquiry)}</td>
                  <td style={{ textAlign: 'center' }}>
                    {!showArchived ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleArchive(inquiry.id); }} 
                        className="btn-archive"
                        title="Archive"
                      >
                        <i className="ri-archive-line"></i>
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRestore(inquiry.id); }} 
                        className="btn-restore"
                        title="Restore"
                      >
                        <i className="ri-restart-line"></i>
                      </button>
                    )}
                  </td>
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
              
              {!showArchived && (
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
              )}
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