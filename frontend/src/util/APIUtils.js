import { ACCESS_TOKEN } from '../constants';
import { resolveEndpoint } from "./Helpers";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function createTopic(topicData) {
    let url = resolveEndpoint('createTopic', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(topicData)
    });
}

export function updateTopic(topicData) {
    let url = resolveEndpoint('updateTopic', []);
    return request({
        url: url,
        method: 'PUT',
        body: JSON.stringify(topicData)
    });
}

/* Created by Tallrye */
export function createQuestion(questionData) {
    let url = resolveEndpoint('createQuestion', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(questionData)
    });
}

/* Created by Tallrye */
export function createOption(optionData) {
    let url = resolveEndpoint('createOption', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(optionData)
    });
}

export function giveAnswer(newAnswer) {
    let url = resolveEndpoint('giveAnswer', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(newAnswer)
    });
}

export function createContent(contentData) {
    let url = resolveEndpoint('createContent', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(contentData)
    });
}


export function login(loginRequest) {
    let url = resolveEndpoint('login', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    let url = resolveEndpoint('signup', []);
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

/* export function checkUsernameAvailability(username) {
    let url = resolveEndpoint('checkUsernameAvailability', [{ "slug1": username }]);
    return request({
        url: url,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    let url = resolveEndpoint('checkEmailAvailability', [{ "slug1": email }]);
    return request({
        url: url,
        method: 'GET'
    });
} */


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    let url = resolveEndpoint('getCurrentUser', []);

    return request({
        url: url,
        method: 'GET'
    });
}

export function getUserProfile(username) {
    let url = resolveEndpoint('getUserProfile', [{ "slug1": username }]);
    return request({
        url: url,
        method: 'GET'
    });
}
