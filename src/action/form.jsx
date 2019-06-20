import axios from 'axios'

/**
 *  assuming the API returns something like this:
 *  const json = [
 *      { value: 'one', label: 'One' },
 *      { value: 'two', label: 'Two' }
 *   ]
 */
export function fetchOptions(url) {
    return axios.get(url)
        .then(res => {
            return res;
        })
        .catch(err => err);
}

/**
 * Получение днанных методом GET
 */
export function fetchGet(url, params) {
    return axios.get(url, params)
        .then(res => {
            return res;
        })
        .catch(err => err);
}

/**
 * Получение днанных методом POST
 */
export function fetchPost(url, params) {
    return axios.post(url, params)
        .then(res => {
            return res;
        })
        .catch(err => err);
}