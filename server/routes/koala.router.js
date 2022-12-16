const { Router } = require('express');
const express = require('express');
const router = express.Router();
const pool = require(`../module/pool.js`)

// DB CONNECTION


// GET
router.get(`/`, (req, res) => {
    console.log(`In /koala GET`);
    let sqlQuery = `
    SELECT * 
    FROM "KOALA"
        ORDER BY "ready_to_transfer" ASC`;
        pool.query(sqlQuery)
        .then ((dbRes) => {
            let koalaTableData = dbRes.rows;
            res.send(koalaTableData);
        }).catch((dbErr) => {
            res.sendStatus(500);
        });
});

// POST
router.post('/',(req,res) =>{
    console.log('post/koala');
    console.log(req.body);
    let sqlQuery= `
    INSERT INTO "koala"
    ("name","gender","age","ready_to_transfer","notes")
    values
    ($1,$2,$3,$4,$5)`
    let sqlValues = [req.body.name, req.body.gender,req.body.age,req.body.ready_to_transfer,req.body.note];
    pool.query(sqlQuery,sqlValues)
    .then((dbRes) => {
      res.sendSTATUS(201)
    })
    .catch((dbErr) => {
      console.log('something broke in POST koala', dbErr);
      res.sendStatus(500)
    })
  })

// PUT


// DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;
  
    let sqlQuery = `
      DELETE FROM "koala"
        WHERE "id"=$;        
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
      .then((dbRes) => {
        // That worked! Tell "OK" to the client:
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.log('broke in DELETE /creatures/:id', dbErr);
        res.sendStatus(500);
      })
  })

module.exports = router;