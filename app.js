const express = require('express');
const db = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM menu');
  res.render('index', { menus: rows });
});

app.post('/add', async (req, res) => {
  const { name, price, category } = req.body;
  await db.query('INSERT INTO menu (name, price, category) VALUES (?, ?, ?)', [name, price, category]);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM menu WHERE id = ?', [req.params.id]);
  res.render('edit', { menu: rows[0] });
});

app.post('/edit/:id', async (req, res) => {
  const { name, price, category } = req.body;
  await db.query('UPDATE menu SET name = ?, price = ?, category = ? WHERE id = ?', [name, price, category, req.params.id]);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM menu WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

app.listen(3000, () => console.log('http://localhost:3000'));