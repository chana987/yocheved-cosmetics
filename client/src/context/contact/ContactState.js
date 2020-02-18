import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Ron Weasley',
                email: 'rweasle@gmail.com',
                phone: '111-111-1111',
                type: 'professional'
            },
            {
                id: 2,
                name: 'Draco Malfoy',
                email: 'dargonfire@gmail.com',
                phone: '000-000-0000',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Hagrid',
                email: 'umbrella@gmail.com',
                phone: '777-777-7777',
                type: 'personal'
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    //add contact
    const addContact = (contact) => {
        contact.id = uuid.v4()

        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }

    //delete contact
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    //update contact
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    //set current contact
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //filter contacts
    const filterContacts = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                updateContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState