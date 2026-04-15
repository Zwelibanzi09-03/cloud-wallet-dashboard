 
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'clouduser',
  password: 'CloudApp123!',
  database: 'Cloudapp'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.use(express.json());

app.post('/transactions', (req, res) => {
  const { user_id, amount } = req.body;

  db.query(
    'INSERT INTO transactions (user_id, amount) VALUES (?, ?)',
    [user_id, amount],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: 'Transaction added' });
    }
  );
});

app.delete('/transactions/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM transactions WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: 'Transaction deleted' });
    }
  );
});

app.put('/transactions/:id', (req, res) => {
  const id = req.params.id;
  const { amount } = req.body;

  db.query(
    'UPDATE transactions SET amount = ? WHERE id = ?',
    [amount, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: 'Transaction updated' });
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
