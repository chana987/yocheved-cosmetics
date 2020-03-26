import React, { useReducer } from 'react'
import axios from 'axios'
import AboutContext from './AboutContext'
import AboutReducer from './AboutReducer'
import {
    GET_ABOUT,
    UPDATE_ABOUT,
    ABOUT_ERROR
} from '../types'

const AboutState = props => {
    const initialState = {
        about: {
            title: '',
            text: '',
            phone: '',
            email: '',
            address: ''
        },
        error: null
    }

    const [state, dispatch] = useReducer(AboutReducer, initialState)

    //get about
    const getAbout = async () => {
        try {
            const res = await axios.get('/api/about')

            dispatch({
                type: GET_ABOUT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ABOUT_ERROR,
                payload: err.response.message
            })
        }
    }

    //update about
    const updateAbout = async (about) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/about/${about._id}`, about, config)

            dispatch({
                type: UPDATE_ABOUT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ABOUT_ERROR,
                payload: err.response.message
            })
        }
    }

    //save about
    const saveAbout = async (about) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/api/about`, about, config)

            dispatch({
                type: UPDATE_ABOUT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ABOUT_ERROR,
                payload: err.response.message
            })
        }
    }

    return (
        <AboutContext.Provider
            value={{
                about: state.about,
                error: state.error,
                getAbout,
                updateAbout,
                saveAbout
            }}>
            {props.children}
        </AboutContext.Provider>
    )
}

export default AboutState