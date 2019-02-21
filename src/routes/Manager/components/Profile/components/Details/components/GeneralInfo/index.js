import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import DescriptionList from "../../../../../../../../components/Layout/DescriptionList";
import ProfileSection from './components/ProfileSection';
const { Description } = DescriptionList;
export const Details = props => {

    console.log(props);

    const {getProfileForm=[], user} = props;

    return getProfileForm.map(section => {
        return <ProfileSection key={section.id} section={section} user={user} />
    });
}

export default Details;