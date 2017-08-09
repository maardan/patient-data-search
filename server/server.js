const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 9000;
const handlePatientData = require('./queryLogic.js');
app.use(express.static(path.resolve(__dirname, '..', 'public'))); // Serve static assets

// handle special requsts
app.get( '/last-three-values', (request, result) => {

	const resultId = parseInt(request.query.rid);
	const status = request.query.status;
	result.setHeader('Content-Type', 'application/json');

	handlePatientData(resultId, status)
	.then((res) => {
		
		const last3 = {
			last_three_values: res,
			result_id: resultId
		};
		result.send(last3);
	})
	.catch((err) => result.send({error: err}));
});

// serve regular files HTML doc, JS, etc..
app.get( '/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT);
console.log(`Listening on port ${PORT}!`);

module.exports = app; // for testing