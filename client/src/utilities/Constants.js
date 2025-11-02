import axios from "axios";

const BASE_URL = "https://localhost:44389";

const ENDPOINTS = 
{
    GET_ALL_BOOKS: 'getBooks',
    GET_BOOK: 'getBook'
}

const dev = {
    API_URL_GET_ALL_BOOKS:`${BASE_URL}/${ENDPOINTS.GET_ALL_BOOKS}`,
    API_URL_GET_BOOK: `${BASE_URL}/${ENDPOINTS.GET_BOOK}`
}

const Constants = process.env.NODE_ENV === 'dev' ? dev : dev //если нужно подставить другой юрл, то поменять dev
export default Constants;