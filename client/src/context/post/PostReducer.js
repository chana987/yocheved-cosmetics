import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    SET_POST,
    CLEAR_POST,
    POST_ERROR,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                loading: false
            }
        case SET_POST:
            return {
                ...state,
                currentPost: action.payload
            }
        case CLEAR_POST:
            return {
                ...state,
                currentPost: null
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}