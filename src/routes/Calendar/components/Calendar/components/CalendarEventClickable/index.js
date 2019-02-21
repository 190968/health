import React from 'react';
import {Button} from 'antd';
import moment from 'moment';
import AppointmentView from '../../../Appointments/containers/AppointmentView';
const CalendarAppointmentButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    const {event} = otherProps;
    const {title, dateTime} = event || {};
    return <React.Fragment>
        {showModal && <AppointmentView {...otherProps}onHide={toggleModal} />}
        <span onClick={toggleModal} ><small>{moment(dateTime).format('LT')}</small>: {title}</span>
    </React.Fragment>
}

export default CalendarAppointmentButton;