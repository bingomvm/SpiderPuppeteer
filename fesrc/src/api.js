import axios from 'axios';
import qs from 'qs';
import jsonpLib from 'jsonp';
const api = new axios.create({
  baseURL: '/',
  timeout: 30000
});

api.interceptors.request.use(request => {
  if (
    request.data &&
    typeof request.data === 'object' &&
    request.data.toString() === '[object Object]'
  ) {
    // request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // request.data = obj2fd(request.data, { indices: false });
    request.data = qs.stringify(request.data);
  }

  if (request.params) {
    request.url += `?${qs.stringify(request.params)}`;
    request.params = {};
  }
  return request;
});

export default api;
export const jsonp = (url, data, opt) => {
  if (data) {
    url += '?' + qs.stringify(data);
  }
  return new Promise((resolve, reject) => {
    jsonpLib(url, opt, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
