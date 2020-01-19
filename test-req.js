var request = require('request')

const req =  {
  "url": "http://bigfathead.eu/kukorica/bithu/",
  "strictSSL": true,
  "uri": "http://bigfathead.eu/kukorica/bithu/api/v2/list_movies.json",
  "qs": {
    "sort_by": "date_added",
    "limit": 50,
    "page": 1,
    "cat": "Hun"
  },
  "json": true,
  "timeout": 10000
};

request(req, function (error, response, body) {
  if (error) console.warn(error);
  else {
    console.log(response.statusCode);
    console.log(body);
  }
});
