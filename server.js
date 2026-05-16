const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb://akari:aIEpzzM11Xjvr0fq@ac-djoskji-shard-00-00.lv4xmjs.mongodb.net:27017,ac-djoskji-shard-00-01.lv4xmjs.mongodb.net:27017,ac-djoskji-shard-00-02.lv4xmjs.mongodb.net:27017/?ssl=true&replicaSet=atlas-s4fti3-shard-0&authSource=admin&appName=akripan";

MongoClient.connect(connectionString)
  .then(client => {
    const db = client.db('n11-database')
    const trackList = db.tracklist('tracks')

    app.post('/tracks', (req, res) => {
      trackList.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
      db.collection('tracks')
        .find()
        .toArray()
        .then(results => {
          res.render('index.ejs', { tracks: results })
        })
        .catch(error => console.error(error))
    })

    app.put('/tracks', (req, res) => {
      trackList.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            track: req.body.track,
          },
        },
        {
          upsert: true,
        }
      )
    .catch(error => console.error(error))

    app.delete('/tracks', (req, res) => {
      trackList.deleteOne({ name: req.body.name })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No track to delete')
          }
        })
        .catch(error => console.error(error))
    })
  })
})
.catch(error => console.error(error))

app.listen(3000, function () {
  console.log('listening on 3000')
})
