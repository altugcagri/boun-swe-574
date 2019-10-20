// Deps
import axios from "axios";
import { pushMessage } from "controllers/messenger";
import extend from "lodash/extend";
import { apiPath } from "functions/helpers";
import store from "data/store";
import { set404 } from "controllers/navigator";

const defaultConfig = {
    excludeApiPath: false
};

export default {
    get: function(target, params = false, finalFunction = false, opts = {}) {
        if (params === false) {
            params = {};
        }

        let config = {};
        extend(config, defaultConfig, opts);

        let ajaxToken = axios.CancelToken;
        let ajaxController = ajaxToken.source();

        if (!config.excludeApiPath) {
            target = apiPath(target);
        }

        axios
            .get(target, {
                params: params,
                cancelToken: ajaxController.token,
                headers: headData()
            })
            .then(res => {
                evaluateData(res, finalFunction);
            })
            .catch(error => {
                evaluateData(
                    { status: 500, error: error, data: {} },
                    finalFunction
                );
            });

        return ajaxController;
    },
    post: function(target, params = false, finalFunction = false, opts = {}) {
        if (params === false) {
            params = {};
        }
        let config = {};
        extend(config, defaultConfig, opts);

        if (!config.excludeApiPath) {
            target = apiPath(target);
        }

        axios
            .post(target, params, { headers: headData() })
            .then(res => {
                evaluateData(res, finalFunction);
            })
            .catch(error => {
                evaluateData(
                    { status: 500, error: error, data: {} },
                    finalFunction
                );
            });
    }
};

function evaluateData(response, finalFunction = false) {
    switch (response.status) {
        case 200:
            if (finalFunction) {
                finalFunction(response.data, response.status, response);
            }
            break;
        case 201:
            if (finalFunction) {
                finalFunction(response.data, response.status, response);
            }
            break;
        case 500:
            pushMessage("HATA: İşlem gerçekleştirilemedi.", { type: "error" });
            console.log(response.error);
            if (finalFunction) {
                finalFunction(false, response.status, response);
            }
            break;
        default:
            if (finalFunction) {
                finalFunction(false, response.status, response);
            }
            break;
    }

    if (response.data.messages) {
        for (let p = 0; p < response.data.messages.length; p++) {
            pushMessage("", response.data.messages[p]);
        }
    }

    if (response.data.actions) {
        if (response.data.includes("404")) {
            set404();
        }
    }
}

function headData() {
    return {
        access_token: store.getState().user.token,
        Authorization: "Bearer " + store.getState().user.token,
        email: store.getState().user.user.email
    };
}
