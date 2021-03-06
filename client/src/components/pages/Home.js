import React, { useContext, useEffect } from 'react'
import Services from '../services/Services'
import Posts from '../posts/Posts'
import About from '../about/About'
import AuthContext from '../../context/auth/AuthContext'

const Home = () => {
    const authContext = useContext(AuthContext)

    const { loadUser } = authContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2">
            <div>
                <Services />
                <About />
            </div>
            <Posts />
        </div>
    )
}

export default Home