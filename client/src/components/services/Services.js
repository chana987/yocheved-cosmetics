import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ServiceItem from './ServiceItem'
import ServiceContext from '../../context/service/ServiceContext'
import AuthContext from '../../context/auth/AuthContext'
import Spinner from '../layout/Spinner'

const Services = ({ admin }) => {
    const serviceContext = useContext(ServiceContext)
    const authContext = useContext(AuthContext)

    const { services, getServices } = serviceContext
    const { loading } = authContext

    useEffect(() => {
        getServices()
        //eslint-disable-next-line
    }, [])

    if (services !== null && services.length === 0 && !loading) {
        return <h4>Out of service :&#41;</h4>
    }

    return (
        <div className="services">
            <h2>Services</h2>
            {services !== null && !loading 
            ? <TransitionGroup className="border">
                {services.map(service =>
                        <CSSTransition
                            key={service._id}
                            timeout={500}
                            className="item"
                        >
                            <ServiceItem service={service} admin={admin} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
                : <Spinner />}
        </div>
    )
}

export default Services
