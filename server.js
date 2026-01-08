// Include the required packages
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

// Database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

// Initialize Express app
const app = express();
// Helps app to read JSON
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});

app.get('/allitems', async (req,res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.items');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for all items' });
    }
});

app.post('/additem', async (req, res) => {
    const { item_name, item_price } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO items (item_name, item_price) VALUES (?, ?)', [item_name, item_price]);
        res.status(201).json({ message: 'Item '+item_name+' added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not add item '+item_name });
    }
});

app.post('/deleteitem', async (req,res) => {
    const { id } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM items WHERE id = (?)', [id]);
        res.status(201).json({ message: 'Item '+id+' deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not delete item '+id });
    }
});

app.post('/deleteitem/:id', async (req,res) => {
    const { id } = req.params.id;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM items WHERE id = (?)', [id]);
        res.status(201).json({ message: 'Item '+id+' deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not delete item '+id });
    }
});

app.post('/updateitem', async (req,res) => {
    const { id, item_name, item_price } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE items SET item_name = (?), item_price = (?) WHERE id = (?)', [item_name, item_price, id]);
        res.status(201).json({ message: 'Item '+id+' updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not update item '+id });
    }
});