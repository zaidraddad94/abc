import axios from "axios"
import { del, get, post, patch } from "./api_helper"
import * as url from "./url_helper"



// Get all countres
export const getAllCountres = () => get(url.GET_ALL_COUNTRIES)
export const editCountry = (data,id) => patch(url.EDIT_COUNTRY+id ,data)
export const deleteCountry = (id) => del(url.DELETE_COUNTRY+id )
export const addCountry = (data) => post(url.ADD_COUNTRY,data)
