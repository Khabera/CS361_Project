// Citation for the following file:
// This backend was set up with initial skeleton provided by the CS340 Documentation
// Initial routes were written by hand, and then future routes were created by providing
// initial implementations and existing SQL Stored Procedures to AI to create the desired route.
// Routes were all tested and reviewed for desired functionality


const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {pool, sqlConfig} = require('./db');
const sql = require('mssql')

router.get('/api/trips', async (req, res) => {
  try {
    const db = await pool;
    const request = db.request()
    query_results = await request.query("SELECT * FROM Trips")
    res.json(response);
  } catch (err) {
    res.status(500).send('Error fetching trips.');
  }
});

router.post('/api/trips', async (req, res) => {
  try {
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`INSERT INTO Trips (Name, Description, StartDate, EndDate)
                                          VALUES(${req.name, req.description, req.startdate, req.enddate})`)
      res.json(query_results) 
    } catch (err) {
      res.status(500).send('Error adding trip')
    }

})

module.exports = router;
