export const API_BASE_URL = "http://3.124.181.240:8080/api";
//export const API_BASE_URL = 'http://192.168.1.40:8080/api';
export const ACCESS_TOKEN = "accessToken";

export const REQUEST_HEADERS = {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }
};

let domain = window.location.hostname;

let endpoint = process.env.REACT_APP_API_ENDPOINT
    ? process.env.REACT_APP_API_ENDPOINT
    : false;

if (!endpoint) {
    switch (domain) {
        case "localhost":
            endpoint = "http://3.124.181.240:8080";
            break;
        case "bespoke.com":
            endpoint = "http://api.bespoke.com";
            break;
        default:
            endpoint = "http://api.bespoke.com";
            break;
    }
}

export const apiBase = `${API_BASE_URL}/`;

//export const storagePath = 'https://minoto.ams3.digitaloceanspaces.com/'
export const storagePath = "/";
export const basePath = "http://localhost:3000";
