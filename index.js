import express from 'express';
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodedb",
});

app.get('/', (req, res) => {
    res.json('Hello! Backend response ');
});

app.listen(8800, () => {
    console.log('Connected to backend PORT: 8800');
});