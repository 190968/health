import React from 'react';
import { AvatarWithName } from '../../../../../User/components/AvatarWithName';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import Description from '../../../../../../components/Layout/DescriptionList/Description';
import moment from 'moment';
import { DrawerFooter } from '../../../../../../components/Modal';

const AppointmentView = props => {
    const {event} = props;
    const {id, title, type, typeTxt, message, dateTime, participants} = event;

    let details = [
        ['Title', title],
        ['Date', moment(dateTime).format('lll')],
        ['Type', typeTxt],
        ['Message', message],
        ['Participants', participants.map(user => {
            return <div><AvatarWithName user={user} /></div>;
        })],
    ]

    return <React.Fragment>
        <DescriptionList col={1} >
    {details.map((detail, i) => {
        return <Description term={detail[0]} key={i} excludeEmpty>{detail[1]}</Description>;
    })}
</DescriptionList>
    <DrawerFooter>
        
    </DrawerFooter>
</React.Fragment>;
}


export default AppointmentView;