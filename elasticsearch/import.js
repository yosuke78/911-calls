var elasticsearch = require('elasticsearch');
var csv = require('csv-parser');
var fs = require('fs');

var esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

var arr = []
var id = 0

esClient.indices.create({
  index: "emergency",
  body: {
    "mappings": {
      csv: {

        properties: {
          location: { type: "geo_point" }
        }

      }
    }
  }
}, function (err, resp, respcode) {
  console.log(err, resp, respcode);
});


fs.createReadStream('../911.csv')
  .pipe(csv())
  .on('data', data => {
    arr.push({ location: { lat: parseFloat(data.lat), lon: parseFloat(data.lng) }, data: JSON.parse(JSON.stringify(data)) })
  })
  .on('end', () => {
    const bulkSize = 1000
    for (let i = 0; i * bulkSize < arr.length; i++) {
      let subArr = arr.slice(i * bulkSize, Math.min(arr.length, (i + 1) * bulkSize))
      const body = []
      subArr.forEach(x => {
        body.push({ index: { _index: 'emergency', _type: 'csv', _id: id++ } })
        body.push(x)
      })
      esClient.bulk({ body: body })
    }
  }
  );
