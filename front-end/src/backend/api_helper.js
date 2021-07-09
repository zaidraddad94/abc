import axios from "axios"
// import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const token = accessToken

//apply base url for axios
const API_URL = "http://localhost:5000/"
const API_VERSION = "V1/"

const axiosApi = axios.create({
  baseURL: API_URL + API_VERSION,
  headers: 
  {'content-type': 'application/json'},
})

// axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  console.log(url)
  return await axiosApi
  .get(url, { ...config })
  .then(response =>{return response.data})
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  console.log("data",data)
  return axiosApi
    .put(url, JSON.stringify({ ...data }), { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
