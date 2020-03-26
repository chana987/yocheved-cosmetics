import React, { useContext, useEffect } from 'react'
import About from '../about/About'
import Services from '../services/Services'
import ServiceForm from '../services/ServiceForm'
import Posts from '../posts/Posts'
import PostForm from '../posts/PostForm'
import AuthContext from '../../context/auth/AuthContext'

const Admin = () => {
    const authContext = useContext(AuthContext)

    const { loadUser, isAuthenticated } = authContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2">
            <div>
                <Services admin="true" />
                <ServiceForm />
                <About admin="true" />
            </div>
            <div>
                <Posts admin="true" />
                <PostForm />
            </div>
        </div>
    )
}

export default Admin
