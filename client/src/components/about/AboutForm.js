import React, { useState, useContext, useEffect } from 'react'
import AboutContext from '../../context/about/AboutContext'

const AboutForm = () => {
    const aboutContext = useContext(AboutContext)

    const { about: currentAbout, updateAbout } = aboutContext

    useEffect(() => {
        if (currentAbout[0]) {
            const { title, text, phone, email, address, _id } = currentAbout[0]

            setAbout({
                title: title,
                text: text,
                phone: phone ? phone : '',
                email: email ? email : '',
                address: address ? address : '',
                _id: _id
            })
        } else {
            setAbout({
                title: '',
                text: '',
                phone: '',
                email: '',
                address: ''
            })
        }
    }, [currentAbout])

    const [about, setAbout] = useState({
        title: '',
        text: '',
        phone: '',
        email: '',
        address: ''
    })

    const { title, text, phone, email, address } = about

    const onChange = (e) => setAbout({
        ...about,
        [e.target.name]: e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault()
        updateAbout(about)

        setAbout({
            title: '',
            text: '',
            phone: '',
            email: '',
            address: ''
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Edit Personal Info</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="form-text"
                />
            </div>
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