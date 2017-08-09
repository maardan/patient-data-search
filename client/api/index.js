function fetchPatientData(rid, status) {

	return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/last-three-values?rid=' + rid + '&status=' + status);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject('Network Error, please check back later');
        xhr.send();	
	});
}

export default {
	fetchPatientData
};