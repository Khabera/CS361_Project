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
    res.json(query_results.recordset);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching trips.');
  }
});

router.get('/api/trips/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`SELECT * FROM Trips WHERE TripID = ${tripId}`)
    res.json(query_results.recordset);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching trips.');
  }
});

router.get('/api/trips/:id/items', async (req, res) => {
  try {
    const tripId = req.params.id;
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`SELECT * FROM TripItems WHERE TripID = ${tripId}`)
    res.json(query_results.recordset);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching trip items.');
  }
});

router.post('/api/trips', async (req, res) => {
  try {
    const {name, description, startdate, enddate} = req.body;
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`INSERT INTO Trips (Name, Description, StartDate, EndDate)
                                          VALUES('${name}', '${description}', '${startdate}', '${enddate}');`)
    console.log(query_results)
    res.json(query_results) 
    } catch (err) {
      console.log(err)
      res.status(500).send('Error adding trip')
    }

})

router.post('/api/trips/:id/items', async (req, res) => {
  try {
    const tripId = req.params.id;
    console.log(req.params)
    console.log(tripId)
    const {ItemName, ItemDescription} = req.body;
    console.log(ItemName)
    console.log(ItemDescription)
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`INSERT INTO TripItems (TripID, ItemName, ItemDescription)
                                          VALUES('${tripId}', '${ItemName}', '${ItemDescription}');`)
    console.log(query_results)
    res.json(query_results)
    } catch (err) {
      console.log(err)
      res.status(500).send('Error adding trip item')
    }
})

router.post('/api/tripitems/:iid/pack', async (req, res) => {
  try {
    const itemID = req.params.iid;
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`UPDATE TripItems SET Packed=1 WHERE ItemID=${itemID};`)
    console.log(query_results)
    res.json(query_results)
    } catch (err) {
      console.log(err)
      res.status(500).send('Error packing item')
    }
})

router.post('/api/tripitems/:iid/unpack', async (req, res) => {
  try {
    const itemID = req.params.iid;
    const db = await pool;
    const request = db.request()
    query_results = await request.query(`UPDATE TripItems SET Packed=0 WHERE ItemID=${itemID};`)
    console.log(query_results)
    res.json(query_results)
    } catch (err) {
      console.log(err)
      res.status(500).send('Error packing item')
    }
})

module.exports = router;
