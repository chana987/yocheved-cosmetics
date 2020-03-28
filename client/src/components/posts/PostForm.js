import React, { useState, useContext, useEffect } from 'react'
import PostContext from '../../context/post/PostContext'

const PostForm = () => {
    const postContext = useContext(PostContext)

    const { clearCurrentPost, currentPost, addPost, updatePost } = postContext

    useEffect(() => {
        if (currentPost !== null) {
            setPost(currentPost)
        } else {
            setPost({
                title: '',
                body: '',
                image: ''
            })
        }
    }, [postContext, currentPost])

    const [post, setPost] = useState({
        title: '',
        body: '',
        image: ''
    })

    const { title, body, image } = post

    const onChange = (e) => setPost({
        ...post,
        [e.target.name]: e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (currentPost === null) {
            addPost(post)
        } else {
            updatePost(post)
        }

        setPost({
            title: '',
            body: '',
            image: ''
        })
        clearAll()
    }

    const clearAll = () => {
        clearCurrentPost()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>{currentPost ? "Edit Post" : "Add Post"}</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="form-text"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="body">Message</label>
                <textarea
                    name="body"
                    value={body}
                    onChange={onChange}
                    className="form-text"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">UnSplash Image ID (optional)</label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
            <div>
                <input
                    type="submit"
                    value={currentPost ? "Update Post" : "Add Post"}
                    className="btn btn-primary btn-block"
                />
                {currentPost && <div>
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearAll}>Clear</button>
                </div>}
            </div>
        </form>
    )
}

export default PostForm
