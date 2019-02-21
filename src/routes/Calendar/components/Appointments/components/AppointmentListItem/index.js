import React from 'react';
import {List, Avatar, Tooltip} from 'antd';
import AppointmentView from '../../containers/AppointmentView';
import moment from 'moment';
import './index.less';
import { AvatarWithName } from '../../../../../User/components/AvatarWithName';

const AppointmentListItem = props => {
    const {event, showModal, toggleModal} = props;
    const {title, dateTime, typeTxt, participants=[]} = event;
    const dateObj = moment(dateTime);
    return  <React.Fragment>
        <List.Item>
        <List.Item.Meta
            className={'eventMeta'}
            onClick={toggleModal}
            // avatar={<Avatar ><Icon type={'calendar'} /></Avatar>}
            avatar={<div className={'eventDate'} ><Tooltip title={dateObj.format('llll')}>{dateObj.format('D')}<div className={'eventMonth'}>{dateObj.format('MMM')}</div></Tooltip></div>}
            title={title}
            description={typeTxt+' - '+dateObj.format('LT')}
        />
        {/* {participants.map(participant => {
            return <AvatarWithName user={participant} />
        })} */}
        </List.Item>
 {showModal && <AppointmentView event={event} onHide={toggleModal} />}
 </React.Fragment>
}

export default AppointmentListItem;