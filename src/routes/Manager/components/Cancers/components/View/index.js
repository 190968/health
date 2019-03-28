import React from 'react';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
const CancerView = props => {
    const cancer = props;
    const {id, title, createdOn} = cancer || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default CancerView;