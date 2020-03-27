import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import AboutContext from '../../context/about/AboutContext'
import AboutForm from './AboutForm'

const About = ({ admin }) => {
    const authContext = useContext(AuthContext)
    const aboutContext = useContext(AboutContext)

    const { isAuthenticated, loading } = authContext

    const { about, getAbout } = aboutContext

    useEffect(() => {
        getAbout()
        //eslint-disable-next-line
    }, [])

    if (about) {
        const { title, text, phone, email, address } = about

        return (
            <div>
                <h2>{title}</h2>
                <p>{text}</p>

                {(phone || email) && <h2>Contact Info</h2>}
                {phone && <p><span className="bold">Phone: </span>{phone}</p>}
                {email && <p><span className="bold">Email: </span>{email}</p>}
                {address && <p><span className="bold">Address: </span>{address}</p>}

                {isAuthenticated && admin && <div>
                    <AboutForm />
                </div>}
            </div>
        )
    } else {
        return (
            <div>
                <h4>No info yet :&#41;</h4>
            </div>
        )
    }
}

export default About
