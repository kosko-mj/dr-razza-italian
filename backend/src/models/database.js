const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file location
const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  // Events table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT NOT NULL,
      address TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'upcoming'
    )
  `);

  // Add contacts table after events table
    db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        venue TEXT NOT NULL,
        preferred_date TEXT,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        replied_at DATETIME
    )
    `);

 // Insert sample data if table is empty
 db.get(`SELECT COUNT(*) as count FROM events`, (err, row) => {
    if (row.count === 0) {
      db.run(`
        INSERT INTO events (date, time, venue, address, notes)
        VALUES 
          ('April 10, 2026', '5pm - 9pm', 'A-Bar', 'Greenpoint, Brooklyn', 'Sausage & Peppers'),
          ('April 11, 2026', '6pm - 10pm', 'Cassette', 'Ridgewood, Queens', 'Hot Calabrese w/ Chili Peppers'),
          ('May 1, 2026', '6pm - 10pm', 'Pokito', 'Williamsburg, Brooklyn', 'Meatball Parm Hero, Vegan Eggplant Parm')
      `);
    }
  });
});

module.exports = db;