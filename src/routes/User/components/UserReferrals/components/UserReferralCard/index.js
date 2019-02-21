import React from 'react';
import { Card, Avatar } from 'antd';
import moment from 'moment';
import AvatarWithName from '../../../AvatarWithName';
import './index.less';

const UserReferralCard = props => {
    const {userProgram, user} = props;
    const {program, sender, joinedDate} = userProgram || {};
    const {name, icon} = program || {};

    //console.log(props);
    return <div className={'referralCard clearfix'}>
        <div className={'image'}>
        <Avatar src={icon} shape="square" />
        </div>
        <div className={'details'}>
            <div className={'referralCard-title'}>{name}</div>
            <div className={'clearfix'}>
                <span className={'referralCard-date'}>
                {moment(joinedDate).format('l')}
                </span>
                <span className={'referralCard-sender'}>
                <AvatarWithName user={sender} />
                </span>
            </div>
        </div>
    </div>;
}

export default UserReferralCard;