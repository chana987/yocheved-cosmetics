import React, { useState, useContext, useEffect } from 'react'
import AboutContext from '../../context/about/AboutContext'
import AlertContext from '../../context/alert/AlertContext'

const AboutForm = () => {
    const aboutContext = useContext(AboutContext)
    const alertContext = useContext(AlertContext)

    const { about, updateAbout, error, clearErrors } = aboutContext
    const { setAlert } = alertContext

    useEffect(() => {
        if (error !== null) {
            setAlert(error, 'danger')
            clearErrors()
        }
        if (about) {
            setAbout(about)
        } else {
            setAbout({
                title: '',
                text: '',
                phone: '',
                email: '',
                address: ''
            })
        }
    }, [aboutContext, about])

    const [newAbout, setAbout] = useState({
        title: '',
        text: '',
        phone: '',
        email: '',
        address: ''
    })

    const { title, text, phone, email, address } = newAbout

    const onChange = (e) => setAbout({
        ...newAbout,
        [e.target.name]: e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault()
        updateAbout(newAbout)

        if (error !== null) {
            setAlert(error)
        }

        setAbout(about)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Edit Personal Info</h2>
            {/* <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="form-text"
                />
            </div> */}
            <div className="form-group">
                <label htmlFor="text">Body</label>
                <textarea
                    name="text"
                    value={text}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone number (optional)</label>
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address (optional)</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
            <div>
                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary btn-block"
                />
            </div>
        </form>
    )
}

export default AboutForm