const express = require('express');
const http = require('http');
const route = require('./route');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(cookieParser());

const port = app.get('port');

app.all('/*', (req, res, next) => {
	res.set('Content-Type', 'application/json');
	res.set('Access-Control-Allow-Origin', req.headers.origin);
	res.set('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization');
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	next();
});

// Custom Methods with Cookie Handling
app.get('/customEndpoint', (req, res) => {
	let dir = path.join(__dirname, '/customEndpoint/');
	route.getCustomData(req, res, dir);
});

// Pokemon Methods
app.get('*', (req, res) => {
	let dir = path.join(__dirname, req.path + '/');
	route.getDefaultData(req, res, dir);
});

const defaultResponse = (req, res) => {
	let response = {
		status: "OK",
		message: `${req.method} successful!`
	}
	res.status(200).send(response);
}

app.post('*', defaultResponse);
app.put('*', defaultResponse);
app.delete('*', defaultResponse);

http.createServer(app).listen(port, () => {
	console.log(`API Server listening on port ${port}`);
});