import fetch from 'isomorphic-fetch';
import utils from './utils';
import message from '../containers/components/message'
// let base64 = require('base-64');

// let base = `/apifront`;

function checkStatus(response) {
    if (response.status == 0) {

        throw new Error('test');
        // return false;
    } else
        if (response.type == 'opaqueredirect') {
            window.open(process.env.REACT_APP_CAS, '_self');
            return '重定向';
        }
        else {
            return response.json().then((data) => {
                if (response.status >= 200 && response.status < 300) {
                    return data;
                }
                if (response.status == 405) {
                    message.error(response.statusText);
                } else {
                    // const error = data.msg;
                    const error = {};
                    error.response = response;
                    error.status = response.status;
                    error.text = data.msg || data.message;
                    throw error;
                }

            });
        }
}

// formdata
const _formlize = function (obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += _formlize(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                var str = 'labels+\[+[0-9]+\]$';
                if (name.match('labels') && !name.match(str)) {
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += _formlize(innerObj) + '&';
                } else {
                    fullSubName = name + '.' + subName + '';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += _formlize(innerObj) + '&';
                }
            }
        } else if (value == null || value === '') {
            delete obj[name];
        } else {
            query += encodeURIComponent(name) + '=' + encodeURIComponent((value == null ? '' : value)) + '&';
        }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};
const _formFile = function (data) {
    let param = new FormData();
    let name;
    for (name in data) {
        let value = data[name];
        if (value instanceof Object) {
            if (value.length) {
                for (let i = 0; i < value.length; i++) {
                    param.append(name, value[i], value[i].name);
                }
            } else {
                param.append(name, value, value.name);
            }
        } else {
            param.append(name, value);
        }
    }
    return param;
}


/**
* Requests a URL, returning a promise.
*
* @param  {string} url       The URL we want to request
* @param  {object} [options] The options we want to pass to "fetch"
* @return {object}           An object containing either "data" or "err"
*/
function request(url, options) {
    // TODO 添加Authorization头部, 添加token
    return fetch(url, options)
        .then(checkStatus)
        .then(data => (data))
        .catch(err => {
            if (err.toString() == 'Error: test') {
                // this.props.history.push(`/`);
                window.open(process.env.REACT_APP_CAS, '_self');
            } else {
                message.error(`${err.text ? err.text : "未知错误"}`);
                if (err.status === 401 &&
                    [
                        "无效的token",
                        "token已过期，请重新登录"
                    ].indexOf(err.text) !== -1
                ) {
                    // 如果是过期或者无效
                    this.props.history.push(`/`);
                }
            }
            // throw err;
        });
}
export default {
    request: request,
    get(url, data) {
        if (data) {
            return request(url + utils.encodeParam(data), {
                method: 'GET',
                credentials: 'include',
                redirect: 'manual',
                headers: {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                }
            })
        } else {
            return request(url, { redirect: 'manual' })
        }
    },
    post(url, data, upload) {
        if (upload) {
            return request(url, {
                method: 'POST',
                credentials: 'include',
                redirect: 'manual',
                headers: {
                    "Access-Control-Allow-Origin": '*'
                },
                body: _formFile(data)
            })
        } else {
            return request(url, {
                method: 'POST',
                credentials: 'include',
                redirect: 'manual',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }

    },
    put(url, data) {
        return request(url, {
            method: 'PUT',
            credentials: 'include',
            redirect: 'manual',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },
    delete(url, data) {
        return request(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },
    postLogin(url, data) {
        return request(url, {
            method: 'POST',
            credentials: 'include',
            redirect: 'manual',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: _formlize(data)
        })
    },
}
