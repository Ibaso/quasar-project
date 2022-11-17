import {boot} from 'quasar/wrappers'
import axios from 'axios'
import {baseUrl} from "src/utils/const/apiUrls";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: baseUrl.url,
  timeout: baseUrl.timeout,
})


export default boot(({app, store}) => {
  axios.interceptors.request.use(
    function (request) {
      // request.headers['accept-language'] = 'ru';

      if (store.state.user) {
        if (store.state.user.token)
          request.headers['Authorization'] = 'Bearer ' + store.state.user.token;
      }
      return request;
    },
    function (error) {
      return Promise.reject({
        errorCode: error.response.data.code,
        errorMessage: error.response.data.error_message
      });
    }
  );

  /**
   * response interceptors
   * */

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject({
        errorCode: error.response.data.code,
        errorMessage: error.response.data.message
      });

    }
  );
  app.config.globalProperties.$api = api
  app.config.globalProperties.$axios = axios

})

export {axios, api}

