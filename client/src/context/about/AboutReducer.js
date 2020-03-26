import {
    GET_ABOUT,
    UPDATE_ABOUT,
    ABOUT_ERROR,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_ABOUT:
            return {
                ...state,
                about: action.payload,
                loading: false
            }
        case UPDATE_ABOUT:
            return {
                ...state,
                about: [action.payload],
                loading: false
            }
        case ABOUT_ERROR:
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