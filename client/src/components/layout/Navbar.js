import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext)

    const { isAuthenticated, logout, user } = authContext

    const onLogout = () => {
        logout()
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
                <Link to='/register'>Register new admin</Link>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link to='/login'>Login</Link>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />&#160;{title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Yocheved Cosmetics',
    icon: 'fas fa-spa'
}

export default Navbar
