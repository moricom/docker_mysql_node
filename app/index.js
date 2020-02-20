'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

/* 追記1 ここから*/
// mysqlに接続
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'db',
  user : 'root',
  password : 'password',
  port : 3306,
  database: 'anilee'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('db connected');
});
/* ここまで */

// App
const app = express();
app.get('/', function (req, res) {
  /* 追記2 ここから*/
  // mysqlのusersテーブルからレコード取得
  connection.query('SELECT * from users;', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // 取得したユーザーのオブジェクトをjson形式の文字列に変換してレスポンス出力
    res.send(result);
  });
  /* ここまで */
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
