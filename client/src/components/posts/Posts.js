import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PostItem from './PostItem'
import PostContext from '../../context/post/PostContext'
import AuthContext from '../../context/auth/AuthContext'
import Spinner from '../layout/Spinner'

const Posts = ({ admin }) => {
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)

    const { posts, getPosts } = postContext
    const { loading } = authContext

    useEffect(() => {
        getPosts()
        //eslint-disable-next-line
    }, [])

    if (posts !== null && posts.length === 0 && !loading) {
        return <h4>No posts right now :&#41;</h4>
    }

    return (
        <div className="posts">
            <h2>Updates</h2>
            {posts !== null && !loading 
            ? <TransitionGroup className="border">
                {posts.map(post =>
                        <CSSTransition
                            key={post._id}
                            timeout={500}
                            className="item"
                        >
                            <PostItem post={post} admin={admin} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
                : <Spinner />}
        </div>
    )
}

export default Posts
