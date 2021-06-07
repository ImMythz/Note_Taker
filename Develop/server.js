const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// allows access to files inside the 'public' folder
app.use(express.static('public'));

// handles the data from the requests
app.use(express.urlencoded({
    extended: true
}));

// this handles the json data 
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log('listening on http://localhost:3001');
});