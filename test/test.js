var http = require('http');
var assert = require('assert');
var server = require('../server/server.js');

const initExpect = require('../data/sample_expectations_rd1.json');
const newExpect = require('../data/sample_expectations_rd2.json');

describe('HTTP Server Test', () => {

	before(() => {
		server.listen(8989);
	});

	after(() => {
		// server.close();
	});

	describe('/', () => {

		const myTest = (expected, status) => {
			http.get(`http://127.0.0.1:8989/last-three-values?rid=${expected.result_id}&status=${status}`, (response) => {

					assert.equal(response.statusCode, 200); // Assert the status code.

					var body = '';

					response.on('data', (d) => {
						body += d;
					});
					response.on('end', () => {
						// Let's wait until we read the response, and then assert the body
						const apiRes = JSON.parse(body);
						const expectedLast3 = expected.last_three_values;

						apiRes.last_three_values.forEach((obj, i) => {
							assert.equal(obj.patient_id, expectedLast3[i].patient_id);
							assert.equal(obj.value, expectedLast3[i].value);
							assert.equal(obj.name, expectedLast3[i].name);
							assert.equal(obj.result_id, expectedLast3[i].result_id);
							assert.equal(obj.date, expectedLast3[i].date);
						});
						assert.equal(apiRes.result_id, expected.result_id);
					});
				});
		};

		it('Testing initial lab results against expected', (done) => {

			initExpect.forEach((expected) => {
				myTest(expected, 'initial');
			});
			done();
		});

		it('Testing new lab results against expected', (done) => {

			initExpect.forEach((expected) => {
				myTest(expected, 'new');
			});
			done();
		});
	});
});