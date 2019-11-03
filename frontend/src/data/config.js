module.exports = {
	postTitle: 'Bespoke',
	mobileBreakPoint: 960,
	mapsAPIkey: "AIzaSyDncyEm2ApXXZ0x8D8QNdqtj8S3j2Sn-4M",
	mapsTheme: false,
	filterSeperator: "|",
	ACCESS_TOKEN: "accessToken",
	API_BASE_URL: "http://3.124.181.240:8080/api",
	REQUEST_HEADERS: {
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
		}
	}
}