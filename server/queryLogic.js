const initLabRes = require('../data/initial_lab_results.json');
const newLabRes = require('../data/new_lab_results.json');
const allLabRes = initLabRes.concat(newLabRes);

/* Used as a switch between initial and new lab results */
const initRidPid = initLabRes.reduce((acc, obj) => {
	// used for key:value pair search as such { result_id: patient_id } to make data readily searchable by result_id	
	if (!acc[obj.result_id]) {
		acc[obj.result_id] = obj;
	}
	return acc;
}, {});

const allRidPid = allLabRes.reduce((acc, obj) => {
	// the combined key value lookup index (for data that comes in 'later')
	if (!acc[obj.result_id]) {
		acc[obj.result_id] = obj;
	}
	return acc;
}, {});
/************************************************************/


// with all patient data per treatment and specified date (records and date), extract the "last three values"
const getLastThree = (records, date) => {

	const startDate = (new Date(date).getTime()/1000);
	const clientData = records;

	const clientDataChronological = clientData.sort((a, b) => {
		// sort patient data chronologically 
		const aDate = (new Date(a.date).getTime()/1000);
		const bDate = (new Date(b.date).getTime()/1000);
		return aDate - bDate;
	});

	for (let i = 0; i < clientDataChronological.length; i++) {

		if (clientDataChronological[i].date === date) {
			const last3Arr = [clientDataChronological[i-1], clientDataChronological[i-2], clientDataChronological[i-3]]; // get last 3
			return last3Arr;
		}
	}	
}

// get all records of that patient per treatment
const getPatientResults = (allResults, pid, treatment) => allResults.filter((obj) => ((obj.patient_id === pid) && (obj.name === treatment))); 

// using the given result ID (resId), get the corresponding patient ID, treatment name, and exam date
const handlePatientData = (resId, status) => {

	return new Promise((resolve, reject) => {
		
		const currRidPid = (status === 'initial' ? initRidPid : allRidPid);
		const currLabRes = (status === 'initial' ? initLabRes : allLabRes);

    	if (currRidPid[resId] !== undefined) {

			const patientId = currRidPid[resId].patient_id;
			const treatment = currRidPid[resId].name;
			const examDate = currRidPid[resId].date;

			const patientRes = getPatientResults(currLabRes, patientId, treatment);
    		const last3 = getLastThree(patientRes, examDate); // get last three patient record per result id

    		resolve(last3);
    	}
    	else {
    		reject('no match');
    	}
    });
}

module.exports = handlePatientData;