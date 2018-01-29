
const express = require('express');
const app = express();

app.use(express.static('public'));

// this is a route. this points at the homepage / root
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

// set up a contact route
// app.get('/contact', (req, res) => {
// 	res.sendFile(__dirname + '/contact.html');
// });

// setup a portfolio route
// app.get('/portfolio', (req, res) => {
// 	res.sendFile(__dirname + '/portoflio.html');
// });

app.listen(3000, () => {
	console.log('app running on port 3000');
});