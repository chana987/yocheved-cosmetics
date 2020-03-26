import {
    GET_SERVICES,
    ADD_SERVICE,
    DELETE_SERVICE,
    UPDATE_SERVICE,
    SET_SERVICE,
    CLEAR_SERVICE,
    SERVICE_ERROR,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                loading: false
            }
        case ADD_SERVICE:
            return {
                ...state,
                services: [
                    action.payload,
                    ...state.services
                ],
                loading: false
            }
        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter(service => service._id !== action.payload),
                loading: false
            }
        case UPDATE_SERVICE:
            return {
                ...state,
                services: state.services.map(service => service._id === action.payload._id ? action.payload : service),
                loading: false
            }
        case SET_SERVICE:
            return {
                ...state,
                currentService: action.payload
            }
        case CLEAR_SERVICE:
            return {
                ...state,
                currentService: null
            }
        case SERVICE_ERROR:
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