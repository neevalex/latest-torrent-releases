const express = require('express')
const app = express()
const port = 3001

var path = require('path');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)




var html = db.get('posts')
  .orderBy('popularity', 'desc').take(100)
  .value();

app.use(express.static('html'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/api', (req, res) => res.send(html))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))