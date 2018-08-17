const fs = require('fs');
const path = require('path');

let loadJson = (res, dir, file = "success") => {
	let fileName = path.join(dir, file + '.json');
	let json = JSON.parse(fs.readFileSync(fileName, 'utf8'));
	res.status(200).send(json);
};

exports.getCustomData = function(req, res, dir) {
	let file = 'hasNoCookie';
	const token = req.cookies.myCookie;
	if (['hasCookie', 'hasNoCookie'].includes(token)) {
		file = token;
	}
	loadJson(res, dir, file);
};

exports.genericGet = function(req, res, dir) {
	loadJson(res, dir);
};