export const API_BASE_URL = "http://3.124.181.240:8080/api";
//export const API_BASE_URL = 'http://52.58.234.135:8080/api';
//export const API_BASE_URL = 'http://192.168.1.40:8080/api';
export const ACCESS_TOKEN = "accessToken";

export const REQUEST_HEADERS = {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }
};
/*
export const TOPIC_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20; */
