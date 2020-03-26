import React, { useState, useContext, useEffect } from 'react'
import ServiceContext from '../../context/service/ServiceContext'

const ServiceForm = () => {
    const serviceContext = useContext(ServiceContext)

    const { clearCurrentService, currentService } = serviceContext

    useEffect(() => {
        if (currentService !== null) {
            setService(currentService)
        } else {
            setService({
                title: '',
                price: 0,
                image: '',
                details: ''
            })
        }
    }, [serviceContext, currentService])

    const [service, setService] = useState({
        title: '',
        price: 0,
        image: '',
        details: ''
    })

    const { title, price, image, details } = service

    const onChange = (e) => setService({
        ...service,
        [e.target.name]: e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (currentService === null) {
            serviceContext.addService(service)
        } else {
            serviceContext.updateService(service)
        }

        setService({
            title: '',
            price: 0,
            image: '',
            details: ''
        })
        clearAll()
    }

    const clearAll = () => {
        clearCurrentService()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>{currentService ? "Edit Service" : "Add Service"}</h2>
            <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="form-text"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={onChange}
                    className="form-text"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="details">Details (optional)</label>
                <textarea
                    name="details"
                    value={details}
                    onChange={onChange}
                    className="form-text"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image link (optional)</label>
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
                    value={currentService ? "Update Service" : "Add Service"}
                    className="btn btn-primary btn-block"
                />
                {currentService && <div>
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearAll}>Clear</button>
                </div>}
            </div>
        </form>
    )
}

export default ServiceForm
