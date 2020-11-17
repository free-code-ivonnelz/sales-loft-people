const express = require('express');
const path = require('path');
const app = express();
const routes = require('./server/routes/routes');
const dotenv = require('dotenv');
dotenv.config();

//routes
app.use('/api', routes);

//angular dist output folder
//production ng build
app.use(express.static(path.join(__dirname, 'dist')));


//send all other request to angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || 4600;

app.listen(port, (req, res) => {
    console.log('running on port', port);
});