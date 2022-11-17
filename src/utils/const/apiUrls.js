export const baseUrl = {
  // url: 'http://localhost:8087/api',
  url: 'http://10.100.2.107:8087/api',
  timeout: 60 * 60 * 20
}
export const apiUrls = {
  auth: baseUrl.url + '/auth',
  post: baseUrl.url + '/post',
  feed: baseUrl.url + '/feed',
  like: baseUrl.url + '/like',
  user: baseUrl.url + '/user',

}
