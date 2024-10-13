const express = require('express');
const mysql = require('mysql2');
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: 'root', 
    database: 'studentDB' 
});

app.use(express.static(__dirname));

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})


app.post('/add', (req, res) => {
    const { name, email, age } = req.body;
    const sql = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
    db.query(sql, [name, email, age], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student added successfully!' });
    });
});


app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sql = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated successfully!' });
    });
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
