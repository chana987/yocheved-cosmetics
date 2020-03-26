import React, { useReducer } from 'react'
import axios from 'axios'
import ServiceContext from './ServiceContext'
import ServiceReducer from './ServiceReducer'
import {
    GET_SERVICES,
    ADD_SERVICE,
    DELETE_SERVICE,
    UPDATE_SERVICE,
    SET_SERVICE,
    CLEAR_SERVICE,
    SERVICE_ERROR
} from '../types'

const ServiceState = props => {
    const initialState = {
        services: null,
        currentService: null,
        error: null
    }

    const [state, dispatch] = useReducer(ServiceReducer, initialState)

    //get services
    const getServices = async () => {
        try {
            const res = await axios.get('/api/services')

            dispatch({
                type: GET_SERVICES,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.message
            })
        }
    }

    //add service
    const addService = async (service) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/services', service, config)

            dispatch({
                type: ADD_SERVICE,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.message
            })
        }
    }

    //delete service
    const deleteService = async (id) => {
        try {
            await axios.delete(`/api/services/${id}`)

            dispatch({
                type: DELETE_SERVICE,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.message
            })
        }
    }

    //update service
    const updateService = async (service) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/services/${service._id}`, service, config)

            dispatch({
                type: UPDATE_SERVICE,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.message
            })
        }
    }

    //set current service
    const setCurrentService = (service) => {
        dispatch({
            type: SET_SERVICE,
            payload: service
        })
    }

    //clear current service
    const clearCurrentService = () => {
        dispatch({
            type: CLEAR_SERVICE
        })
    }

    return (
        <ServiceContext.Provider
            value={{
                services: state.services,
                currentService: state.currentService,
                error: state.error,
                getServices,
                addService,
                deleteService,
                updateService,
                setCurrentService,
                clearCurrentService
            }}>
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceState