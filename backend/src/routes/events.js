const express = require('express');
const router = express.Router();
const db = require('../models/database');

// GET all events (sorted by date)
router.get('/', (req, res) => {
  db.all(`SELECT * FROM events WHERE status = 'upcoming' ORDER BY date`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST - add a new event
router.post('/', (req, res) => {
  const { date, time, venue, address, notes } = req.body;
  
  db.run(
    `INSERT INTO events (date, time, venue, address, notes) VALUES (?, ?, ?, ?, ?)`,
    [date, time, venue, address, notes],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Event added successfully' });
    }
  );
});

// DELETE - remove an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM events WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Event deleted successfully' });
  });
});

// PUT - update an event
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { date, time, venue, address, notes } = req.body;
  
  db.run(
    `UPDATE events SET date = ?, time = ?, venue = ?, address = ?, notes = ? WHERE id = ?`,
    [date, time, venue, address, notes, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Event updated successfully' });
    }
  );
});

module.exports = router;