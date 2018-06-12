import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import GeneralInfo from './containers/GeneralInfo';

export const Details = props => {

    const {user=[], loading=false} = props;

    return (<React.Fragment>

        <GeneralInfo user={user} />
    </React.Fragment>)
}

export default Details;