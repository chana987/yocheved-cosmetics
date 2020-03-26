import React, { useReducer } from 'react'
import axios from 'axios'
import PostContext from './PostContext'
import PostReducer from './PostReducer'
import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    SET_POST,
    CLEAR_POST,
    POST_ERROR
} from '../types'

const PostState = props => {
    const initialState = {
        posts: null,
        currentPost: null,
        error: null
    }

    const [state, dispatch] = useReducer(PostReducer, initialState)

    //get posts
    const getPosts = async () => {
        try {
            const res = await axios.get('/api/posts')

            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: err.response.message
            })
        }
    }

    //add post
    const addPost = async (post) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/posts', post, config)

            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: err.response.message
            })
        }
    }

    //delete post
    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/posts/${id}`)

            dispatch({
                type: DELETE_POST,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: err.response.message
            })
        }
    }

    //update post
    const updatePost = async (post) => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/posts/${post._id}`, post, config)

            dispatch({
                type: UPDATE_POST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: err.response.message
            })
        }
    }

    //set current post
    const setCurrentPost = (post) => {
        dispatch({
            type: SET_POST,
            payload: post
        })
    }

    //clear current post
    const clearCurrentPost = () => {
        dispatch({
            type: CLEAR_POST
        })
    }

    return (
        <PostContext.Provider
            value={{
                posts: state.posts,
                currentPost: state.currentPost,
                error: state.error,
                getPosts,
                addPost,
                deletePost,
                updatePost,
                setCurrentPost,
                clearCurrentPost
            }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState