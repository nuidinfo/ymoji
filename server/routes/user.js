const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  console.log({ userName, password });

  db.all(`SELECT * FROM user where userName=?  `, [userName], (err, rows) => {
    if (err) {
      res.status(400).json({ error: true, data: err.message, msg: 'error' });
      return;
    }
    if (rows.length > 0 && rows[0].password == password) {
      const token = jwt.sign(
        { userID: rows[0].userID, userName: rows[0].userName },
        'secret'
      );

      return res.json({
        error: false,
        data: {
          token: token,
          userID: rows[0].userID,
          userName: rows[0].userName,
        },
      });
    } else {
      return res.json({
        error: true,
        data: 'Name or password is wrong',
      });
    }
  });

  //   res.json('Login route');
});
router.post('/register', async (req, res) => {
  const { userName, password, status } = req.body;
  console.log({ userName, password });
  db.run(
    `INSERT INTO user  VALUES (?, ?,?,?)`,
    [null, userName, password, status],
    function (err) {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: {
          userID: this.lastID,
          userName: userName,
        },
      });
    }
  );
});

module.exports = router;
