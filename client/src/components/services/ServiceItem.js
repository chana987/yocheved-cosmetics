import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ServiceContext from '../../context/service/ServiceContext'
import AuthContext from '../../context/auth/AuthContext'

const ServiceItem = ({ service, admin }) => {
    const serviceContext = useContext(ServiceContext)
    const authContext = useContext(AuthContext)

    const { setCurrentService, clearCurrentService, deleteService } = serviceContext

    const { isAuthenticated } = authContext

    const { _id, title, price, image, details } = service

    const onDelete = () => {
        deleteService(_id)
        clearCurrentService()
    }

    return (
        <div className="list">
            <h4 className="text-primary text-left">
                {title.charAt(0).toUpperCase() + title.slice(1)}
                {price && <span style={{ float: 'right' }}>
                    <i className="fas fa-shekel-sign" />
                    &#160;{price}
                </span>}
            </h4>
            <div className="service-details">
                {image && <img src={`https://source.unsplash.com/${image}/200x200`} alt="" className="service-image round-img" />}
                {details && <span>
                    {details}
                </span>}
            </div>
            {isAuthenticated && admin && <p>
                <button
                    onClick={() => setCurrentService(service)}
                    className="btn btn-dark btn-sm">
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="btn btn-light btn-sm">
                    Delete
                </button>
            </p>}
        </div>
    )
}

ServiceItem.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ServiceItem
