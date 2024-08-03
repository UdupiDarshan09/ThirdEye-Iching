const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/personal', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ching"
    });

    const sql1 = "INSERT INTO personal (name, dob, tob, pob) VALUES (?, ?, ?, ?)";
    const values1 = [
        req.body.name,
        req.body.dob,
        req.body.tob,
        req.body.pob,
    ];

    db.connect();

    db.query(sql1, values1, (err, data) => {
        db.end();

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json({ error: "user created successfully" });
    });
});

app.post('/query', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ching"
    });

    const sql2 = "INSERT INTO query (currentdate, currenttime, questions, category) VALUES (?, ?, ?, ?)";
    const values2 = [
        req.body.currentdate,
        req.body.currenttime,
        req.body.questions,
        req.body.category,
    ];

    db.connect();

    db.query(sql2, values2, (err, data) => {
        db.end();

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json({ error: "user created successfully" });
    });
});

app.get('/category', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ching"
    });

    const sql = "SELECT category FROM query ORDER BY timestamp DESC LIMIT 1";

    db.connect();

    db.query(sql, (err, data) => {
        db.end();

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json(data);
    });
});

app.post('/toss', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ching"
    });

    const sql3 = "INSERT INTO toss (throw1, throw2, throw3, throw4, throw5, throw6) VALUES (?, ?, ?, ?, ?, ?)";
    const values3 = [
        req.body.throw1,
        req.body.throw2,
        req.body.throw3,
        req.body.throw4,
        req.body.throw5,
        req.body.throw6,
    ];

    db.connect();

    db.query(sql3, values3, (err, data) => {
        if (err) {
            console.error(err);
            db.end();
            return res.status(500).json({ error: "internal server error" });
        }

        const sql4 = "SELECT * FROM toss ORDER BY throw1, throw2, throw3, throw4, throw5, throw6 DESC LIMIT 1";

        db.query(sql4, (err, tossData) => {
            db.end();

            if (err) {
                console.error(err);
                return res.status(500).json({ error: "internal server error" });
            }
            return res.status(200).json(tossData);
        });
    });
});

app.get('/toss', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ching"
    });

    const sql = "SELECT * FROM toss";

    db.connect();

    db.query(sql, (err, data) => {
        db.end();

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json(data);
    });
});

// New endpoint to fetch the last entered personal record


app.listen(8081, () => {
    console.log("listening on port 8081");
});
