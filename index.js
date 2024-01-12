import express from 'express';
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodedb",
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello! Backend response ');
});

app.get('/posts', (req, res) => {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    });
});

app.post('/post/add', (req, res) => {
    const q = "INSERT INTO posts (`created_at`, `title`, `author`, `description`, `image`) VALUES (?)";

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const createdAt = `${year}-${month}-${day}`;

    const values = [
        `${createdAt}`,
        req.body.title,
        req.body.author,
        req.body.description,
        'https://source.unsplash.com/random',
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json('Post has been created');
    });
});

app.listen(8800, () => {
    console.log('Connected to backend PORT: 8800');
});