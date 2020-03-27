import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import PostContext from '../../context/post/PostContext'
import AuthContext from '../../context/auth/AuthContext'

const months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const PostItem = ({ post, admin }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)

    const { setCurrentPost, clearCurrentPost, deletePost } = postContext

    const { isAuthenticated } = authContext

    const { _id, title, body, image, date } = post

    const onDelete = () => {
        deletePost(_id)
        clearCurrentPost()
    }

    return (
        <div className="list">
            <h3 className="text-primary text-left">
                <span className="comment">{`${months[new Date(date).getMonth()]} ${new Date(date).getDate()} `}&#160;</span>
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </h3>
            <div>
                <p>{body}</p>
                {image && <img src={`https://source.unsplash.com/${image}/200x200`} alt="" className="post-image" />}
                {isAuthenticated && admin && <div>
                    <button
                        onClick={() => setCurrentPost(post)}
                        className="btn btn-dark btn-sm">
                        Edit
                </button>
                    <button
                        onClick={onDelete}
                        className="btn btn-light btn-sm">
                        Delete
                </button>
                </div>}
            </div>
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem
