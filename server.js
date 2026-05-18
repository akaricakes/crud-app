const { MongoClient } = require('mongodb')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

require('dotenv').config()
const connectionString = process.env.MONGO_URI
console.log(connectionString)

MongoClient.connect(connectionString)
  .then(client => {
    const db = client.db('n11-database')
    const trackList = db.collection('tracks')

    app.post('/tracks', (req, res) => {
      trackList.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
      trackList.find()
      .toArray()
      .then(results => {
        res.render('index.ejs', { tracks: results })
      })
      .catch(error => console.error(error))
    })

    app.delete('/tracks', async (req, res) => {
      const { track, artist, album, duration } = req.body
      await trackList.deleteOne({ track, artist, album, duration })
      res.json({ success: true })
    })

    app.put('/tracks', async (req, res) => {
      const { oldTrack, newTrack } = req.body
      await trackList.updateOne(oldTrack, { $set: newTrack })
      res.json({ success: true })
    })

    app.listen(3000, () => {
        console.log('listening on 3000')
    })
  })
.catch(error => console.error(error))
