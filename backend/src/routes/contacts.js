const express = require('express');
const router = express.Router();
const db = require('../models/database');

// GET all contacts (excluding soft deleted)
router.get('/', (req, res) => {
  db.all(`SELECT * FROM contacts WHERE deleted_at IS NULL ORDER BY created_at DESC`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET archived contacts (soft deleted)
router.get('/archived', (req, res) => {
  db.all(`SELECT * FROM contacts WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single contact
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

// POST new contact
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
      
      console.log(`New inquiry from ${name} at ${venue}`);
      
      res.json({ id: this.lastID, message: 'Inquiry received' });
    }
  );
});

// PUT - mark contact as read
router.put('/:id/read', (req, res) => {
  const { id } = req.params;
  
  db.run(
    `UPDATE contacts SET read_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Contact marked as read' });
    }
  );
});

// PUT - update contact status (replied)
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

// Soft delete (archive) a contact
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(
    `UPDATE contacts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Contact archived' });
    }
  );
});

// Restore a soft deleted contact
router.put('/:id/restore', (req, res) => {
  const { id } = req.params;
  
  db.run(
    `UPDATE contacts SET deleted_at = NULL WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Contact restored' });
    }
  );
});

module.exports = router;