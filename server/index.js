const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const mongodb = require('mongodb');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/:lib', async (req, res) =>{
    const a5 = await loadBib(req.params.lib);
    let startDate = new Date(req.query.startDate);
    let endDate = new Date(req.query.endDate);
    let result = await a5.find({"dateTime": {"$gte": startDate, "$lte": endDate}}).toArray();
    res.send(result);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/')); //Static 
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html')); //SPA
}
  
async function loadBib(library) {
    const client = await mongodb.MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
    return client.db("bibliothek").collection(library);
}

const port = process.env.PORT || 5000;
app.listen(port, () =>  console.log(`Server started on port ${port}`));