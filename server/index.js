const express = require('express');
const mainApp = express();
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const mainPort = 3000;

mainApp.use(express.json());
mainApp.use(morgan('dev'));

mainApp.use(express.static(path.join(__dirname, '../public')));

// Mark Files
mainApp.get('/bundle.js', (req, res) => {
  axios.get(`http://localhost:3002/bundle.js`)
    .then(response => {
      res.send(response.data)
    })
})

mainApp.get('/house', (req, res) => {
  axios.get(`http://localhost:3002/house?listingId=${req.query.listingId}`)
    .then(response => {
      res.send(response.data);
    });
});

mainApp.post('/schedule', (req, res) => {
  // for testing the front end... no added functionality yet
  axios.post('http://52.52.152.21:3002/schedule', req.body)
    .then(response => {
      res.send(response.data);
    });
});

mainApp.get('/robBundle.js', (req, res) => {
  axios.get(`http://13.52.171.152:4003/bundle.js`)
    .then(response => {
      res.send(response.data)
    })
})

mainApp.get('/mortgage:listingId', (req, res) => {
  const { listingId } = req.params;
  axios.get(`http://13.52.171.152:4003/mortgage${listingId}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.send(err)
    })
});

mainApp.patch('/adClick', (req, res) => {
  axios.patch('http://13.52.171.152:4003:4003/adClick', req.body)
    .then(response => {
      res.end();
    });
});

mainApp.get('/kevBundle.js', (req, res) => {
  axios.get('http://18.144.115.157:4004/bundle.js')
    .then(response => {
      res.send(response.data)
    })
})


mainApp.get('/similar-listings', (req, res) => {
  axios.get('http://18.144.115.157:4004/similar-listings')
    .then(response => {
      res.send(response.data);
    });
});







mainApp.listen(mainPort, () => {
  console.log(`Main App is listening on port ${mainPort}, only use to serve up static HTML files.`);
})