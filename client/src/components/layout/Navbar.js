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
        <ul>
            <li>Hello, {user && user.name}</li>
            <li>
                <Link to='/register'>Register New Admin</Link>
            </li>
            <li>
                <Link to='/'>Guest View</Link>
            </li>
            <li>
                <Link to='/admin'>Admin View</Link>
            </li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <Fragment>
            {/* <Link to='/login'>Login</Link> */}
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
