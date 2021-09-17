const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json()); //req.body

//routes
//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES (?)',
      [description]
    );

    res.json(newTodo);
    console.log('done');
  } catch (err) {
    console.error(err.message);
  }
});
// get all todo
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos[0]);
    console.log('done');
  } catch (err) {
    console.error(err.message);
  }
});
// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = ?', [id]);
    res.json(todo[0]);
    console.log('done');
  } catch (err) {
    console.error(err.message);
  }
});
// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = ? WHERE todo_id = ?',
      [description, id]
    );
    res.json('done');
    console.log('done');
  } catch (err) {
    console.error(err.message);
  }
});
// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = ?', [
      id,
    ]);
    res.json('done');
  } catch (err) {
    console.error(err.message);
  }
});
//
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
