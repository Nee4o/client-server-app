const BASE_URL = "https://localhost:44389";
const ENDPOINTS = 
{
    GET_ALL_BOOKS: 'getBooks',
    GET_BOOK: 'getBook',
    CREATE_BOOK: 'createBook',
    UPDATE_BOOK: 'updateBook',
    DELETE_BOOK: 'deleteBook'
}
const dev = {
    API_URL_GET_ALL_BOOKS:`${BASE_URL}/${ENDPOINTS.GET_ALL_BOOKS}`,
    API_URL_GET_BOOK: `${BASE_URL}/${ENDPOINTS.GET_BOOK}`,
    API_URL_CREATE_BOOK: `${BASE_URL}/${ENDPOINTS.CREATE_BOOK}`,
    API_URL_UPDATE_BOOK: `${BASE_URL}/${ENDPOINTS.UPDATE_BOOK}`,
    API_URL_DELETE_BOOK: `${BASE_URL}/${ENDPOINTS.DELETE_BOOK}`
}
const Constants = process.env.NODE_ENV === 'dev' ? dev : dev //если нужно подставить другой юрл, то поменять dev
export default Constants;