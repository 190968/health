import React from 'react';
import {Button, Tooltip} from 'antd';
import {AddCalendarEvent} from '../../../../containers/AddCalendarEvent';
import {
    FormattedMessage,
} from 'react-intl';

import {CalendarI18nEn as messages} from '../../i18n/en';

const CalendarAppointmentButton = props => {
    const {showModal, toggleModal, label, type, size='small', title=<FormattedMessage  {...messages.addAppointment} />, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <AddCalendarEvent {...otherProps} onHide={toggleModal}  />}
        <Tooltip title={title}><Button size={size} type={type} icon={'plus'} onClick={toggleModal} >{label}</Button></Tooltip>
    </React.Fragment>
}

export default CalendarAppointmentButton;