const express = require('express');
const router = express.Router();
const db = require('../models/database');

// GET all contacts (for admin dashboard)
router.get('/', (req, res) => {
  db.all(`SELECT * FROM contacts ORDER BY created_at DESC`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single contact by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// POST new contact (from public form)
router.post('/', (req, res) => {
  const { name, email, venue, preferred_date, message } = req.body;
  
  db.run(
    `INSERT INTO contacts (name, email, venue, preferred_date, message, status) 
     VALUES (?, ?, ?, ?, ?, 'new')`,
    [name, email, venue, preferred_date, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // TODO: Send auto-reply email (stubbed for now)
      console.log(`Auto-reply would be sent to ${email}`);
      console.log(`New inquiry from ${name} at ${venue}`);
      
      res.json({ id: this.lastID, message: 'Inquiry received' });
    }
  );
});

// PUT update contact status (mark as replied, etc.)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run(
    `UPDATE contacts SET status = ?, replied_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [status, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Contact updated' });
    }
  );
});

module.exports = router;