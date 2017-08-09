import api from '../api';
export const GETTING_DATA = 'GETTING_DATA';
export const NETWORK_ERROR = 'NETWORK_ERROR';
export const UPDATE_DATA = 'UPDATE_DATA';

function gettingData() {
	return {
		type: GETTING_DATA
	};
}

function handleError(error) {
	return {
		type: NETWORK_ERROR,
		error
	};
}

function updateData(data) {

	return {
		type: UPDATE_DATA,
		results: data.last_three_values
	};
}

export function getData(query, status) {

	return function (dispatch) {

		dispatch(gettingData());

		api.fetchPatientData(query, status)
		.then((response) => {

			if (response.error) {
				dispatch(handleError(response.error)); // if no results (no match) found
			}
			else {
				dispatch(updateData(response)); // success, update data
			}
		})
		.catch((error) => dispatch(handleError(error)));
	};
}