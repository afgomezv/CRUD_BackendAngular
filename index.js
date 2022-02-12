const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

// dabase connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "songapp",
  port: 3306,
});

//check database connection

db.connect((err) => {
  if (err) {
    console.log(err, "error connection");
  } else {
    console.log("database connected ...");
  }
});

// READ ALL DATA (GET)

app.get("/song", (req, res) => {
  let qr = `select * from song`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
    }

    if (result.length > 0) {
      res.send({
        message: "all song data",
        data: result,
      });
    }
  });
});

// READ SINGLE SONG (GET)

app.get("/song/:id", (req, res) => {
  let gID = req.params.id;

  let qr = `select * from song where id=${gID}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
    }

    if (result.length > 0) {
      res.send({
        message: "get single data",
        data: result,
      });
    } else {
      res.send({
        message: "data not found",
      });
    }
  });
});

// CREATE DATA (POST)

app.post("/song", (req, res) => {
  console.log(req.body, "create data");

  let artist = req.body.artist;
  let song = req.body.song;
  let timeSong = req.body.time;
  let album = req.body.album;

  let qr = `insert into song(artist, song, time, album)
  values('${artist}', '${song}', '${timeSong}', '${album}')`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result, "result");
    res.send({
      message: "data insert",
    });
  });
});

//UPDATE DATA (PUT)

app.put("/song/:id", (req, res) => {
  console.log(req.body, "update data");

  let gID = req.params.id;
  let artist = req.body.artist;
  let song = req.body.song;
  let timeSong = req.body.time;
  let album = req.body.album;

  let qr = `update song set artist = '${artist}', song = '${song}', time = '${timeSong}', album = '${album}' where id = ${gID} `;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send({
      message: "data update",
    });
  });
});

//DELETE DATE (DELETE)

app.delete("/song/:id", (req, res) => {
  let qID = req.params.id;

  let qr = `delete from song where id='${qID}'`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send({
      message: "data deleted",
    });
  });
});

//listening server

app.listen(8080, () => {
  console.log("server running...");
});
